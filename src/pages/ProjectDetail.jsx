import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Tab,
  Tabs,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  LinearProgress, // Import LinearProgress for the progress bar
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Work, Build, Construction, Folder } from "@mui/icons-material"; // Icons

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { project } = location.state || {};

  useEffect(() => {
    if (!project) {
      navigate("/"); // Go to the project list if no project data
    }
  }, [project, navigate]);

  const [activeTab, setActiveTab] = useState(0);
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const [newMilestoneDeadline, setNewMilestoneDeadline] = useState("");
  const [milestones, setMilestones] = useState([
    { name: "Phase 1: Initial Setup", deadline: "2025-01-20" },
    { name: "Phase 2: Feature Development", deadline: "2025-02-10" },
    { name: "Weekly: Team Sync-up", deadline: "2025-01-15" },
  ]);

  const [tasks, setTasks] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [newTask, setNewTask] = useState({
    description: "",
    milestone: "",
    assignee: "",
    priority: "",
    status: "",
    deadline: "",
  });
  const [newBug, setNewBug] = useState({
    description: "",
    milestone: "",
    assignee: "",
    priority: "",
    status: "",
    deadline: "",
  });

  const teamMembers = project.teamMembers || [];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddMilestone = () => {
    if (newMilestoneName.trim() && newMilestoneDeadline) {
      const newMilestoneObj = { name: newMilestoneName, deadline: newMilestoneDeadline };
      setMilestones([...milestones, newMilestoneObj]);
      setNewMilestoneName(""); // Clear milestone name input
      setNewMilestoneDeadline(""); // Clear milestone deadline input
    } else {
      alert("Please provide both a milestone name and a deadline.");
    }
  };

  const handleAddTask = () => {
    if (newTask.description.trim() && newTask.milestone) {
      const newTaskObj = { ...newTask };
      setTasks([...tasks, newTaskObj]);
      setNewTask({
        description: "",
        milestone: "",
        assignee: "",
        priority: "",
        status: "",
        deadline: "",
      });
    } else {
      alert("Please provide both task description and milestone.");
    }
  };

  const handleAddBug = () => {
    if (newBug.description.trim() && newBug.milestone) {
      const newBugObj = { ...newBug };
      setBugs([...bugs, newBugObj]);
      setNewBug({
        description: "",
        milestone: "",
        assignee: "",
        priority: "",
        status: "",
        deadline: "",
      });
    } else {
      alert("Please provide bug details.");
    }
  };

  // Calculate progress based on completed tasks
  const completedTasks = tasks.filter(task => task.status === "Completed").length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  if (!project) {
    return <Typography>Loading...</Typography>;
  }

  // Mapping of icon names to components
  const Icons = {
    Work: Work,
    Build: Build,
    Construction: Construction,
    Folder: Folder,
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Project: {project.name}
      </Typography>

      {/* Render the icon dynamically */}
      <Box sx={{ fontSize: 50, color: "primary.main", marginBottom: 1 }}>
        {React.createElement(Icons[project.icon])}
      </Box>

      {/* Tabs for Project Details */}
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="project tabs">
        <Tab label="Project Description" />
        <Tab label="Documents & Links" />
        <Tab label="Project Goals" />
        <Tab label="Team Members" />
        <Tab label="Milestones" />
        <Tab label="Tasks" />
        <Tab label="Progress" /> {/* New Progress Tab */}
        <Tab label="Bugs" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Project Description:
          </Typography>
          <TextField
            label="Project Description"
            multiline
            fullWidth
            rows={4}
            value={project.description}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Project Links:
          </Typography>
          <TextField
            label="Project Links"
            multiline
            fullWidth
            rows={4}
            value={project.links}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Project Goals:
          </Typography>
          <TextField
            label="Project Goals"
            multiline
            fullWidth
            rows={4}
            value={project.goals}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}

      {activeTab === 3 && ( // Team Members tab content
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Team Members:
          </Typography>
          <List>
            {project.teamMembers && project.teamMembers.length > 0 ? (
              project.teamMembers.map((member, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={member.name}
                    secondary={`Role: ${member.role}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No team members added.</Typography>
            )}
          </List>
        </Box>
      )}

      {activeTab === 4 && ( // Milestones tab content
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Milestones:
          </Typography>

          {/* List of Milestones */}
          <List>
            {milestones.length > 0 ? (
              milestones.map((milestone, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={milestone.name}
                    secondary={`Deadline: ${milestone.deadline}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No milestones added.</Typography>
            )}
          </List>

          {/* Input to add new milestone */}
          <Box sx={{ marginTop: 2 }}>
            <TextField
              label="New Milestone"
              fullWidth
              value={newMilestoneName}
              onChange={(e) => setNewMilestoneName(e.target.value)}
              margin="dense"
            />
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              value={newMilestoneDeadline}
              onChange={(e) => setNewMilestoneDeadline(e.target.value)}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddMilestone}
                >
                  Add Milestone
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      {activeTab === 5 && ( // Tasks Tab
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Tasks:
          </Typography>

          {/* List of Tasks */}
          <List>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={task.description}
                    secondary={`Milestone: ${task.milestone}, Assignee: ${task.assignee}, Priority: ${task.priority}, Status: ${task.status}, Deadline: ${task.deadline}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No tasks added.</Typography>
            )}
          </List>

          {/* Input to add new task */}
          <Box sx={{ marginTop: 2 }}>
            <TextField
              label="Task Description"
              fullWidth
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Milestone</InputLabel>
              <Select
                value={newTask.milestone}
                onChange={(e) => setNewTask({ ...newTask, milestone: e.target.value })}
                label="Milestone"
              >
                {milestones.map((milestone, index) => (
                  <MenuItem key={index} value={milestone.name}>
                    {milestone.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Assignee</InputLabel>
              <Select
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                label="Assignee"
              >
                {teamMembers.map((member, index) => (
                  <MenuItem key={index} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Priority</InputLabel>
              <Select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </Box>
        </Box>
      )}

      {activeTab === 6 && ( // Project Progress Tab
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Project Progress:
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ marginTop: 2 }} />
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {completedTasks} out of {totalTasks} tasks completed. Progress: {progress.toFixed(2)}%
          </Typography>
        </Box>
      )}

      {activeTab === 7 && ( // Bugs Tab
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Bugs:
          </Typography>
          {/* List of Bugs */}
          <List>
            {bugs.length > 0 ? (
              bugs.map((bug, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={bug.description}
                    secondary={`Milestone: ${bug.milestone}, Assignee: ${bug.assignee}, Priority: ${bug.priority}, Status: ${bug.status}, Deadline: ${bug.deadline}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No bugs reported.</Typography>
            )}
          </List>

          {/* Input to add new bug */}
          <Box sx={{ marginTop: 2 }}>
            <TextField
              label="Bug Description"
              fullWidth
              value={newBug.description}
              onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Milestone</InputLabel>
              <Select
                value={newBug.milestone}
                onChange={(e) => setNewBug({ ...newBug, milestone: e.target.value })}
                label="Milestone"
              >
                {milestones.map((milestone, index) => (
                  <MenuItem key={index} value={milestone.name}>
                    {milestone.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Assignee</InputLabel>
              <Select
                value={newBug.assignee}
                onChange={(e) => setNewBug({ ...newBug, assignee: e.target.value })}
                label="Assignee"
              >
                {teamMembers.map((member, index) => (
                  <MenuItem key={index} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Priority</InputLabel>
              <Select
                value={newBug.priority}
                onChange={(e) => setNewBug({ ...newBug, priority: e.target.value })}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                value={newBug.status}
                onChange={(e) => setNewBug({ ...newBug, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              value={newBug.deadline}
              onChange={(e) => setNewBug({ ...newBug, deadline: e.target.value })}
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleAddBug}
            >
              Add Bug
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProjectDetail;
