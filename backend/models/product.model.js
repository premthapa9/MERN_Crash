import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true, // created at, updated at
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
