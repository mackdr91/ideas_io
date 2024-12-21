import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";
import Loader from "../components/Loader";
const Home = ({ notes, loading, handleFilterNotes }) => {
  return (
    <div className="container mx-auto">
      {notes.length < 1 ? (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-center mt-10 ">
              No notes found
            </h1>
            <p className="text-center mt-5">
              Please add some notes to get started
            </p>
            <a href="/" className="text-center mt-5 hover:underline">
              All Notes
            </a>
          </div>
        </>
      ) : (
        <Filter handleFilterNotes={handleFilterNotes} />
      )}

      {loading ? (
        <Loader />
      ) : (
        <NoteCardContainer notes={notes} loading={loading} />
      )}
    </div>
  );
};

export default Home;
