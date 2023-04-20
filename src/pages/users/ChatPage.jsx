import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Grid, List, Paper, styled, Typography, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, userChats } from 'api/chat'
import { getUser } from 'api/users'
import ChatBox from 'components/users/chats/ChatBox';
import Friends from 'components/users/user/Friends';
import Conversation from 'components/users/chats/Conversation';
// import { setCurrentChat } from 'state';
import { io } from 'socket.io-client'
import { setLoading, setMessages } from 'state';

function ChatPage() {
  const dispatch = useDispatch();
  const socket = useRef()
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  // const chats = useSelector(state => state.chats);
  const [chats, setChats] = useState([])
  // const currentChat = useSelector((state) => state.currentChat)
  const [currentChat, setCurrentChat] = useState(null)
  const [userData, setUserData] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  
  const [numMessages, setNumMessages] = useState(0)

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
 
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id, token);
        console.log(data);
        // dispatch(setChats({
        //   chats: data
        // }))
        setChats(data);
      } catch (error) {
        console.log(error)
      }
    }
    getChats();
  }, [user._id])

  useEffect(()=>{
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users)=>{
      setOnlineUsers(users)
    });

  }, [user])

  // i use mern stack and i have one server for front end which is http://localhost:3000 and two servers for backend which are http://localhost:4000 for server and ws://localhost:8800 for socket.io. how can i configure this in nginx to host the website?
  useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit("send-message", sendMessage)
    }
  }, [sendMessage])

  useEffect(()=>{
    socket.current.on("receive-message", (data)=>{
      console.log(data);
      setReceivedMessage(data);
      setNumMessages((prevNumMessages)=> prevNumMessages + 1)
    })
  },[])


  const fetchMessages = async (chat) => {
    const { data } = await getMessages(chat._id, token);
    console.log(data)
    // setMessages(data)
    dispatch(setMessages({
      messages: data
    }))
  }


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member._id !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember._id);
    return online ? true : false;
  }

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
        {isNonMobileScreens && <Grid sx={{ marginLeft: "100px" }} item xs={4} md={3}>
          <Item >
            <Box width="300px" sx={{ top: "80px", position: "fixed" }}>
              {/* /////////////////////////////////////////////// */}

              <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Typography sx={{ textAlign: "center", m: 2 }}>Chats</Typography>
                {chats.map((chat) => {
                  const labelId = `checkbox-list-secondary-label-${chat._id}`;
                  return (
                    <Box onClick={() => {
                      // if (chat !== null) {
                        // fetchMember(chat)
                      // }
                      setCurrentChat(chat)
                      fetchMessages(chat)
                    }}
                    >
                      <Conversation
                        // key={chat._id}
                        data={chat}
                        currentUser={user._id}
                        online={checkOnlineStatus(chat)}
                        labelId={labelId}
                        // numMessages = {numMessages}
                      />
                    </Box> 
                  )
                })}
              </List>
            </Box>
          </Item>
        </Grid>}
        {currentChat ? <Grid item xs={12} md={8}>
          <Item >
            <Box sx={{ marginLeft: "20px", marginTop: "65px" }}>
              
              <ChatBox
                chat={currentChat}
                currentUser={user._id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
                setNumMessages = {setNumMessages}
              />
            </Box>
          </Item>
        </Grid> : 
        <Grid item xs={12} md={8}>
        <Item >
          <Box sx={{ height:"600px", textAlign: "center", paddingTop: "300px", marginTop: "65px" }}>
            <Typography>Chat</Typography>
            
          </Box>
        </Item>
      </Grid>
        }
        {/* {isNonMobileScreens && <Grid item xs={4} md={3}>
          <Item>
            <Box width="100%" sx={{ top: "80px", position: "fixed" }}>
            </Box>
          </Item>
        </Grid>} */}
      </Grid>
    </Box>
  )
}

export default ChatPage