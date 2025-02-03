import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

export const RolesTable: React.FC = () => {
  const [roles, setRoles] = useState([
    { id: 1, role: "Super Admin", description: "Full access to the system" },
    { id: 2, role: "Admin", description: "Admin role" },
    { id: 3, role: "Staff", description: "Staff role" },
    { id: 4, role: "Student", description: "Student Role" },
    { id: 5, role: "Student", description: "Student Role" },
    { id: 6, role: "Student", description: "Student Role" },
    { id: 7, role: "Student", description: "Student Role" },
    { id: 8, role: "Student", description: "Student Role" },
    { id: 9, role: "Student", description: "Student Role" },
    { id: 10, role: "Student", description: "Student Role" },
    { id: 11, role: "Student", description: "Student Role" },
    { id: 12, role: "Student", description: "Student Role" },
    { id: 13, role: "Student", description: "Student Role" },
  ]);

  // Handle delete
  const handleDelete = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  // Handle edit (For now, just logs the edit action)
  const handleEdit = (id: number) => {
    console.log("Edit role with ID:", id);
  };

  const columns: GridColDef[] = [
    { field: "role", headerName: "Role", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const row = params.row as { id: number; role: string };
        return (
          <div>
            <IconButton
              onClick={() => handleEdit(row.id)}
              color="primary"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.id)}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "3%", height: "100%", width: "100%" }}>
      <DataGrid
        rows={roles}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        editMode="row"
      />
    </div>
  );
};

export const UsersTable: React.FC = () => {
  return <div style={{ padding: "3%" }}>Users Table</div>;
};
