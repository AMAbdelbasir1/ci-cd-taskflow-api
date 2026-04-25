const { tasks } = require("../data/store");

exports.createTask = (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
    userId: req.user.id,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

exports.getTasks = (req, res) => {
  const userTasks = tasks.filter((t) => t.userId === req.user.id);
  res.json(userTasks);
};

exports.updateTask = (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const index = tasks.findIndex((t) => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted" });
};
