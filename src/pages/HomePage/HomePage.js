import React, { useEffect, useState } from 'react';
import { UserService } from '../../services'; 
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TextField, Grid } from '@mui/material';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserService(); 
        setUsers(usersData); 
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phoneNumber.toLowerCase().includes(filters.phoneNumber.toLowerCase())
    );
  });

  return (
    <div>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={3}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={filters.firstName}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={filters.lastName}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phoneNumber"
            value={filters.phoneNumber}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.phoneNumber}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">No users found</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
