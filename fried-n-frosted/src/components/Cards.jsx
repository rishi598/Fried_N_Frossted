import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa"

const Cards = ({ item }) => {
    const [isLiked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!isLiked);
    }

    
    return (

        
        
        <div  className= "card  shadow-xl relative mr-5 md:my-5">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-orange ${isLiked ? "text-rose-500" : "text-white"}`}
                onClick={handleLike} style={{borderTopLeftRadius:0,borderTopRightRadius:28,borderBottomLeftRadius:28, borderBottomRightRadius:0}}
            >
                <FaHeart className='h-5 w-5 cursor-pointer ' />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure><img src={item.image} alt="" className='hover:scale-105 transition-all duration-200 md:h-40' /></figure>
            </Link>
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold'><span className='text-sm text-red'>₹</span>{item.price}</h5>
                    <button className="btn bg-orange text-white rounded-full w-40">Add to Cart</button>
                </div>
            </div>
        </div>

    )
}

export default Cards
