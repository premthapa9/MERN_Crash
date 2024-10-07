import express from "express";

import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getTask);

router.put("/:id", updateTask);

// good practise to keep /api to know our api
router.post("/", addTask);

router.delete("/:id", deleteTask);

export default router;
