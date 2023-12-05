import mongoose from "mongoose";

const notifications = new mongoose.Schema({
    userID:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    isRead:{
        type: mongoose.SchemaTypes.Boolean,
        default: false,
        required: true
    },
    body:{
        type: String,
        required: true
    }
},{
    timestamps:true
}
);

const Notifications = mongoose.model('notifications', notifications);

export default Notifications;
