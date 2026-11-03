import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

// Initial tasks
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
  },
  {
    id: 2,
    taskName: "Create Dashboard",
    assignedTo: "Amit Kumar",
    status: "Completed",
  },
  {
    id: 3,
    taskName: "Test Application",
    assignedTo: "Priya Singh",
    status: "In Progress",
  },
];

// GET: All tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// GET: Task by ID
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

// POST: Add new task
app.post("/tasks", (req, res) => {
  const { id, taskName, assignedTo, status } = req.body;

  if (id == null || !taskName || !assignedTo || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (tasks.some((t) => t.id === Number(id))) {
    return res.status(409).json({ message: "Task ID already exists" });
  }

  const newTask = {
    id: Number(id),
    taskName,
    assignedTo,
    status,
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task added successfully",
    task: newTask,
  });
});

// PUT: Update task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { taskName, assignedTo, status } = req.body;

  if (!taskName || !assignedTo || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  task.taskName = taskName;
  task.assignedTo = assignedTo;
  task.status = status;

  res.status(200).json({
    message: "Task updated successfully",
    task,
  });
});

// DELETE: Remove task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
