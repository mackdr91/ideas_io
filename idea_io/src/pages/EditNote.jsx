import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const EditNote = ({updateIdea}) => {
  const navigate = useNavigate()
  const {slug} = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    slug: ''
  })

  useEffect(() => {
    setLoading(true)
    axios.get(`http://127.0.0.1:8002/api/v1/ideas/${slug}/`)
      .then((res) => {
        setFormData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Error fetching idea')
        toast.error('Error fetching idea')
        setLoading(false)
      })
  }, [slug])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await updateIdea({
        ...formData,
        slug: formData.slug || slug // Use existing slug if available, otherwise use URL param
      })
      toast.success('Idea updated successfully')
      // Navigate after successful update
      navigate(`/ideas/${formData.slug || slug}`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to update idea')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
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
    )
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
          required
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          required
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
          required
        >
          <option value="">Select a category</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="General">General</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 text-white rounded-md transition duration-300 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Updating...' : 'Update Idea'}
        </button>
      </div>
    </form>
  )
}

export default EditNote