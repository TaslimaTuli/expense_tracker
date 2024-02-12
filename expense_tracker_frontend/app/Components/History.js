"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "boxicons"; // icon
import { DeleteData, FetchData } from "../utils/api";
import { successToast } from "../utils/toast";

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); //loading
    try {
      const response = await FetchData();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false); //after data is fetched loading false
  };
  //delete
  const handleDelete = async (e) => {
    const id = e.target.dataset.id;
    if (!id) return 0;

    setLoading(true);
    try {
      //await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
      await DeleteData(id);
      successToast("deleted");
      await fetchData();
      
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setLoading(false);
  };

  //
  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.map((v, i) => (
            <Transaction
              key={i}
              category={v}
              handler={handleDelete}
            ></Transaction>
          ))}
        </>
      )}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;

  //calculate day
  dayjs.extend(relativeTime);
  const date = dayjs(category.created_at).fromNow();
  //console.log(date);

  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      //style={{ borderRight: `8px solid ${color}` }}
    >
      <span className="block w-full">{category.name ?? ""}</span>
      <span className="block w-full">{category.amount ?? ""} $</span>
      <span className="block w-full">{category.type ?? ""}</span>
      <span className="block w-full">{date}</span>

      <button className="px-3" onClick={handler} >
        <box-icon
          data-id={category.id ?? ""}
          color="rgb(255, 99, 132)"
          size="15px"
          name="trash"
        ></box-icon>
      </button>
    </div>
  );
}
