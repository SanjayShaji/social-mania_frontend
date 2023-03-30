import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material';
import { friendRequest, acceptRejectRequest, removeFriend, searchUser } from 'api/users';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends, setRecievedRequests, setSentRequests } from 'state';
import { Box } from '@mui/system';

export default function Users({ userFriend }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const sentFriendRequests = useSelector(state => state.user.sentFriendRequests);
  const recievedFriendRequests = useSelector(state => state.user.recievedFriendRequests);
  const friends = useSelector(state => state.user.friends)

  // const isSentFriendRequest = sentFriendRequests.includes(userFriend._id)
  // const isRecievedFriendRequest = recievedFriendRequests.includes(userFriend._id)
  // const isFriend = friends.includes(userFriend._id)
  const isSentFriendRequest = sentFriendRequests.find((friend) => friend._id === userFriend._id)
  const isRecievedFriendRequest = recievedFriendRequests.find((friend) => friend._id === userFriend._id)
  const isFriend = friends.find((friend) => friend._id === userFriend._id);


  const friendRequestFn = async () => {
    const data = await friendRequest(userFriend._id, user._id, token)
    console.log(data);
    const result = data;
    dispatch(setSentRequests({
      sentFriendRequests: result
    }))
  }

  const acceptOrRejectRequest = async (queryStatus) => {
    console.log(queryStatus)
    // if(query == 'accept'){
    let query = { status: queryStatus }
    const data = await acceptRejectRequest(userFriend._id, user._id, query, token)
    console.log(data.updatedUser);
    const acceptFriend = data.userFriends;
    const recievedRequest = data.recievedFriendRequests
    dispatch(setFriends({
      friends: acceptFriend
    }))

    dispatch(setRecievedRequests({
      recievedFriendRequests: recievedRequest
    }))
  }

  const removeFriendFn = async () => {
    const data = await removeFriend(userFriend._id, user._id, token)
    console.log(data);
    dispatch(setFriends({
      friends: data
    }))
  }

  return (
    <Box>
      

      <Card sx={{ maxWidth: 200 }}>
        <Typography
          sx={{ m: 2 }}
        >{userFriend.firstName}</Typography>

        <CardMedia
          component="img"
          height="100"
          sx={{objectFit: "container"}}
          // image={`http://localhost:4000/images/profile-images/${userFriend.profileImage[0]}`}
          image={userFriend.profileImage ? userFriend.profileImage
            : "../assets/personImage.jpg"}
          alt={`image`}

        />

        <CardContent>
          {isSentFriendRequest &&
            <Button onClick={friendRequestFn}>Cancel</Button>
          }

          {isRecievedFriendRequest &&
            <>
              <Button onClick={() => acceptOrRejectRequest('accept')}>Accept</Button>

              <Button onClick={() => acceptOrRejectRequest('reject')}>Reject</Button>
            </>
          }

          {!isSentFriendRequest && !isRecievedFriendRequest && !isFriend &&
            <Button onClick={friendRequestFn}>Add Friend</Button>
          }

          {isFriend &&
            <Button onClick={removeFriendFn}>Remove Friend</Button>
            // <Button >Remove Friend</Button>
          }

        </CardContent>
      </Card>

    </Box>
  );
}
