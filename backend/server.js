import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import taskRouter from "../backend/routes/product.router.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/tasks", taskRouter);
// Post to test the end point

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
