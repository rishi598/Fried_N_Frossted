import React from 'react'

const serviceLists = [
    {id: 1, title: "Catering", description: "Delight your guests with our flavors and  presentation", image:"/images/home/services/icon1.png"},
    {id: 2, title: "Fast delivery", description: "We deliver your order promptly to your door", image:"/images/home/services/icon2.png"},
    {id: 3, title: "Online Ordering", description: "Explore menu & order with ease using our Online Ordering", image:"/images/home/services/icon3.png"},
    // {id: 1, title: "Gift Cards", description: "Give the gift of exceptional dining with Foodi Gift Cards", image:"/images/home/services/icon4.png"},
]

const OurServices = () => {
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 my-16'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                <div className='md:w-1/2'>
                    <div className='text-left md:w-4/5'>
                        <p className='text-red uppercase tracking-wide font-semibold text-lg'>Our Story & Services</p>
                        <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug'>Our Culinary Journey and Services</h2>
                        <p className="my-5 text-secondary leading-[30px]">
                            Rooted in passion, we curate unforgettable dining experiences and
                            offer exceptional services, blending culinary artistry with warm
                            hospitality.
                        </p>
                        {/* <button className='btn bg-orange text-white px-8 py-3 rounded-full'>Explore</button> */}
                    </div>
                </div>
                <div className='md:w-1/2'>
                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
                        {
                            serviceLists.map((service) => (
                               <div key={service.id} className='shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-orange cursor-pointer hover:border-orange transition-all duration-200 hover:border'>
                                <img src={service.image} alt="" className='mx-auto w-20'/>
                               <h5 className='pt-3 font-semibold'>{service.title}</h5>
                               <p className='text-[#f5a467]'>{service.description}</p>
                               </div> 
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OurServices
