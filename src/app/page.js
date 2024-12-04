"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, TextField } from "@mui/material";

export default function BasicTable() {
  const [editName, setEditName] = React.useState("");
  const [secupdateColum, setSecUpdateColum] = React.useState("");
  const [updateColum, setUpdateColum] = React.useState([]);
  const [editMode, setEditMode] = React.useState(null);

  const updateName = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedColumns = updateColum.map((item) =>
        item.id === editMode ? { ...item, editName, secupdateColum } : item
      );
      setUpdateColum(updatedColumns);
      setEditMode(null);
    } else {
      const newTask = { id: Date.now(), editName, secupdateColum };
      setUpdateColum([...updateColum, newTask]);
    }
    setEditName("");
    setSecUpdateColum("");
  };

  const deleHandler = (id) => {
    let deletColum = [...updateColum];
    deletColum = deletColum.filter((item) => item.id !== id);
    setUpdateColum(deletColum);
  };

  const handleEdit = (id) => {
    const taskToEdit = updateColum.find((item) => item.id === id);
    setEditName(taskToEdit.editName);
    setSecUpdateColum(taskToEdit.secupdateColum);
    setEditMode(id);
  };

  return (
    <TableContainer component={Paper} sx={{ width: 850, margin: "auto" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Users Name</TableCell>
            <TableCell>
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "150px" } }}
                noValidate
                autoComplete="off"
                onSubmit={updateName}
                display={"flex"}
              >
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  value={secupdateColum}
                  onChange={(e) => setSecUpdateColum(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button type="submit">
                  {editMode ? "Update Data" : "Add Data"}
                </button>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updateColum.map((t) => (
            <TableRow
              key={t.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <h5>{t.editName}</h5>
                <h5>{t.secupdateColum}</h5>
                <button
                  onClick={() => {
                    deleHandler(t.id);
                  }}
                >
                  <DeleteIcon />
                </button>
                <button onClick={() => handleEdit(t.id)}>
                  <EditIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
