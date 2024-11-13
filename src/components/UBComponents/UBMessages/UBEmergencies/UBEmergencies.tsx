import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import UBMessageTable from "../../../../common/UBMessageTable/UBMessageTable";
import { Button } from "@mui/material"; // Import MUI button component
import UBBreadcrumb from "../../../../common/UBBreadcrumbs/UBBreadcrumbs";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 }, // Using flex instead of width
  { field: "emergencyMessage", headerName: "Emergency Message", flex: 1 },
  {
    field: "viewDetails",
    headerName: "View Details",
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleViewDetails(params.row)}
      >
        View
      </Button>
    ), // Render a button in each row for this column
  },
];

// Sample handler for button click
const handleViewDetails = (row: any) => {
  console.log("Viewing details for:", row);
};

const rows = [
  {
    id: 1,
    emergencyMessage: "John Doe",
    viewDetails: 5,
  },
];

export const UBEmergencies: React.FC = () => {
  return (
    <div>
      <UBBreadcrumb pageName="Emergencies" />
      <UBMessageTable columns={columns} rows={rows} />
    </div>
  );
};

export default UBEmergencies;
