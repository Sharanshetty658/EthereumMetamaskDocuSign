import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { address } from "../utility/smartcontract";

function DenseTable({ contracts }) {
  function createData(address, date, hash, detail) {
    return { address, date, hash, detail };
  }

  const rows = [];

  for (let i = 0; i < contracts.length; i++) {
    rows.push(
      createData(
        contracts[i][0],
        contracts[i][1],
        contracts[i][2],
        contracts[i][3]
      )
    );
  }
  console.log(rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Contract #</TableCell>
            <TableCell align="center">date</TableCell>
            <TableCell align="center">hashed</TableCell>
            <TableCell align="center">detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.hash}</TableCell>
              <TableCell align="right">{row.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const ContractTable = ({ contracts }) => {
  if (contracts !== undefined) {
    if (contracts.length !== 0)
      return (
        <>

          <DenseTable contracts={contracts} />
        </>
      );
  } else return <>No deployed contracted</>;
};
