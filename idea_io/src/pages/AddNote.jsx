import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AddNote = ({addIdea}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'General'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
          ...formData,
          [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.title === '' || formData.description === '' || formData.category === '') {
            alert('Please fill in all fields')
            return
        }
        // Handle form submission logic here
        addIdea(formData)


        navigate('/')
    }
  return (

    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter title"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter description"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="General">General</option>
        <option value="Business">Business</option>
        <option value="Tech">Tech</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  </form>
  )
}

export default AddNote