"use client";

import { ToastContainer, toast } from "react-toastify";

export { ToastContainer, toast } from "react-toastify";

export function successToast(name) {
  toast.success("Transaction "+ name +" successfully!", {
    //position: "bottom-left",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
