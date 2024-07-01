import mongoose from "mongoose";

const SMTPModelSchema = mongoose.Schema({
    host: String,
    username: String,
    password: String,
    port: Number,
    shopURL: String
})

const SMTPModel = mongoose.models.SMTPModel || mongoose.model("SMTPModel", SMTPModelSchema);

export default SMTPModel;
