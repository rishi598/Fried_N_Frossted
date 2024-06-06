const mongoose = require('mongoose');
const {Schema} = mongoose;

// create a schema for menu

const MenuSchema = new Schema({
    name: {
            type: String,
            trim: true,
            required: true,
            minlength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number,
    outOfStock: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// create model 
const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;