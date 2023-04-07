import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(`${process.env.MONGO_URL}/auth-test`);
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("Error Mongo " + error);
  }
};
