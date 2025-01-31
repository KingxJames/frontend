import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InputBox from "../../../common/inputBox/inputBox";
import UBBreadcrumb from "../../../common/UBBreadcrumbs/UBBreadcrumbs";
import { selectName } from "../../../../store/features/authSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


function createData(
  id: number,
  campus: string,
  Actions: string,
 
) {
  return { id, campus };
}

// const rows = [
//   createData(1 , 159, 6.0),
//   createData(2, 237, 9.0),
//   createData(3, 262, 16.0),
//   createData(4, 305, 3.7),
//   createData(5, 356, 16.0),
// ];


export const UBSettings: React.FC = () => {
  const navigate = useNavigate();
  const name = useSelector(selectName);
  // const email = useSelector(selectEmail);

  const handleShowTable = () => {
    navigate("/campus");
  };



  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Button onClick={handleShowTable}>Campus</Button>
        <Button onClick={handleShowTable}> Buildings </Button>
      </Box>
    </>
  );
};

export default UBSettings;
