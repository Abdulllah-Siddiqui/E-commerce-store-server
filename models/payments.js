import mongoose from "mongoose";

const payments = new mongoose.Schema({
    
    userID:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    cardNumber:{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    cardExpiry:{
        type: mongoose.SchemaTypes.String,
    },
    cardCVC:{
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    cardCountry:{
        type: mongoose.SchemaTypes.String,
    },
    cardType: {
        type: String,
        enum: ["Master", "Visa"],
        required: true
    },
  
},{
    timestamps:true,
}
);

const Payments = mongoose.model('payments', payments);

export default Payments;
