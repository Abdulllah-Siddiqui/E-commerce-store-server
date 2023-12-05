import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  token: {
    type: String,
    default:null
  },
  isVerified:{
    type: Boolean,
    default:false
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  mobile: {
    type: mongoose.SchemaTypes.Number,
    required: false
  },
  image: {
    type: mongoose.SchemaTypes.String,
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  stripeId:{
    type: String,
    default: null
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: false,
    default: new Date()
  },

});
const User = mongoose.model('users', userSchema);

export default User;
