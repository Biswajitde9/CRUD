import mongoose from "mongoose";

const connectDB = async () => {
  const { connection } = await mongoose.connect(
    "mongodb://127.0.0.1:27017/crud-app",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(`Database connected on ${connection.host}`);
};

export default connectDB;
