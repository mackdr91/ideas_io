import React from "react";

const Filter = ({handleFilterNotes}) => {
  return (
    <div className="container flex justify-center items-center">
      <select className="w-1/2 p-4 rounded-md bg-gray-100 border border-gray-200 text-gray-700 font-semibold" onChange={(e) => handleFilterNotes(e.target.value)} aria-label="Default select example">
        <option value={""}>All Ideas</option>
        <option value="Business">Business</option>
        <option value="Tech">Technology</option>
        <option value="Other">Other</option>
        <option value="General">General</option>
      </select>
    </div>
  );
};

export default Filter;
