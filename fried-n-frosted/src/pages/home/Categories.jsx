import React, { useEffect, useState } from 'react'



const categoryItems = [
    {id: 1, title:"Main", description:"(80 Dishes)", image: "/images/home/category/img1.png"},
    {id: 2, title:"Sides", description:"(55 sides)", image: "/images/home/category/img2.png"},
    {id: 3, title:"Desserts", description:"(70 desserts)", image: "/images/home/category/img3.png"},
    {id: 4, title:"All", description:"(205 items)", image: "/images/home/category/img4.png"}

]
const Categories = () => {

  
  return (
    <div className='max-w-screen-2xl container mx-auto py-16'>
      <div className='text-center'>
      <p className='text-red uppercase tracking-wide font-semibold text-lg'>CUSTOMER FAVORITES</p>
        <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug'>Popular Categories</h2>
      </div>
        {/* cards */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
            {
                categoryItems.map((item, i) => (
                    <a href="/menu">
                      <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:scale-110 duration-300 transition-all'>
                        <div className='flex w-full mx-auto items-center justify-center'>
                            <img src={item.image} alt="" className='bg-[#f5a467] p-5 rounded-full w-28 h-28'/>
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h5>{item.title}</h5>
                            <p>{item.description}</p>
                        </div>
                    </div>
                    </a>
                ))
            }
        </div>
    </div>
  )
}

export default Categories
