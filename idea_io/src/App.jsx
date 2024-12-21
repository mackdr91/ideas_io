import React, { useState, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Mainlayout from './layouts/Mainlayout'
import AddNote from './pages/AddNote'
import NoteDetail from './components/NoteDetail'
import EditNote from './pages/EditNote'
import ErrorBoundary from './components/ErrorBoundary'
import axios from 'axios'
import { toast } from 'react-toastify'

function App() {
  const [allNotes, setAllNotes] = useState([])
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredNotes, setFilteredNotes] = useState("")
  const [searchText, setSearchText] = useState("")

  const handleSearch = (search) => {
    setSearchText(search)
  }

  const handleFilterNotes = (category) => {
    setFilteredNotes(category)
  }

  const filteredIdeas =
    filteredNotes === "Business"
      ? notes.filter((note) => note.category === "Business")
      : filteredNotes === "Tech"
      ? notes.filter((note) => note.category === "Tech")
      : filteredNotes === "General"
      ? notes.filter((note) => note.category === "General")
      : filteredNotes === "Other"
      ? notes.filter((note) => note.category === "Other")
      : notes

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://127.0.0.1:8002/api/v1/ideas/")
      .then((res) => {
        setAllNotes(res.data)
        setNotes(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!searchText) {
      setNotes(allNotes)
      return
    }

    setLoading(true)
    axios
      .get(`http://127.0.0.1:8002/api/v1/search/?search=${searchText}`)
      .then((res) => {
        setNotes(res.data)
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [searchText])

  const addIdea = async (formData) => {
    setLoading(true)
    try {
      const response = await axios.post("http://127.0.0.1:8002/api/v1/ideas/", formData)
      const newIdea = response.data
      setAllNotes([...allNotes, newIdea])
      setNotes([...notes, newIdea])
      toast.success("Idea added successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("Error adding idea")
      setLoading(false)
    }
  }

  const updateIdea = (formData) => {
    setLoading(true)
    axios
      .put(`http://127.0.0.1:8002/api/v1/ideas/${formData.slug}/`, formData)
      .then((res) => {
        toast.success("Idea updated successfully")
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const deleteIdea = (slug) => {
    setLoading(true)
    axios
      .delete(`http://127.0.0.1:8002/api/v1/ideas/${slug}/`)
      .then((res) => {
        toast.success("Idea deleted successfully")
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Mainlayout searchText={searchText} handleSearch={handleSearch} />
        }
      >
        <Route
          index
          path="/"
          element={
            <Home
              notes={filteredIdeas}
              loading={loading}
              handleFilterNotes={handleFilterNotes}
            />
          }
        />
        <Route path="/add-note" element={<AddNote addIdea={addIdea} setSearchText={setSearchText} />} />
        <Route
          path="/ideas/:slug"
          element={<NoteDetail deleteIdea={deleteIdea} />}
        />
        <Route
          path="/ideas/:slug/edit"
          element={<EditNote updateIdea={updateIdea} />}
        />
      </Route>
    )
  )

  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  )
}

export default App
