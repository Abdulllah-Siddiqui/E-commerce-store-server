import mongoose from "mongoose";

const cart = new mongoose.Schema({
    productID:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userID:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    title:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description:{
        type: mongoose.SchemaTypes.String,
    },
    price:{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    brand:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    rating:{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    quantity:{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    colour:{
        type: mongoose.SchemaTypes.String,
    },
    size:{
        type: mongoose.SchemaTypes.String,
    },
    thumbnail:{
        type: mongoose.SchemaTypes.String,
    }
  
});

const Cart = mongoose.model('cart', cart);

export default Cart;
