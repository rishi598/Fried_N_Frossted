import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';

const UpdateMenu =  () => {
    const item =   useLoaderData();
    console.log(item );
    const {
        register,
        handleSubmit,
        reset        
      } = useForm()
      const axiosPublic = useAxiosPublic()
      const axiosSecure = useAxiosSecure()
      const [outOfStock, setOutOfStock] = useState(item.outOfStock);
      const yes = true

      const styles = {
        label: {
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        },
        radioInput: {
          display: 'none'
        },
        radioLabel: {
          display: 'inline-block',
          padding: '0.5rem 1rem',
          border: '2px solid #ccc',
          borderRadius: '5px',
          transition: 'background-color 0.3s, border-color 0.3s'
        },
        radioLabelChecked: {
          display: 'inline-block',
          padding: '0.5rem 1rem',
          border: '2px solid #007bff',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          transition: 'background-color 0.3s, border-color 0.3s'
        }
      };
      

      const handleStockChange = (event) => {
     
        setOutOfStock(true);
        // setOutOfStock(outOfStock)
        // console.log(outOfStock)
      };

      const handleStockChangeNo = (event) => {
        console.log(event.target.value)
        setOutOfStock(false);
        // setOutOfStock(outOfStock)
        // console.log(outOfStock)
      };

      const navigate = useNavigate()

    //   image hosting key
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // console.log(image_hosting_key)
    const image_hosting_api  = `https://api.imgbb.com/1/upload?key=5e6861938531a69d62762125d66e4b67`

      const onSubmit = async (data) => {
        // console.log(data)
        const imageFile = {image: data.image[0]}
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type":"multipart/form-data"
            }
        })
        console.log(hostingImg)
        if(hostingImg.data.success) {
            const menuItem = {
              name: data.name,
              category: data.category,
              price: parseFloat(data.price),
              recipe: data.recipe,
              image: hostingImg.data.data.display_url,
              outOfStock: outOfStock
            };
            // console.log(menuItem)
            const postMenuItem = await axiosSecure.patch(`http://localhost:6001/menu/${item._id}`, menuItem);
            console.log(postMenuItem)
            if(postMenuItem.status === 200){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Item is updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/manage-items')
            }
        }
      }
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
    <h2 className='text-2xl font-semibold my-4'>Update This <span className='text-orange'>Menu Item</span></h2>
    {/** form */}
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Recipe Name*</span>

                </label>
                <input defaultValue={item.name} {...register("name", { required: true })} type="text" placeholder="Recipe Name" className="input input-bordered w-full " />

            </div>
            {/**2nd row */}
            <div className='flex items-center gap-4'>
                {/** categories */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Category*</span>

                    </label>
                    <select defaultValue={item.category} {...register("category", { required: true })} className="select select-bordered" >
                        <option disabled value="default">Select a category</option>
                        <option value="salad">Salad</option>
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                        <option value="popular">Popular</option>
                    </select>

                </div>
                {/**price */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Price*</span>

                    </label>
                    <input defaultValue={item.price} {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full " />

                </div>

            </div>
            {/** 3rd row */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipre Details</span>

                </label>
                <textarea defaultValue={item.recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Description"></textarea>

            </div>
            {/**4th row */}
            <div className="form-control w-full my-6">
                
                <input {...register("image", )} type="file" className="file-input  w-full max-w-xs" />
                
            </div>
            {/**5th row */}
            <div className='flex flex-row my-4 m-5 space-x-6'>
            <h2>Out of Stock:</h2>
            <label>
              <input 
                type="radio" 
                name="outOfStock" 
                value={outOfStock}
            
                onChange={handleStockChange} 
                style={styles.radioInput}
              />
              <span style={outOfStock ? styles.radioLabelChecked : styles.radioLabel}>Yes</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="outOfStock" 
               value={outOfStock}
                onChange={handleStockChangeNo} 
                style={styles.radioInput}
              />
              <span style={!outOfStock  ? styles.radioLabelChecked : styles.radioLabel}>No</span>
            </label>
          </div>
            <button className='btn bg-orange text-white px-6'>Update Item<FaUtensils/></button>
        </form>
    </div>
</div>
  )
}

export default UpdateMenu
