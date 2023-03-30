import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { friendRequest, acceptRejectRequest } from 'api/users';
import { setFriends, setRecievedRequests, setSentRequests } from 'state';
import { Cancel, Check, CheckBoxOutlined, CheckOutlined } from '@mui/icons-material';


function FriendRequest({ friend, labelId }) {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.user);
    const token = useSelector(state=> state.token);

    // const friendRequest = async()=>{
    //     const data = await friendRequest(friend._id, user._id, token)
    //     console.log(data);
    //     // const result = data;
    //     dispatch(setSentRequests({
    //       sentFriendRequests : data
    //     }))
    //   }

    const rejectFriend = async()=>{
      const data = await acceptRejectRequest()
    }
    
      const acceptFriend = async()=>{
        const query = {status: "accept"}
            const data = await acceptRejectRequest(friend._id, user._id,query, token)
            console.log(data.updatedUser);
            const acceptFriend = data.userFriends;
            const recievedRequest = data.recievedFriendRequests
            dispatch(setFriends({
              friends : acceptFriend
            }))
    
            dispatch(setRecievedRequests({
              recievedFriendRequests: recievedRequest
            }))
      }

    return (
        <ListItem
            key={friend._id}
            secondaryAction={
                <div>
        <CheckBoxOutlined sx={{ cursor: "pointer"}} onClick={acceptFriend}/>
        <Cancel sx={{marginLeft: "10px", cursor: "pointer"}} onClick={friendRequest}/> 
                </div>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                        alt={`Avatar n°${friend.firstName}`}
                        // src={`/static/images/avatar/${friend.firstName}.jpg`}
                    />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={friend.firstName} />
            </ListItemButton>
        </ListItem>

    )
}

export default FriendRequest