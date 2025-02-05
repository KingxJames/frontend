import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export const AccessRightsTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Access Rights Table</div>;
};

// export default accessRightsTable;

export const BuildingsTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Buildings Table</div>;
};

export const CampusesTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Campuses Table</div>;
};

export const DepartmentMembersTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Department Members Table</div>;
};

export const DepartmentsTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Departments Table</div>;
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
