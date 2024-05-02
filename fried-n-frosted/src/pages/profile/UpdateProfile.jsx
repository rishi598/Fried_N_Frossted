import React from 'react'

const UpdateProfile = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <h3 className='font-bold'>Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="file" className="file-input file-input-bordered  w-full max-w-xs" />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-orange text-white">Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UpdateProfile
