import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa"
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import useCart from "../hooks/useCart";

const Cards = ({ item }) => {
    
    const {name, recipe, image, price, category, outOfStock, _id} = item
    console.log(item)
    const [isLiked, setLiked] = useState(false);
    const [cart, refetch] = useCart();
    const {user} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    
    
    const handleLike = () => {
        setLiked(!isLiked);
    }
    //  add to cart
    const handleAddtoCart = (item) => {
        // console.log("button is clicked", item)
        if(user && user?.email) {
            const cartItem = {menuItemId: _id, name, recipe, category, quantity: 1, image, price, email: user.email};
            console.log(cartItem);
            axios.post("http://localhost:6001/carts", cartItem).then(response => {
                // console.log(response); 
                if(response){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Food added to the cart!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }).catch ((error) => {
                console.log(error.response.data.message);
                const errorMessage = error.response.data.message;
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `${errorMessage}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        } else {
            Swal.fire({
                title: "Please Login to order food",
                text: "Without an account can't able to add products",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Signup Now!"
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/signup', {state: {from: location}})
                }
              });   
        }
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
                  {item.outOfStock === false ?  <button className="btn bg-orange text-white rounded-full w-40" onClick={() => handleAddtoCart(item)}>Add to Cart</button> : <div>Out of Stock</div>}
                </div>
            </div>
        </div>

    )
}

export default Cards
