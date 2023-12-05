import mongoose from "mongoose";

const orders = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  userName: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  productDetails: {
    type: mongoose.SchemaTypes.Array,
  },
  status: {
    type: mongoose.SchemaTypes.String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  },
  action: {
    type: mongoose.SchemaTypes.String,
    enum: ['Delivered', 'Not Delivered'],
    default: 'Not Delivered',
  },
  amount: {
    type: mongoose.SchemaTypes.Number,
    required: true
  },
  totalProducts: {
    type: mongoose.SchemaTypes.Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
},{
  timestamps:true,
}
);

const Orders = mongoose.model('orders', orders);

export default Orders;
