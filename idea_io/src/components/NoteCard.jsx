import React from 'react'
import { Link } from 'react-router-dom'
import FormatDate from './FormatDate'

const NoteCard = ({ note }) => {
  // truncate the description to 50 characters
  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  const date = new Date(note.created_at).toLocaleDateString();
  const color = note.category === "Tech" ? "text-blue-500" : note.category === "Business" ? "text-green-500" : note.category === "General" ? "text-yellow-500" : "text-red-500";

  return (
    <Link to={`/ideas/${note.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="md:flex">
          <div className="p-6">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{note.title}</div>
            <div className="block mt-2 text-lg leading-tight font-medium text-gray-900 hover:underline">
              {truncate(note.description, 50)}
            </div>
            <p className="mt-3 text-gray-600">Created: {FormatDate(note.created_at)}</p>
            <p className="mt-3 text-gray-600">Updated: {FormatDate(note.updated_at)}</p>
            <p className={`mt-3 text-gray-600 ${color}`}>{note.category}</p>
            <div className="mt-4">
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard