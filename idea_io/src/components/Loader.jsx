import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#ff0000" loading={true} size={300} />
    </div>
  )
}

export default Loader