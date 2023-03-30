import React, { useEffect } from 'react';
import { Box, Grid, Paper, styled, useMediaQuery } from '@mui/material';
import Posts from 'components/users/posts/Posts';
import FriendRequestList from 'components/users/user/FriendRequestList';
import { useDispatch, useSelector } from 'react-redux';
import Friends from 'components/users/user/Friends';
import { getFriends, getUserFriendRequests } from 'api/users';
import { setFriends, setRecievedRequests, setSentRequests } from 'state';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const friendRequests = useSelector((state) => state.user.recievedFriendRequests);
  const isNonMobileScreens = useMediaQuery('(min-width: 900px)');
  const token = useSelector((state) => state.token);

  const requestFunction = async () => {
    console.log(user._id);
    const userFriends = await getFriends(user._id, token);
    const userFriendRequests = await getUserFriendRequests(user._id, token);

    console.log(userFriends);
    dispatch(
      setFriends({
        friends: userFriends,
      }),
    );

    dispatch(
      setRecievedRequests({
        recievedFriendRequests: userFriendRequests.recievedFriendRequests,
      }),
    );

    dispatch(
      setSentRequests({
        sentFriendRequests: userFriendRequests.sentFriendRequests,
      }),
    );
  };

  useEffect(() => {
    requestFunction();
    console.log(process.env.REACT_APP_SAMPLE);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {isNonMobileScreens && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ position: 'sticky', top: '80px' }}>
              <FriendRequestList friendRequests={friendRequests} userId={user._id} />
            </Box>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6}>
          <Item>
            <Box sx={{ marginTop: '65px' }}>
              <Posts userId={user._id} />
            </Box>
          </Item>
        </Grid>
        {isNonMobileScreens && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ position: 'sticky', top: '80px' }}>
              <Friends friends={friends} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default HomePage;
