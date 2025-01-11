import React, { useState, useEffect } from "react";
import { Typography, Box, Tab, Tabs, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Work, Build, Construction, Folder } from "@mui/icons-material"; // Icons

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get project from state (this will contain the project data, including the icon name)
  const { project } = location.state || {}; 

  // Redirect if project data is missing
  useEffect(() => {
    if (!project) {
      navigate("/"); // Go to the project list if no project data
    }
  }, [project, navigate]);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
    </Box>
  );
};

export default ProjectDetail;
