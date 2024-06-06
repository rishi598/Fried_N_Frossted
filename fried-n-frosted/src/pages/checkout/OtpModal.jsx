import React from 'react'

const OtpModal = () => {
  return (
    <dialog id="my_modal_6" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            

            {/* error */}
            {
              errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
            }

            {/* login btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                value="Login"
                className="btn bg-orange text-white"
              />
            </div>

            

            <button 
            htmlFor="my_modal_6"
            onClick={() => document.getElementById("my_modal_6").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button>
          </form>
          
            
        </div>
      </div>
    </dialog>
  )
}

export default OtpModal
