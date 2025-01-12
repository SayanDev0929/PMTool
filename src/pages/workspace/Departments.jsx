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
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Departments = () => {
  // Initial departments data
  const initialDepartments = [
    { id: 1, name: "Developer" },
    { id: 2, name: "Tester" },
    { id: 3, name: "UI Designer" },
  ];

  // State to manage departments and dialog visibility
  const [departments, setDepartments] = useState(initialDepartments);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);

  // Open dialog for creating or editing a department
  const handleOpenDialog = (mode, department = null) => {
    if (mode === "edit") {
      setDialogTitle("Edit Department");
      setDepartmentName(department.name);
      setEditingDepartment(department);
    } else {
      setDialogTitle("Add New Department");
      setDepartmentName("");
      setEditingDepartment(null);
    }
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Create a new department or update an existing one
  const handleSubmit = () => {
    if (departmentName.trim() === "") {
      alert("Please enter a department name.");
      return;
    }

    if (editingDepartment) {
      // Update existing department
      setDepartments(
        departments.map((department) =>
          department.id === editingDepartment.id
            ? { ...department, name: departmentName }
            : department
        )
      );
    } else {
      // Add new department
      const newDepartment = {
        id: departments.length + 1, // Simple ID generation for now
        name: departmentName,
      };
      setDepartments([...departments, newDepartment]);
    }

    handleCloseDialog();
  };

  // Delete a department
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirmed) {
      setDepartments(departments.filter((department) => department.id !== id));
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Department Management
      </Typography>

      {/* Button to add a new department */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ marginBottom: 2 }}
      >
        Add New Department
      </Button>

      {/* Displaying department list */}
      <List>
        {departments.map((department) => (
          <ListItem key={department.id} sx={{ marginBottom: 1 }}>
            <Card sx={{ width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{department.name}</Typography>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog("edit", department)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(department.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {/* Dialog for adding/editing departments */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department Name"
            fullWidth
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingDepartment ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Departments;
