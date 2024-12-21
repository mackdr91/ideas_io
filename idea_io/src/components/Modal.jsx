import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Modal = ({handleIsModalOpen, deleteIdea}) => {
  const navigate = useNavigate()
  const handleDelete = () => {
    deleteIdea()
    navigate('/')
  }

  return (
    <div>
      <div onClick={handleIsModalOpen} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete this idea?</h2>
          <div className="flex justify-end">
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete</button>
            <button onClick={handleIsModalOpen} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
