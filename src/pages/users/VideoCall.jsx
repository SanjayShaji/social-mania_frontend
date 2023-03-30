import { Box, Button, Grid, Paper, styled, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getUsers, searchUser } from 'api/users'
import Users from 'components/users/user/Users'
import { useSelector } from 'react-redux';
import FriendRequestList from 'components/users/user/FriendRequestList';
import Friends from 'components/users/user/Friends';
import { useNavigate } from 'react-router-dom';

function VideoCall() {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const [users, setUsers] = useState([]);
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const friends = useSelector(state => state.user.friends)
    const friendRequests = useSelector(state => state.user.recievedFriendRequests)
    const [roomCode, setRoomCode] = useState('')
    const navigate = useNavigate()

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        navigate(`/room/${roomCode}`)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        // <Paper>
        <Box sx={{ flexGrow: 1, alignItems: "center", }}>
            <Grid container spacing={3}>
                {isNonMobileScreens && <Grid item xs={4} md={3}>
                    <Item sx={{ marginTop: "70px" }}>
                        <FriendRequestList
                            friendRequests={friendRequests}
                            userId={user._id} />
                        {/* <OfficialPageList /> */}

                    </Item>
                </Grid>}
                <Grid item xs={12} md={6} >
                    {/* <Box sx={{ marginTop: "70px" }}>
                            
                        </Box> */}
                    <Grid container >
                    <Box sx={{textAlign: "center", marginTop: "70px", margin:"200px"}}>
                        <h3 >Video Call</h3>
                        <form onSubmit={handleFormSubmit}>
                            <Box sx={{textAlign: "center"}}>
                                {/* <label>Enter Room Code </label> */}
                                <input 
                                style={{padding: "20px"}}
                                type="text"
                                value={roomCode}
                                onChange= {(e)=> setRoomCode(e.target.value)}
                                required 
                                placeholder='Enter Room Code' />
                            </Box>
                            <Button type="submit">Enter Room</Button>
                        </form>
                        </Box>

                    </Grid>
                </Grid>
                {isNonMobileScreens && <Grid item xs={4} md={3}>
                    <Item sx={{ marginTop: "70px" }}>
                        {/* <OfficialPageList/> */}
                        <Friends
                            friends={friends}
                        />
                    </Item>
                </Grid>}
            </Grid>

        </Box>
        // </Paper>
    )
}

export default VideoCall