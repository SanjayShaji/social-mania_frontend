import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Grid, Paper, styled, useMediaQuery } from '@mui/material'
import Posts from 'components/users/posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import Friends from 'components/users/user/Friends';
import {getFriends, getUser} from 'api/users'
import { setFriends} from 'state';
import UserProfile from 'components/users/user/UserProfile';
import PostImages from 'components/users/posts/PostImages';

function ProfilePage() {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const user = useSelector(state => state.user)
  const [userData, setUserData] = useState(null)
  const [friends, setFriends] = useState([])
  // const friends = useSelector(state => state.user.friends);
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)")
  const token = useSelector(state=> state.token)


useEffect(() => {
  async function fetchUser() {
    console.log(userId);
    const userDetails = await getUser(userId, token);
    
    if(userDetails._id === user._id) {
      setUserData(user);
    } else {
      setUserData(userDetails);
    }
  }

  async function fetchFriends() {
    const userFriends = await getFriends(userId, token);
    console.log(userFriends);
    setFriends(userFriends);
  }

  fetchUser();
  fetchFriends();
}, []);


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
    


  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {isNonMobileScreens && (
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{marginLeft:"100px", position: 'sticky', marginTop: '80px' }}>
            <Friends 
              friends={friends} isProfile={true}
              />
              <PostImages/>

            </Box>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6}>
          <Item>
            <Box sx={{ marginTop: '65px' }}>
            {userData && <UserProfile  userData = {userData} isUser={user._id == userId ? true : false}/>}
              <Posts userId={userId} isProfile/>
            </Box>
          </Item>
        </Grid>
        {/* {isNonMobileScreens && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ position: 'sticky', top: '80px' }}>
              <Friends friends={friends} />
            </Box>
          </Grid>
        )} */}
      </Grid>
    </Box>

  )
}

export default ProfilePage;




              