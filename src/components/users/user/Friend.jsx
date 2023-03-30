import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
// import { addOrRemoveFriend } from 'api/users';
import { setFriends, setRecievedRequests, setSentRequests } from 'state';
import { useNavigate } from 'react-router-dom';
import { createChat } from 'api/chat';


function Friend({ friend, labelId, isProfile=false }) {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.user);
    // const token = useSelector(state=> state.token);
    // const [currentChat, setCurrentChat] = useState(null)

    const handleCreateChat = async()=>{
        let obj = {
            senderId : user._id,
            receiverId : friend._id
        }
        const create = await createChat(obj);
        console.log(create);
        
        navigate('/chat')
    }

    const currentChat = useSelector(state=> state.currentChat)
    const navigate = useNavigate()
    return (
        <ListItem
            key={friend._id}
            secondaryAction={isProfile == false &&
                <Button onClick= {handleCreateChat}>
                    chat
                </Button>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                
                    <Avatar
                    onClick={()=>{
                        navigate(`/profile/${friend._id}`)
                    }}
                        alt={`Avatar n°${friend.firstName}`}
                        src={friend.profileImage}
                    />
                    
                </ListItemAvatar>
                <ListItemText id={labelId} primary={friend.firstName} />
            </ListItemButton>
        </ListItem>

    )
}

export default Friend