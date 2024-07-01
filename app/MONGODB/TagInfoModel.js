import mongoose from "mongoose";

const tagInfoScema = mongoose.Schema({
    tag: String,
    tagEmailContent: String,
    createdAt: Date,
    shopURL: String
})

const TagInfoModel = mongoose.models.TagInfo || mongoose.model("TagInfo", tagInfoScema);

export default TagInfoModel;




