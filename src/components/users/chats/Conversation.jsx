import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, Button } from '@mui/material';
import { acceptOrRejectFriend, addOrRemoveFriend, getUser } from 'api/users';
import { useNavigate } from 'react-router-dom';


function Conversation({ data, currentUser, online, labelId }) {
    const navigate = useNavigate()
    // const [userData, setUserData] = useState(null);
    // const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState("");

    const token = useSelector(state => state.token)
    const chatMember = data.members.find(member=> currentUser !== member._id)

    useEffect(()=>{
        console.log("chatMember")
        console.log(chatMember)
        console.log("chatMember")
    },[])
    return (
        <Box>
            <ListItem
                secondaryAction={
                    <div>
                        {online ? <div>online</div> : <div>offline</div>}
                        {/* {unreadMessages && (
                            {unreadMessages}
                        )} */}
                        
                    </div>
                } 
                disablePadding
            >
                <ListItemButton>
                    <ListItemAvatar>
                        {chatMember.profileImage ? <Avatar onClick={() => {
                            navigate(`/profile/${chatMember._id}`)
                        }}
                            src={chatMember.profileImage}
                        /> :
                            <Avatar onClick={() => {
                                navigate(`/profile/${chatMember._id}`)
                            }}
                                src={"../assets/personImage.jpg"}
                            />}
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={chatMember.firstName} />
                    {/* <ListItemText primary={numMessages}/> */}
                </ListItemButton>

            </ListItem>
        </Box>
    )
}

export default Conversation;