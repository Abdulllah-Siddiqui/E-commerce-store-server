import mongoose from "mongoose";

const address = new mongoose.Schema({
    
    userID:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userName:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userContact:{
        type: mongoose.SchemaTypes.String,
    },
    userCountry:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userProvince:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userCity:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userAddress:{
        type: mongoose.SchemaTypes.String,
    },
    isDefault:{
        type:mongoose.SchemaTypes.Boolean,
        default: false
    }
  
},{
    timestamps:true,
}
);

const Address = mongoose.model('address', address);

export default Address;
