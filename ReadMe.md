# Breaking down the Project

# Two folder for frontend and backend

# Init packages

`npm init -y`

package.json file will be created.

# installed required library

`npm i mongoose express dotenv
`

mongoose for mongoDB, express for the API web framework, dotenv file to access .env variable

# configure the mongooseDB, have collection, create cluster

Post that have the connection string from mongooseDB and use it on .env file.

<b>Note:</b> You have to provide the password and collection name

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.pbinshj.mongodb.net/<collectionName>?retryWrites=true&w=majority&appName=<clusterName>
```

# Create server.js file inside backend which will be entry point. Basic setup work

<b>Note:</b> If you want to use modern JS import than old Common JS require. You can have key value "type":"module" in package.json file. By default it is commonjs'

```

import express from "express";
import dotenv from "dotenv";

dotenv.config(); // To access the env variable

const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
console.log("server started at http://localhost:" + PORT);
});

```

# Work on DB connection, create folder config and create file db.js

```
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
```

# Call the function on server.js while listening on port. Import connectDB function on server.js

```

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config(); // To access the env variable

const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
connectDB();
console.log("server started at http://localhost:" + PORT);
});

```

# Test the app

In order to test the app on local you can run below command.

`node backend/server.js`

On success execution you will be able to see the console message on terminal

# set up the script for execution, update package.json

```
"scripts": {
    "dev": "node backend/server.js"
  },

```

Post this you can run the command to execute script

```
npm run dev
```

<b>Note:</b> Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

# Install nodemon for automatically restarting the node application on any changes in the directory

`npm i -D nodemon`

# Update the package.json with nodemon changes

```
"scripts": {
    "dev": "nodemon backend/server.js"
  },
```

# Once the DB is up we can then proceed to perform CRUD Operation

Getting strated with get method

```
// Get Method for all record
app.get('/api/tasks/',async(req,res) => {
    try{
        const tasks = await Task.find({});
        res.status(200).json({success:true,data:tasks})
    }catch(error){
        res.status(500).json({success:false,message:'Data not found'})
    }
})

// POST Method for creation
app.post('/api/tasks/',async(req,res) => {
    const mytask = req.body;

    if(!mytask.name || !mytask.age){
        return res.status(400).json({success:false,message:'Enter all field'})
    }

    const mynewtask = new Task(mytask);

    try{
        await mynewtask.save();
        res.status(201).json({success:true,data:mynewtask})
    }catch(error){
        res.status(500).json({success:false,message:'Server error'})
    }
})

// Update method

app.put('/api/tasks/:id', async(req,res) => {
    const {id} = req.params;
    const newone = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:'Invalid task id'})
    }
    try{
        const updatetask = await Task.findByIdAndUpdate(id,newone,{new:true})
        res.status(200).json({success:true,data:updatetask})
    }catch(error){
        res.status(500).json({success:false,message:'Server Error})
    }
})


// Delete item
app.delete('/api/tasks/:id', async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:'Invalid task id'})
    }
    try{
        const deletetask = await Task.findByIdAndDelete(id)
        res.status(200).json({success:true,data:deletetask})
    }catch(error){
        res.status(500).json({success:false,message:'Server Error})
    }
})

// Fetch single record
app.get('/api/tasks/:id',async(req,res) => {
    try{
        const task = await Task.findById(req.params.id);
        res.status(200).json({success:true,data:task})
    }catch(error){
        res.status(500).json({success:false,message:'Data not found'})
    }
})
```

# All code is in single Server.js you can use differnt module for this. Like routes, controller.

Create folder Routes and file task.router.js

```import express from "express";

import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/product.controller.js";
// These are the controller which is nothing but the CRUD actions
const router = express.Router();

router.get("/", getTask);

router.put("/:id", updateTask);

// good practise to keep /api to know our api
router.post("/", addTask);

router.delete("/:id", deleteTask);

export default router;
```

Create controller folder and file task.controller.js

```import mongoose from "mongoose";
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
```

<b>Note:</b> The controller have only the action that we had on server.js

# As we moved all our changes to differnt module make relevent changes for the server.js

```import express from "express";
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
```
