import * as React from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

interface UBMessageTableProps extends Omit<DataGridProps, "columns" | "rows"> {
  columns: GridColDef[];
  rows: any[];
}

const UBMessageTable: React.FC<UBMessageTableProps> = ({
  columns,
  rows,
  ...dataGridProps
}) => {
  const theme = useTheme(); // Access the MUI theme

  return (
    <div
      style={{
        height: 800,
        width: "100%",
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff", // Dark background for dark mode
        color: theme.palette.mode === "dark" ? "#fff" : "#000", // Text color change for dark mode
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#e0e0e0"
            }`, // Cell border color for dark mode
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#1d1d1d" : "#f5f5f5", // Header background color
            color: theme.palette.mode === "dark" ? "#e0e0e0" : "#000",
          },
        }}
        {...dataGridProps}
      />
    </div>
  );
};

export default UBMessageTable;
