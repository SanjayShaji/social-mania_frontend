import { Send } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Divider, Grid, Paper, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { createReplyComment, getReplyComments, removeComment } from 'api/users';
import { useSelector, useDispatch } from 'react-redux';
import { setComments } from 'state';

function Comment({ comment }) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const user = useSelector(state=> state.user)
    const comments = useSelector(state => state.comments);
    // const [comments, setComments] = useState();
    const createdAt = moment(comment.createdAt);
    const timeAgo = moment(createdAt).fromNow();
    const [replyButton, setReplyButton] = useState(false);
    const [replyComments, setReplyComments] = useState([]);
    const [replyComment, setReplyComment] = useState();

    useEffect(()=>{ 
        
        const rComment = async()=>{
            const rComments = await getReplyComments(comment._id, token)
            console.log(rComments);
            setReplyComments(rComments)
        }
        rComment()
    },[])

    const handleChange = (e) => {
        setReplyComment(e.target.value)
    }

    const handleReplySubmit = async () => {
        try {
            const replyCommentData = await createReplyComment(comment.post, user._id, comment._id, replyComment, token);
            const rcomments = [replyCommentData, ...replyComments]
            console.log(replyComment);
            setReplyComments(rcomments)
            setReplyButton(!replyButton)
            setReplyComment("");
            
        } catch (error) {
            console.log(error)
        }
    } 

    const handleDelete = async(e)=>{
        e.preventDefault();
        const commentsDelete = await removeComment(comment.post, comment._id, user._id, token);
        const updatedComments = comments.filter((data)=> data._id != comment._id)
        // const updatedReplyComments = replyComments.filter((data)=> data._id != comment._id)
        console.log(comments)
        // setReplyComments(updatedReplyComments)
        // setComments(updatedComments)
        dispatch(setComments({
            comments :updatedComments
          }))
      }

    return (
        <Paper style={{ padding: "20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar 
                    image={`http://localhost:4000/profile-images/${user.profileImage[0]}`}
                    
                    alt="Remy Sharp" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}><span>{comment.user.firstName}</span> 
                    {comment.user._id === user._id && <Button onClick={handleDelete} sx={{marginLeft: '400px'}}>delete</Button>}
                    
                    </h4>
                    
                    <p style={{ textAlign: "left" }}>
                        {comment.comment}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {timeAgo}
                    </p>
                </Grid>
            
            </Grid>
            <Grid>
                <Button right={0} onClick={() => {
                    setReplyButton(!replyButton)
                }}>Reply</Button>

                {replyButton &&
                    <Grid container spacing={2} marginLeft={2} columns={16}>
                        <Grid spacing={2} item xs={14}>
                            <TextField
                                multiline fullWidth rows={2}
                                value={replyComment}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid sx={{cursor:"pointer"}} marginTop={3} item xs={2}>
                            {replyComment ? <Send onClick={handleReplySubmit}/> : <Send/>}
                        </Grid>
                    </Grid>
                }

                
                {replyComments && replyComments.map((reply, i)=> (
                    
                    <Comment
                    key={reply._id}
                    comment={reply}
                  />
                ))}

            </Grid>
        </Paper>
    )
}

export default Comment
