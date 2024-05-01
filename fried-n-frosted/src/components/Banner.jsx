import React from 'react'

const Banner = () => {
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
            <div className='md:w-1/2 h-21'><img src="/images/home/banner1.png" alt="" />
                    <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-4'>
                        <div className='w-64 flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md'>
                            <img src="/images/home/b-food1.png" alt="" className='rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Spicy noodles</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500"  readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500"checked readOnly/>
                                </div>
                                <p><span className='text-red'>₹</span> 100</p>
                            </div>
                        </div>
                        <div className='w-64 sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md'>
                            <img src="/images/home/b-food1.png" alt="" className='rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Vegetarian Salad</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500"  readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500"checked readOnly/>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly/>
                                </div>
                                <p><span className='text-red'>₹</span> 110</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2 space-y-7 px-4'>
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Dive into Delights of Delicious <span className='text-orange'>Food</span></h2>
                    <p className='text-xl text-[#4A4A4A]'>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                    <button className='btn bg-orange px-8 py-3 font-semibold text-white rounded-full' ><a href="/menu">Order Now</a></button>
                </div>
                
            </div>

        </div>
    )
}

export default Banner
