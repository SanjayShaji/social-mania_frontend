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
import { getUsers,reportedPost } from 'api/admin';
import { IconButton } from '@mui/material';
import User from './User';
import { setUsers } from 'state';
import ReportedPost from './ReportedPost';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function ReportTable() {
    const dispatch = useDispatch();
    const adminToken = useSelector((state) => state.adminToken)
    const [reportedPosts, setReportedPosts] = useState([]);
    // const users = useSelector((state)=> state.users)

    const getReportedPosts = async () => {
        const data = await reportedPost(adminToken);
        console.log(data);
        setReportedPosts(data)

        // dispatch(setUsers({
        //     users : data.users
        // }))
    }

    useEffect(() => {
        getReportedPosts();
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Post Id</StyledTableCell>
                        <StyledTableCell align="center">Reports</StyledTableCell>
                        <StyledTableCell align="center">Report Count</StyledTableCell>
                        <StyledTableCell align="center">View</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportedPosts && reportedPosts.map((reportedPost) => (
                        <ReportedPost
                        key={reportedPost._id}
                        reportedPost= {reportedPost}
                        setReportedPosts= {setReportedPosts}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
