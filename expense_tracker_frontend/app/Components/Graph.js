"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { chart_Data, getTotal } from "../utils/helper";
import { FetchData } from "../utils/api";

import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading } from "../redux/actions";

export default function Graph() {
  //Chart.register(ArcElement);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => ({
    data: state.data,
    loading: state.loading,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  //data fetching
  const fetchData = async () => {
    //setLoading(true); //loading
    dispatch(setLoading(true));
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
  //console.log(chart_Data(data.amount));

  chart_Data(data);
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...chart_Data(data)}></Doughnut>
          {/* {graphData} */}
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">{getTotal(data) ?? 0} $</span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          {/* Labels */}
          <Labels></Labels>
        </div>
        
      </div>
    </div>
  );
}
