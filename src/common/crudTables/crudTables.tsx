import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export const AccessRightsTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Access Rights Table</div>;
};


export const IncidentFilesTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Incident Files Table</div>;
};

export const IncidentReportsTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Incident Reports Table</div>;
};

export const IncidentStatusesTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Incident Statuses Table</div>;
};

export const IncidentTypesTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Incident Types Table</div>;
};

export const UsersTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Users Table</div>;
};
