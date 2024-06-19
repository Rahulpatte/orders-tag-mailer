import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const mongoConnect = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    let connection = await mongoose.connect(`${MONGODB_URI}/Orders-Tag-Mailer`);
    console.log("mongoDB connection successful.........🔥");
    return connection
  } catch (error) {
    console.log("Error in Database");
    return error;
  }
}

export default mongoConnect(); 
