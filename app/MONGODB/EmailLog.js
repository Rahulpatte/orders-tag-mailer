import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema({
    shopURL: String,
    to: String,
    subject: String,
    html: String,
    status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
    response: String,
    error: String,
}, {
    timestamps: true
});

const EmailLog = mongoose.models.EmailLog || mongoose.model("EmailLog", emailLogSchema);

export default EmailLog;