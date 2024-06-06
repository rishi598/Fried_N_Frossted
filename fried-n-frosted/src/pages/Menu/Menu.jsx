import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards';
import { FaFilter } from "react-icons/fa"

const Menu = () => {
    
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page


    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:6001/menu");
                const data = await response.json();
                // console.log(data);
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.log("Error Occured", error);
            }
        };
        fetchData();
    }, [])

    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);

        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    const sortItems = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
              sortedItems.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case "Z-A":
              sortedItems.sort((a, b) => b.name.localeCompare(a.name));
              break;
            case "low-to-high":
              sortedItems.sort((a, b) => a.price - b.price);
              break;
            case "high-to-low":
              sortedItems.sort((a, b) => b.price - a.price);
              break;
            default:
              // Do nothing for the "default" case
              break;
          }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            {/* menu banner */}
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-48 flex flex-col  justify-center items-center gap-8'>

                    <div className='text-center space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>For the Love of Delicious <span className='text-orange'>Food</span></h2>
                        <p className='text-xl text-[#4A4A4A] md:w-4/5 mx-auto'>Come with family & feel the joy of mouthwatering food such as
                            Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
                            Rellenas and more for a moderate cost</p>
                        {/* <button className='btn bg-orange px-8 py-3 font-semibold text-white rounded-full' >Order Now</button> */}
                    </div>

                </div>

            </div>
            {/* Menu section */}
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
                {/* btns and sort */}
                <div className='flex flex-cols md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    {/* buttons */}
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                        <button className={selectedCategory === "all" ? "text-orange underline underline-offset-4 decoration-orange" : ""} onClick={showAll}>All</button>
                        <button className={selectedCategory === "salad" ? "text-orange underline underline-offset-4 decoration-orange" : ""} onClick={() => filterItems("salad")}>Salad</button>
                        <button className={selectedCategory === "pizza" ? "text-orange underline underline-offset-4 decoration-orange" : ""} onClick={() => filterItems("pizza")}>Pizza</button>
                        <button className={selectedCategory === "soup" ? "text-orange underline underline-offset-4 decoration-orange" : ""} onClick={() => filterItems("soup")}>Soups</button>
                        <button className={selectedCategory === "dessert" ? "text-orange underline underline-offset-4 decoration-orange" : ""} onClick={() => filterItems("dessert")}>Desserts</button>
                        <button className={selectedCategory === "drinks" ? "text-orange underline underline-offset-4 decoration-orange" : ""} onClick={() => filterItems("drinks")}>Drinks</button>
                        
                    </div>
                    <div className='flex justify-end mb-4 rounded-sm'>
                        <div className='bg-black p-2'>
                            <FaFilter className='h-4 w-4 text-white'/>
                        </div>
                        {/* sorting */}
                        <select name="sort" id="sort" onChange={(e) => sortItems(e.target.value)} value={sortOption} className='bg-black text-white px-2 py-1 rounded-sm'>
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low-to-High</option>
                            <option value="high-to-low">High-to-Low</option>
                        </select>
                    </div>
                </div>
                {/* menu items */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
                    {
                       currentItems.map((item) => (
                        <Cards key={item._id} item = {item}/>
                       )) 
                    }
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-orange text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
        </div>
    )
}

export default Menu
