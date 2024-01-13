import { ChangeEvent, useEffect, useState } from "react";
import {get, remove}  from "../api/Calls";
import {User}  from "../models/User";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../components/TablePaginationActions";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, TableHead, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UserFilterDto } from "../models/UserFilterDto";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';


export default function UserList() {

    const [users, setUsers] = useState<PaginationResponse<User>>({ rows: [], count: 0 });
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const navigate = useNavigate();
    
    useEffect(() => {
        getUsers().then(d => setUsers(d));
    })

    async function getUsers() {
        return (await get("/user")) as PaginationResponse<User>;
    }

    function newUser(){
        navigate("/NewUser");
    }

    function handleChangePage(){

    }

    function handleChangeRowsPerPage(){

    }

    return (
        <div>
    
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            style={{ marginBottom: '30px' }}
          >
    
            <h1>Filters</h1>
            <div>
    
              <TextField
                label="userName"
                // value={userFilter.userName}
                // onChange={onChangeFilter}
                name="userName"
              />
    
              <TextField
                label="userEmail"
                // value={userFilter.employeeSurName}
                // onChange={onChangeFilter}
                name="userEmail"
              />
    
            </div>
    
            {/* <div>
              <Button style={{ marginRight: '8px' }} startIcon={<FilterAltIcon />} variant="contained" onClick={filterUser}>
                Filter
              </Button>
    
              <Button startIcon={<ClearIcon />} variant="contained" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div> */}
    
          </Box>
    
          <Button style={{ marginBottom: '20px' }} startIcon={<AddCircleIcon />} variant="contained" onClick={newUser}>New User</Button>
    
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Email</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.rows.map((row) => (
                  <TableRow key={row.UserId}>
                    <TableCell align="left">
                      {row.UserId}
                    </TableCell>
                    <TableCell align="left">
                      {row.UserName}
                    </TableCell>
                    <TableCell align="left">
                      {row.UserEmail}
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<EditIcon />}
                        color="success"
                        //onClick={() => editUser(row.UserId)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        startIcon={<CancelIcon />}
                        color="error"
                        //onClick={() => deleteUser(row.UserId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={users.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      );
}