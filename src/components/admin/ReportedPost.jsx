import React, { useState } from 'react'
import { Block } from '@mui/icons-material';
import { Box, IconButton, Modal } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { blockUser, getUser } from 'api/admin';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'state';
import ViewPost from './viewPost';

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function ReportedPost({ reportedPost, setReportedPosts }) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };
    const handleEditClose = () => {
        setOpen(false)
    }
    const adminToken = useSelector((state) => state.adminToken);
    const dispatch = useDispatch();

    const getUserFn = async () => {
        const userFn = await getUser(reportedPost.poster, adminToken);
        console.log(userFn);
        setUser(userFn)
    }
    // const handleBlock = async ()=>{
    //     const data = await blockUser(user._id, adminToken)
    //     console.log(data)
    //     dispatch(setUser({
    //         user: data
    //     }))
    // }

    return (
        <>
            <StyledTableRow key={reportedPost._id}>
                <StyledTableCell align="center">{reportedPost._id}</StyledTableCell>
                <StyledTableCell >{Object.entries(reportedPost.report[0]).map(([reason, users]) => (
                    <p>{reason} : {users.length}</p>
                ))}</StyledTableCell>
                <StyledTableCell align="center">{Object.keys(reportedPost.report[0]).flat().length}</StyledTableCell>
                <StyledTableCell align="center">
                    <IconButton onClick={() => {
                        getUserFn()
                        handleOpen()
                    }}>
                        view
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">{reportedPost.status ? <p>pending</p> : <p>blocked</p>}</StyledTableCell>
            </StyledTableRow>
            <Modal
                sx={{ marginTop: "50px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ height: "500px", width: "500px", marginLeft: "30%" }}>
                    {user && <ViewPost
                     post={reportedPost} 
                     user={user} 
                     setReportedPosts = {setReportedPosts}
                     />}
                </Box>
            </Modal>
        </>
    )
}

export default ReportedPost