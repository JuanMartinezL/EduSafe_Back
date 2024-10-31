import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true 
        },
    roleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    },
    image: { 
        type: String 

    }
});

export default mongoose.model('User', userSchema);
