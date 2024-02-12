'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import "boxicons"; // icon
import { getColor } from "../utils/color";
import { DeleteData, FetchData } from "../utils/api";

import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading } from "../redux/actions";
import { successToast } from "../utils/toast";

export default function List({ refreshList, setRefreshList }) {
  const dispatch = useDispatch();
  //get data and loading state from the global store
  const { data, loading } = useSelector((state) => ({
    data: state.data,
    loading: state.loading,
  }));

  //const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(false);

  //fetch data from the server when refreshList changes
  useEffect(() => {
    fetchData();
  }, [refreshList]);

  //data fetching
  const fetchData = async () => {
    dispatch(setLoading(true));
    //setLoading(true); //loading
    try {
      const response = await FetchData();
      //setData(response);
      dispatch(setData(response));
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    dispatch(setLoading(false));
    //setLoading(false);
  };

  const recentHistory = data.slice(0, 5); //recent 5 Transactions

  //delete
  const handleDelete = async (e) => {
    const id = e.target.dataset.id;

    if (!id) return 0;

    //setLoading(true);
    dispatch(setLoading(true));
    try {
      //await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
      await DeleteData(id);
      successToast("deleted"); //success message
      await fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    dispatch(setLoading(false));
    //setLoading(false);
  };

  // const t = usegetAllQuery;
  // console.log(t);
  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : recentHistory.length > 0 ? (
        <>
          {recentHistory.map((v, i) => (
            <Transaction key={i} category={v} handler={handleDelete} />
          ))}
          <a
            href="/see-more"
            className="text-blue-500 hover:text-blue-700 font-bold flex items-center"
          >
            See More
            <box-icon name="right-arrow-alt" className="ml-2"></box-icon>
          </a>
        </>
      ) : (
        <div>No results found!</div>
      )}
    </div>
  );
}

function Transaction({ category,handler }) {
  if (!category) return null;
  
  const color = getColor(category.type);

  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${color}` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon
          data-id={category.id ?? ""}
          color={color}
          size="15px"
          name="trash"
        ></box-icon>
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
      <span className="block w-full">{category.amount ?? ""} $</span>
    </div>
  );
}
