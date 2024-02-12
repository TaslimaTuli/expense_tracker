"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import List from "./List";

import { ToastContainer, toast } from "react-toastify";
import { successToast } from "../utils/toast";

export default function Form() {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // State to trigger list refresh
  const [refreshList, setRefreshList] = useState(false);

  const onSubmit = async (data) => {
    if (!data) return {};
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create",
        data
      );
      successToast('created');
      // toast.success("Transaction created successfully!", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });

      // Reset form fields
      resetField("name");
      resetField("type");
      resetField("amount");

      // Trigger list refresh
      setRefreshList(true);
    } catch (error) {
      setError("root", {
        message: "Error creating transaction",
      });
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (refreshList) {
      setRefreshList(false); // Reset refresh flag
    }
  }, [refreshList]);

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name", {
                required: "Name is required!",
              })}
              placeholder="Salary, House Rent, SIP"
              className="form-input"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <select
            className="form-input"
            {...register("type", {
              required: "Type is required!",
            })}
          >
            <option value="">-- Select Category -- </option>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          {errors.type && (
            <div className="text-red-500">{errors.type.message}</div>
          )}
          <div className="input-group">
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required!",
                //valueAsNumber: true,
                validate: (value) =>
                  parseFloat(value) > 0 || "Amount must be greater than 0",
              })}
              placeholder="Amount"
              className="form-input"
            />
            {errors.amount && (
              <div className="text-red-500">{errors.amount.message}</div>
            )}
          </div>
          <div className="submit-btn">
            <button
              disabled={isSubmitting}
              className="border py-2 text-white bg-indigo-500 w-full"
            >
              {isSubmitting ? "Loading..." : "Make Transaction"}
            </button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </div>
        </div>
      </form>
      {/* force a re-render of the component every time the parent component renders */}
      {/* <List key={Date.now()}></List>  bad example */}

      {/* Pass refreshList state and setRefreshList function as props */}
      <List refreshList={refreshList} setRefreshList={setRefreshList} />
    </div>
  );
}
