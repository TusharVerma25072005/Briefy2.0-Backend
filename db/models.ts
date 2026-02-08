import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
    isRead : {
        type: Boolean,
        default: false,
    },
    senderName : {
        type: String,
    },
    from : {
        type: String,
    },
    to : {
        type: String,
    },
    subject : {
        type: String,
    },
    emailBody : {
        type: String,
        required: true,
    },
    oneLineSummary : {
        type: String,
    },
    detailedSummary : {
        type: String,
    },
    time : {
        type: Date,
    }
},
    { timestamps: true }    
);

export default mongoose.models.Email || mongoose.model('Email', emailSchema);