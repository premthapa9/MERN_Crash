import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import taskRouter from "../backend/routes/product.router.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/tasks", taskRouter);
// Post to test the end point
console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
