import { Send } from '@mui/icons-material'
import { CardContent, Grid, TextField } from '@mui/material'
// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
// import { Form } from 'react-router-dom';
import { createComment, getPostComments, removeComment } from 'api/users';
import { setComments } from 'state';

import Comment from './Comment'
import { useSelector, useDispatch } from 'react-redux';

function CommnetBox({postId}) {
    const dispatch = useDispatch()
    const user = useSelector(state=> state.user);
    const token = useSelector(state=> state.token)
    const comments = useSelector(state => state.comments);
    
    // const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(()=>{
        const allComments = async()=>{
            const comments = await getPostComments(postId, token);
            // setComments(comments)
            dispatch(setComments({
              comments
            }))
        }
        allComments();
    }, [])

    const handleChange = (e)=>{
        setComment(e.target.value)
        console.log(comment);
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const postComment = await createComment(postId, user._id, comment, token)
        console.log(postComment);
        let copy = [postComment, ...comments]
        // setComments(copy)
        dispatch(setComments({
          comments : copy
        }))
        setComment("")
        // console.log(postComment);
    }



  return (
    <CardContent>
        {/* <form onSubmit ={handleSubmit}> */}
          <Grid container spacing={2} columns={16}>
            
            <Grid item xs={14}>
                <TextField 
                multiline fullWidth rows={2} 
                value={comment}
                onChange = {handleChange}
                />
                {/* {comment && <div>{comment}</div>} */}
            </Grid>
            <Grid sx={{cursor:"pointer"}} item xs={2} marginTop= {3}>
                {comment ? <Send  onClick={handleSubmit}/> : <Send/>}
            </Grid>
          </Grid>
          {/* </form> */}
          <Grid container>
            {comments.map((comment, i) => (
              <Grid item xs={12} >
                <Comment
                  key={comment._id}
                  comment={comment}
                  // comments = {comments}
                  // setComments = {setComments}
                />
              </Grid>
            ))}
          </Grid>

        </CardContent>
  )
}

export default CommnetBox