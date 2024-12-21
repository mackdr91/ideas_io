import { Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import { useState } from "react";
const Navbar = ({searchText, handleSearch}) => {

  return (
    <>
      <header className="text-gray-600 body-font border-b mb-4 shadow-md ">
        <div className="container mx-auto flex justify-between flex-wrap p-5">
          <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-4xl">Ideas.io</span>
          </a>
          <div className="flex md:ml-auto md:mr-3">
            <input
              type="search"
              placeholder="search for your idea"
              aria-label="search"
              className="w-64 bg-gray-100 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />

          </div>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="/add-note" className="flex items-center gap-2">
              <FaSquarePlus  className="text-5xl text-green-500 "/>
              <span className="text-xl font-semibold text-green-500">Add Idea</span>
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
