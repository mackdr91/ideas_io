import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";
import { Modal } from "./Modal";

const NoteDetail = ({ deleteIdea }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState(null);
  const { slug } = useParams();

  const handleIsModalOpen = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/ideas/${slug}/`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900">{note?.title}</h1>
        <p className="text-md text-gray-600">Category: <span className="font-medium">{note?.category}</span></p>
        <p className="text-lg text-gray-800 leading-relaxed">{note?.description}</p>
        <div className="text-sm text-gray-500 mt-4">
          <p>Created: {FormatDate(note?.created_at)}</p>
          <p>Updated: {FormatDate(note?.updated_at)}</p>
        </div>
        <div className="flex space-x-4 mt-6">
          <Link to={`/ideas/${note?.slug}/edit`} className="inline-block">
            <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">Edit</button>
          </Link>
          <button onClick={handleIsModalOpen} className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">Delete</button>
        </div>
      </div>
      {showModal && <Modal handleIsModalOpen={handleIsModalOpen} deleteIdea={() => deleteIdea(note?.slug)} />}
    </>
  );
};

export default NoteDetail;
