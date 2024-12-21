import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";
import { Modal } from "./Modal";
import { toast } from "react-toastify";

const NoteDetail = ({ deleteIdea }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleIsModalOpen = () => {
    setShowModal(!showModal);
  };

  const fetchNoteDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8002/api/v1/ideas/${slug}/`);
      setNote(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load note details");
      toast.error("Failed to load note details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoteDetails();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await deleteIdea(note.slug);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-lg text-red-600">{error}</div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-lg text-gray-600">Note not found</div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900">{note.title}</h1>
        <p className="text-md text-gray-600">Category: <span className="font-medium">{note.category}</span></p>
        <p className="text-lg text-gray-800 leading-relaxed">{note.description}</p>
        <div className="text-sm text-gray-500 mt-4">
          <p>Created: {FormatDate(note.created_at)}</p>
          <p>Updated: {FormatDate(note.updated_at)}</p>
        </div>
        <div className="flex space-x-4 mt-6">
          <Link to={`/ideas/${note.slug}/edit`} className="inline-block">
            <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
              Edit
            </button>
          </Link>
          <button 
            onClick={handleIsModalOpen} 
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <Modal 
          handleIsModalOpen={handleIsModalOpen} 
          deleteIdea={handleDelete}
        />
      )}
    </>
  );
};

export default NoteDetail;
