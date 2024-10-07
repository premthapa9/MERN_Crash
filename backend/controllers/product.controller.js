import mongoose from "mongoose";
import Task from "../models/product.model.js";

export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error", error.message);
    res.status(400).json({ success: false, message: "Task Not Found" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }
  try {
    const updateTask = await Task.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json({ success: true, data: updateTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addTask = async (req, res) => {
  const task = req.body; // user input
  if (!task.name || !task.price || !task.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all input value" });
  }
  const newTask = new Task(task);

  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error in create task", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }
  try {
    await Task.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfuyll" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
