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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Work, Build, Construction, Folder } from "@mui/icons-material"; // Example icons
import { useNavigate } from "react-router-dom";

// Sample project data with team members
const initialProjects = [
  {
    name: "Project A",
    icon: "Work",
    description: "Description A",
    links: "Link A",
    goals: "Goal A",
    teamMembers: [
      { name: "Alice", role: "Developer" },
      { name: "Bob", role: "Tester" },
    ],
  },
  {
    name: "Project B",
    icon: "Build",
    description: "Description B",
    links: "Link B",
    goals: "Goal B",
    teamMembers: [
      { name: "Charlie", role: "UI Designer" },
      { name: "David", role: "Developer" },
    ],
  },
  {
    name: "Project C",
    icon: "Construction",
    description: "Description C",
    links: "Link C",
    goals: "Goal C",
    teamMembers: [
      { name: "Eve", role: "Developer" },
      { name: "Frank", role: "Tester" },
    ],
  },
  {
    name: "Project D",
    icon: "Folder",
    description: "Description D",
    links: "Link D",
    goals: "Goal D",
    teamMembers: [
      { name: "Grace", role: "Developer" },
      { name: "Hannah", role: "Project Manager" },
    ],
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
  const [newProjectTeamMembers, setNewProjectTeamMembers] = useState([
    { name: "", role: "" },
  ]);
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
    setNewProjectTeamMembers([{ name: "", role: "" }]);
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
        teamMembers: newProjectTeamMembers,
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
      state: { project }, // Passing the project data as state
    });
  };

  // Handle change in team member fields dynamically
  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...newProjectTeamMembers];
    updatedMembers[index][field] = value;
    setNewProjectTeamMembers(updatedMembers);
  };

  // Add a new team member input field
  const handleAddTeamMember = () => {
    setNewProjectTeamMembers([
      ...newProjectTeamMembers,
      { name: "", role: "" },
    ]);
  };

  // Predefined options for member names and roles
  const memberNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah"];
  const roles = ["Developer", "Tester", "UI Designer", "Project Manager"];

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

          {/* Team Members Section */}
          <Typography variant="h6" gutterBottom>
            Team Members
          </Typography>
          {newProjectTeamMembers.map((member, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              {/* Select for Member Name */}
              <FormControl fullWidth margin="dense">
                <InputLabel>Member Name</InputLabel>
                <Select
                  value={member.name}
                  onChange={(e) =>
                    handleTeamMemberChange(index, "name", e.target.value)
                  }
                  label="Member Name"
                >
                  {memberNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddTeamMember}
            sx={{ marginTop: 1 }}
          >
            Add Team Member
          </Button>
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
