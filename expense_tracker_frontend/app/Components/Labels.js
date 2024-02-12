'use client'
import React, { useEffect, useState } from "react";
import { getSum, graphLabel } from "../utils/helper";
import { getColor } from "../utils/color";
import { FetchData } from "../utils/api";


import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading } from "../redux/actions";

export default function Labels() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => ({
    data: state.data,
    loading: state.loading,
  }));

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchData();
  },[]);
  

  //data fetching
  const fetchData = async () => {
    dispatch(setLoading(true));
    //setLoading(true); //loading
    try {
      const response = await FetchData();
      dispatch(setData(response));
      //setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    dispatch(setLoading(false));
    //setLoading(false);

  };
//getSum(data, 'type');
//console.log(graphLabel(data));

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {graphLabel(data).map((v, i) => (
            <LabelComponent key={i} category={v}></LabelComponent>
          ))}
        </>
      )}
    </>
  );

}

function LabelComponent({ category }) {
  if (!category) return null;
  const color = getColor(category.type);

  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{category.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">{Math.round(category.percent) ?? 0}%</h3>
    </div>
  );
}
