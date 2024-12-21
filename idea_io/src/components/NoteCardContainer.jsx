import React from 'react'
import NoteCard from './NoteCard'
import Loader from './Loader'

const NoteCardContainer = ({ notes, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
      {loading ? <Loader /> :  notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      {/* Add more NoteCard components as needed */}
    </div>
  )
}

export default NoteCardContainer