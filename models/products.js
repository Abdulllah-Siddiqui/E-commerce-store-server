import mongoose from "mongoose";

const products = new mongoose.Schema({

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
    rating:{
        type: mongoose.SchemaTypes.Number,
    },
    quantity:{
        type: mongoose.SchemaTypes.Number
        },
    stock:{
        type: mongoose.SchemaTypes.Number,
        default:50
    },
    sold:{
        type: mongoose.SchemaTypes.Number,
    },
    brand:{
        type: mongoose.SchemaTypes.String,
    },
    category:{
        type: mongoose.SchemaTypes.String,
    },    
    thumbnail:{
        type: mongoose.SchemaTypes.String,
    },
    colour:{
        type: mongoose.SchemaTypes.String,
    },
    size:{
        type: mongoose.SchemaTypes.String,
    },
    images:{
        type: mongoose.SchemaTypes.Array,
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
    
},{
    timestamps:true,
}
);

const Products = mongoose.model('products', products);

export default Products;
