const Menu = require("../models/Menu");


const getAllMenuItems = async(req,res) => {
    try{
        const menus = await Menu.find({}).sort({createdAt: -1});
        console.log(menus)
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const postMenuItem = async (req,res) => {
    const newItem = req.body;
    try {
       const result = await Menu.create(newItem);
       res.status(200).json(result) 
       console.log(result)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteMenuItem = async(req, res) => {
    const menuId = req.params.id;
    console.log(menuId)
    try {
        const deletedItem = await Menu.findByIdAndDelete(menuId);
        if(!deletedItem){
            return res.status(404).json({message: "Menu not found"})
        }
        res.status(200).json({message:"Ïtem Deleted Successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
     const menu = await Menu.findById(menuId);
     res.status(200).json(menu);   
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const updateMenuItem = async (req,res) => {
    const menuId = req.params.id;
    const {name, price, category, recipe, image, outOfStock} = req.body;
    try {
       const updatedMenu = await Menu.findByIdAndUpdate(menuId, {name, price, category, recipe, image, outOfStock},
        {new: true},
        {runValidator: true}
    );
     if(!updatedMenu){
        return res.status(404).json({message: "Menu not found"})
     }
     res.status(200).json(updatedMenu)

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}   

// const addOutOfStockField = async (req, res) => {
//     try {
//         // const currentDate = new Date();
//         const addOutOfStockField = await Menu.updateMany(
//             { outOfStock: {$exists: false} },
//             { $set: { outOfStock:  false} }
//         );
//         res.status(200).json(addOutOfStockField) 
//     } catch (error) {
//         res.status(500).json({ message: error.message});
//     }

// }

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem,
    // addOutOfStockField
}