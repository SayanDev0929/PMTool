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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Sample departments for users
const departments = ["Developer", "Tester", "UI Designer", "Project Manager"];

const Users = () => {
  // Initial users data
  const initialUsers = [
    { id: 1, name: "Alice", department: "Developer" },
    { id: 2, name: "Bob", department: "Tester" },
    { id: 3, name: "Charlie", department: "UI Designer" },
  ];

  // State to manage users and dialog visibility
  const [users, setUsers] = useState(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Open dialog for creating or editing a user
  const handleOpenDialog = (mode, user = null) => {
    if (mode === "edit") {
      setDialogTitle("Edit User");
      setUserName(user.name);
      setUserDepartment(user.department);
      setEditingUser(user);
    } else {
      setDialogTitle("Add New User");
      setUserName("");
      setUserDepartment("");
      setEditingUser(null);
    }
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Create a new user or update an existing one
  const handleSubmit = () => {
    if (userName.trim() === "" || userDepartment.trim() === "") {
      alert("Please enter both user name and department.");
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...user, name: userName, department: userDepartment }
            : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1, // Simple ID generation for now
        name: userName,
        department: userDepartment,
      };
      setUsers([...users, newUser]);
    }

    handleCloseDialog();
  };

  // Delete a user
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* Button to add a new user */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog("add")}
        sx={{ marginBottom: 2 }}
      >
        Add New User
      </Button>

      {/* Displaying users list */}
      <List>
        {users.map((user) => (
          <ListItem key={user.id} sx={{ marginBottom: 1 }}>
            <Card sx={{ width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body1">{user.department}</Typography>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog("edit", user)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {/* Dialog for adding/editing users */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              value={userDepartment}
              onChange={(e) => setUserDepartment(e.target.value)}
            >
              {departments.map((dept, index) => (
                <MenuItem key={index} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingUser ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
