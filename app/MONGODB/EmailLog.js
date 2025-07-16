import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema({
    trackingId: {
        type: String,
        required: true
    },
    shopURL: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'failed'],
        default: 'sent',
    },
    isViewed: {
        type: Boolean,
        default: false,
    },
    response: {
        type: String,
        default: null,
    },
    error: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

const EmailLog = mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema);

export default EmailLog;