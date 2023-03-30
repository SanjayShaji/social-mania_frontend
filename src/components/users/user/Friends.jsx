import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { getFriends, getUserFriendRequests } from 'api/users';
import FriendRequest from './FriendRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Friend from './Friend';

export default function Friends({friends, isChat=false, isProfile =false}) {
    
    const token = useSelector(state=> state.token)
    const user = useSelector(state => state.user)

    // const [friends, setFriends] = useState([])

    // const requestFunction = async () => {
    //     console.log(user._id);
    //     const userFriends = await getFriends(user._id, token)
    //     console.log(userFriends);
    //     setFriends(userFriends);
    // }
    // useEffect(() => {
    //     requestFunction();
    // }, [])

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography sx={{textAlign: "center", m:2}}>Friends</Typography>
            {friends.map((friend) => {
                const labelId = `checkbox-list-secondary-label-${friend.firstName}`;
                return (
                    <Friend
                        key={friend._id}
                        friend={friend}
                        labelId={labelId}
                        isChat ={isChat}
                        isProfile={isProfile}
                    />
                )

            })}
        </List>

    );
}