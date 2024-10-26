import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    type_report: {
        type: String,
        required: true
    },
    creation_date: { 
        type: Date, 
        default: Date.now 
    },
    state: { 
        type: String, 
        default: 'open' 
    },
    reporting_user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    reporting_admin_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    anonimo: { 
        type: Boolean, 
        default: false 
    },
});
export default mongoose.model('Report', reportSchema);
