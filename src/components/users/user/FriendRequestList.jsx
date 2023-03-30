import React from 'react';
import List from '@mui/material/List';
import { getUserFriendRequests } from 'api/users';
import FriendRequest from './FriendRequest';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function FriendRequestList({friendRequests, userId}) {
    
    const token = useSelector(state=> state.token)
    const user = useSelector(state => state.user)

    // const [friendRequests, setFriendRequests] = useState([])

    // const requestFunction = async () => {
    //     console.log(user._id);
    //     const userFriendRequests = await getUserFriendRequests(user._id, token)
    //     console.log(userFriendRequests);
    //     setFriendRequests(userFriendRequests)
    // }
    // useEffect(() => {
    //     requestFunction();
    // }, [])

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography sx={{textAlign: "center", m:2}}>Friend Requests</Typography>
            {friendRequests.map((friend) => {
                const labelId = `checkbox-list-secondary-label-${friend.firstName}`;
                return (
                    <FriendRequest
                        key={friend._id}
                        friend={friend}
                        labelId={labelId}
                    />
                )

            })}
        </List>

    );
}