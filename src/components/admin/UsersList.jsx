// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'api/admin';
import { IconButton } from '@mui/material';
import User from './User';
import { setUsers } from 'state';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function UsersList() {
    const dispatch = useDispatch();
    const adminToken = useSelector((state) => state.adminToken)
    // const [users, setUsers] = useState();
    const users = useSelector((state)=> state.users)

    const getAllUsers = async () => {
        const data = await getUsers(adminToken);
        console.log(users);
        // setUsers(users.users)
        dispatch(setUsers({
            users : data.users
        }))
    }

    useEffect(() => {
        getAllUsers();
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Phone Number</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">View</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((user) => (
                        <User 
                        key={user._id}
                        user= {user}
                        setUsers= {setUsers}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
