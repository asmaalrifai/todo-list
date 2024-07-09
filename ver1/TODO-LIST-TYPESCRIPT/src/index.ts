import * as mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/todolist")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
