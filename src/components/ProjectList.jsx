import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { Work, Build, Construction, Folder } from "@mui/icons-material"; // Example icons
import { useNavigate } from "react-router-dom";

// Sample project data
const initialProjects = [
  {
    name: "Project A",
    icon: "Work",
    description: "Description A",
    links: "Link A",
    goals: "Goal A",
  },
  {
    name: "Project B",
    icon: "Build",
    description: "Description B",
    links: "Link B",
    goals: "Goal B",
  },
  {
    name: "Project C",
    icon: "Construction",
    description: "Description C",
    links: "Link C",
    goals: "Goal C",
  },
  {
    name: "Project D",
    icon: "Folder",
    description: "Description D",
    links: "Link D",
    goals: "Goal D",
  },
];

const ProjectList = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectIcon, setNewProjectIcon] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectLinks, setNewProjectLinks] = useState("");
  const [newProjectGoals, setNewProjectGoals] = useState("");
  const navigate = useNavigate();

  // Function to handle opening the "Create New Project" dialog
  const handleCreateProject = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog without creating a project
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProjectName(""); // Reset form data
    setNewProjectIcon("");
    setNewProjectDescription("");
    setNewProjectLinks("");
    setNewProjectGoals("");
  };

  // Function to handle submitting the form
  const handleSubmitProject = () => {
    if (newProjectName && newProjectIcon) {
      const newProject = {
        name: newProjectName,
        icon: newProjectIcon,
        description: newProjectDescription,
        links: newProjectLinks,
        goals: newProjectGoals,
      };
      setProjects((prevProjects) => [...prevProjects, newProject]);
      handleCloseDialog(); // Close the dialog after submission
    } else {
      alert("Please provide both project name and icon");
    }
  };

  // Function to handle navigation with state
  const handleProjectClick = (project) => {
    navigate(`/project/${project.name}`, {
      state: { project }, // Passing the project data as state (icon as string)
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Project List
      </Typography>

      {/* Button to create a new project */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateProject}
        sx={{ marginBottom: 2 }}
      >
        Create New Project
      </Button>

      {/* Display projects in a vertical layout */}

      <div className="verticalList">
        {projects.map((project, index) => (
          <Card
            key={index}
            onClick={() => handleProjectClick(project)}
            sx={{ marginBottom: 2 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Box sx={{ color: "primary.main", marginBottom: 1 }}>
                {React.createElement(Icons[project.icon])}{" "}
                {/* Render icon dynamically */}
              </Box>
              <Typography variant="h6">{project.name}</Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2 }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for creating a new project */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Icon"
            fullWidth
            value={newProjectIcon}
            onChange={(e) => setNewProjectIcon(e.target.value)}
            helperText="Enter icon name (e.g., 'Work', 'Build')"
          />
          <TextField
            margin="dense"
            label="Project Description"
            fullWidth
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Links"
            fullWidth
            value={newProjectLinks}
            onChange={(e) => setNewProjectLinks(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Goals"
            fullWidth
            value={newProjectGoals}
            onChange={(e) => setNewProjectGoals(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitProject} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Mapping of icon names to actual components
const Icons = {
  Work: Work,
  Build: Build,
  Construction: Construction,
  Folder: Folder,
};

export default ProjectList;
