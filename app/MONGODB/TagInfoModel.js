import mongoose from "mongoose";

const tagInfoScema = mongoose.Schema({
    Tag: String,
    tagEmailContent: String
})

const TagInfoModel = mongoose.models.TagInfo || mongoose.model("TagInfo", tagInfoScema);

export default TagInfoModel;




