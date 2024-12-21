import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Mainlayout = ({searchText, handleSearch}) => {
  return (
    <>
      <Navbar searchText={searchText} handleSearch={handleSearch} />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Mainlayout;
