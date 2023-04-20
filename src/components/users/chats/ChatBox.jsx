import React, {useEffect, useRef, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addMessage, getMessages } from 'api/chat';
import FlexBetween from 'components/common/FlexBetweeen';
import { setMessages } from 'state';
import moment from 'moment'
import { grey } from '@mui/material/colors';


function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    // const [messages, setMessages] = useState([]);
    const messages = useSelector((state) => state.messages)
    const [newMessage, setNewMessage] = useState("")
    // const currentChat = useSelector(state => state.currentChat)
    const scroll = useRef()
    const chatMember = chat.members.find(member=> currentUser !== member._id)

    
    useEffect(() => {
        console.log("message", receivedMessage);
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            dispatch(setMessages({
                messages: [...messages, receivedMessage]
            }))
            // setNumMessages()
        }
    }, [receivedMessage])


    useEffect(() => {
        console.log(messages)
        console.log(chat)
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
            createdAt: new Date()
        }

        const receiver = chat.members.find((member) => member._id !== currentUser);
        const receiverId = receiver._id
        setSendMessage({ ...message, receiverId })

        const { data } = await addMessage(message, token);
        dispatch(setMessages({
            messages: [...messages, data]
        }))
        // setMessages([...messages, data]);
        setNewMessage("");
    }

    return (
        <Box>
            <Box>
                <ListItem
                    secondaryAction={
                        <div>
                            ...
                        </div>
                    }
                    disablePadding
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            {chatMember.profileImage ? <Avatar
                                src={chatMember.profileImage}
                            /> :
                            <Avatar
                                src={"../assets/personImage.jpg"}
                            />}
                        </ListItemAvatar>
                        <ListItemText primary={chatMember.firstName} />
                    </ListItemButton>
                </ListItem>
                <Box>
                    {messages.map((message) => {
                        const createdAt = moment(message.createdAt)
                        const formattedTime = moment(createdAt).format('h:mm A')
                        return (
                            <Box ref={scroll}>
                                {message.senderId === currentUser ? <Box sx={{ textAlign: "end", backgroundColor: grey[200] }}>
                                    <Typography sx={{ paddingRight: '15px', paddingTop: '15px', fontSize: '18px' }}>{message.text}</Typography>
                                    <Typography sx={{ paddingRight: '15px', fontSize: '10px' }}>{formattedTime}</Typography>
                                </Box>
                                    : <Box sx={{ textAlign: "start" }}>
                                        <Typography sx={{ paddingLeft: '15px', paddingTop: '15px', fontSize: '18px' }}>{message.text}</Typography>
                                        <Typography sx={{ paddingLeft: '15px', fontSize: '10px' }}>{formattedTime}</Typography>
                                    </Box>
                                }
                            </Box>
                        )
                    }
                    )}
                </Box>
                <Box sx={{margin:"10px"}}>
                <input
                    style={{ margin:"10px", padding:"20px", width: "85%" }}
                    value={newMessage}
                    name="message"
                    id="message"
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                
                <Button sx={{bottom:"5px"}} onClick={handleSend}>Send</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default ChatBox

