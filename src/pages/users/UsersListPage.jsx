import { Box, Button, Grid, Paper, styled, TextField, useMediaQuery } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getUsers, searchUser } from 'api/users'
import Users from 'components/users/user/Users'
import { useSelector } from 'react-redux';
import FriendRequestList from 'components/users/user/FriendRequestList';
import Friends from 'components/users/user/Friends';

function UsersListPage() {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const [users, setUsers] = useState([]);
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const friends = useSelector(state => state.user.friends)
    const friendRequests = useSelector(state => state.user.recievedFriendRequests)
    const [searchText, setSearchText] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const usersFn = async () => {
            console.log(user._id);
            const usersData = await getUsers(user._id, token);
            console.log(usersData.users);
            setUsers(usersData.users);
        }
        console.log(users);
        const userSearch = async()=>{
            const usersData = await searchUser(user._id, searchText, token);
            setUsers(usersData.users)
        }
        if(searchText){
            userSearch()
        }else{
            usersFn();
        }
    }, [searchText])

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     const response = await searchUser(searchText, token);
    //     console.log("search user")
    //     console.log(response)
    //     console.log("search user")
    //     setSearchResults(response.users)
    // }

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
                    <Box sx={{ marginTop: "70px" }}>
                            {/* <form onSubmit={handleSearch}> */}
                                <TextField
                                    type="text"
                                    placeholder='search users'
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                {/* <button type='submit'>Search</button> */}
                            {/* </form> */}
                        </Box>
                    <Grid container >

                        {users.map((user, i) => (
                            <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "30px" }}>
                                <Users
                                    key={user._id}
                                    userFriend={user}
                                />
                            </Grid>
                        ))}

                        {/* {searchResults && searchResults.map((user, i) => (
                            <Grid item xs={12} sm={4} md={4} sx={{ marginTop: "70px" }}>
                                <Users
                                    key={user._id}
                                    userFriend={user}
                                />
                            </Grid>
                    ))} */}
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

export default UsersListPage