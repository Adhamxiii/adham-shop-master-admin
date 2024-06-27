import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "AdhamShopMaster_Admin", // change DB Name
    });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};
