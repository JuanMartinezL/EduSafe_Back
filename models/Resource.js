import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: { 
    type: String, 
    required: true 
},
    description: { 
        type: String, 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
});
export default mongoose.model('Resource', resourceSchema);