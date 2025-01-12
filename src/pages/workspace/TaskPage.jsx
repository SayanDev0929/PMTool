import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  CardActions,
  Divider,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

// Sample task assignees, priorities, task types, and statuses
const assignees = ["Alice", "Bob", "Charlie", "David"];
const priorities = ["Low", "Medium", "Urgent"];
const taskTypes = ["Bug", "Feature", "Improvement"];
const statuses = ["Pending", "In Progress", "Development Done", "Completed"];

const TaskPage = () => {
  // Initial task data
  const initialTasks = [
    {
      id: 1,
      description: "Fix login page bug",
      priority: "Urgent",
      type: "Bug",
      deadline: "2025-01-15",
      assignee: "Alice",
      status: "Pending",
      comments: ["Initial comment for the task"], // New comments field
    },
    {
      id: 2,
      description: "Implement new feature X",
      priority: "Medium",
      type: "Feature",
      deadline: "2025-02-01",
      assignee: "Bob",
      status: "In Progress",
      comments: [], // Empty comments initially
    },
  ];

  // State to manage tasks, dialog visibility, and form data
  const [tasks, setTasks] = useState(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStatus, setTaskStatus] = useState(""); // Task status state
  const [taskComments, setTaskComments] = useState(""); // New state for task comments
  const [editingTask, setEditingTask] = useState(null);

  // Open dialog for add/edit task
  const handleOpenDialog = (mode, task = null) => {
    if (mode === "edit") {
      setTaskDescription(task.description);
      setTaskPriority(task.priority);
      setTaskType(task.type);
      setTaskDeadline(task.deadline);
      setTaskAssignee(task.assignee);
      setTaskStatus(task.status); // Set task status when editing
      setTaskComments(""); // Reset comments input field
      setEditingTask(task);
    } else {
      setTaskDescription("");
      setTaskPriority("");
      setTaskType("");
      setTaskDeadline("");
      setTaskAssignee("");
      setTaskStatus(""); // Reset task status for new task
      setTaskComments(""); // Reset comments input field
      setEditingTask(null);
    }
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Add or edit task
  const handleSubmit = () => {
    if (
      !taskDescription ||
      !taskPriority ||
      !taskType ||
      !taskDeadline ||
      !taskAssignee ||
      !taskStatus // Ensure status is also selected
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      id: editingTask ? editingTask.id : tasks.length + 1,
      description: taskDescription,
      priority: taskPriority,
      type: taskType,
      deadline: taskDeadline,
      assignee: taskAssignee,
      status: taskStatus, // Include task status
      comments: editingTask ? editingTask.comments : [], // Preserve comments for editing
    };

    if (editingTask) {
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? newTask : task))
      );
    } else {
      setTasks([...tasks, newTask]);
    }

    handleCloseDialog();
  };

  // Add comment to task
  const handleAddComment = (taskId) => {
    if (!taskComments) {
      alert("Please enter a comment.");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, taskComments] }
          : task
      )
    );
    setTaskComments(""); // Clear comment input field after submission
  };

  // Delete task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task Management
      </Typography>

      {/* Button to add a new task */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ marginBottom: 2, borderRadius: 2 }}
      >
        Add New Task
      </Button>

      {/* Task List */}
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Priority:</strong> {task.priority}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Type:</strong> {task.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Deadline:</strong> {task.deadline}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Assignee:</strong> {task.assignee}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong> {task.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Comments:</strong> {task.comments.length} comment(s)
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog("edit", task)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(task.id)}
                >
                  <Delete />
                </IconButton>
                <IconButton color="default" onClick={() => alert("View Task")}>
                  <Visibility />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for adding/editing tasks */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Description"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            margin="dense"
            variant="outlined"
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              label="Priority"
            >
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Task Type</InputLabel>
            <Select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              label="Task Type"
            >
              {taskTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Deadline"
            type="date"
            fullWidth
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            margin="dense"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />

          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Assignee</InputLabel>
            <Select
              value={taskAssignee}
              onChange={(e) => setTaskAssignee(e.target.value)}
              label="Assignee"
            >
              {assignees.map((assignee) => (
                <MenuItem key={assignee} value={assignee}>
                  {assignee}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* New Select field for Task Status */}
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              label="Status"
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Input for adding comments */}
          <TextField
            label="Add a Comment"
            fullWidth
            value={taskComments}
            onChange={(e) => setTaskComments(e.target.value)}
            margin="dense"
            variant="outlined"
          />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => handleAddComment(editingTask?.id)}
            sx={{ marginTop: 2 }}
          >
            Add Comment
          </Button>

          {/* Display comments */}
          {editingTask && editingTask.comments.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Comments</Typography>
              <Divider sx={{ marginBottom: 1 }} />
              {editingTask.comments.map((comment, index) => (
                <Typography key={index} variant="body2">
                  - {comment}
                </Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingTask ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskPage;
