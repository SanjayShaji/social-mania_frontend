import React from 'react'
import { Block } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { blockUser } from 'api/admin';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'state';

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


function User({user}) {
    const adminToken = useSelector((state)=> state.adminToken);
    const dispatch = useDispatch();
    
    const handleBlock = async ()=>{
        const data = await blockUser(user._id, adminToken)
        console.log(data)
        dispatch(setUser({
            user: data
        }))
    }
    return (
            <StyledTableRow key={user._id}>
                <StyledTableCell align="center">{user.firstName}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">
                    {/* {user.status ? <Block sx={{color: "red"}}/> : <Block sx={{color: "green"}}/>} */}
                    <IconButton
                    onClick={handleBlock}
                    >
                        {user.status ? (
                            <Block sx={{ color: 'red' }} />
                        ) : (
                            <Block sx={{ color: 'green' }} />
                        )}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
    )
}

export default User