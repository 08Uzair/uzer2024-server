import mongoose from "mongoose";

const URI =
  "mongodb+srv://avez3npqureshi:Yn2r4FLQtwGSlonp@cluster0.iqgv1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATA BASE IS CONNECTED");
  } catch (error) {
    console.log(error);
  } 
};
