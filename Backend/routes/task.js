const router=require('express').Router();
const Task=require('../models/task');
const User=require('../models/user');
const authenticateToken = require('./auth');
// Create a new task

router.post("/create-task", authenticateToken , async(req,res)=>{
       try{
              const{title,desc}=req.body;
              const {id}=req.headers;
              const newTask=new Task({
                     title:title,
                     desc:desc
              })
              const saveTask=await newTask.save();
              const taskId=saveTask._id;
              await User.findByIdAndUpdate(id,{$push: {tasks:taskId}});
              res.status(200).json({ message: "Task created successfully"});
       }
       catch(error){
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }      
})
// Get all tasks for a user
router.get("/get-all-tasks", authenticateToken , async(req,res)=>{
       try{
              const {id}=req.headers;
              const userData=await User.findById(id).populate({ path: "tasks" ,options: { sort: { createdAt: -1 } } });
              res.status(200).json({ data:userData});
       }
       catch(error){
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
})
//delete a task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
       try {
              const { id } = req.params;
              const userId=req.headers.id;              
              await Task.findByIdAndDelete(id);
              await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
              res.status(200).json({ message: "Task deleted successfully" });
       } catch (error) {
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
});
router.put("/update-task/:id", authenticateToken, async (req, res) => {
       try {
              const { id } = req.params;
              const {title,desc}=req.body;              
              await Task.findByIdAndUpdate(id, {title:title,desc:desc});
              res.status(200).json({ message: "Task updated successfully" });
       } catch (error) {
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
});

// update-important-task
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
       try {
              const { id } = req.params;
              const TaskData=await Task.findById(id);
              const ImpTask=TaskData.important;              
              await Task.findByIdAndUpdate(id, {important:!ImpTask});
              res.status(200).json({ message: "Task updated successfully" });
       } catch (error) {
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
});
// update-complete-task
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
       try {
              const { id } = req.params;
              const TaskData=await Task.findById(id);
              const CompleteTask=TaskData.complete;              
              await Task.findByIdAndUpdate(id, {complete:!CompleteTask});
              res.status(200).json({ message: "Task updated successfully" });
       } catch (error) {
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
});
// get important tasks
router.get("/get-imp-tasks", authenticateToken , async(req,res)=>{
       try{
              const {id}=req.headers;
              const Data=await User.findById(id).populate({ path: "tasks" ,match: { important: true },options: { sort: { createdAt: -1 } } });
              const ImpTaskData=Data.tasks;
              res.status(200).json({ data:ImpTaskData });
       }
       catch(error){
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
})

// get complete tasks
router.get("/get-complete-tasks", authenticateToken , async(req,res)=>{
       try{
              const {id}=req.headers;
              const Data=await User.findById(id).populate({ path: "tasks" ,match: { complete: true },options: { sort: { createdAt: -1 } } });
              const CompTaskData=Data.tasks;
              res.status(200).json({ data:CompTaskData });
       }
       catch(error){
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
})     

// get incomplete tasks
router.get("/get-incomplete-tasks", authenticateToken , async(req,res)=>{
       try{
              const {id}=req.headers;
              const Data=await User.findById(id).populate({ path: "tasks" ,match: { complete: false },options: { sort: { createdAt: -1 } } });
              const InCompTaskData=Data.tasks;
              res.status(200).json({ data:InCompTaskData });
       }
       catch(error){
              console.log(error);
              res.status(400).json({ message: "Internal server error" });
       }
})
module.exports=router;