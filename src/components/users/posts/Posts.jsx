import styled from '@emotion/styled'
import { Avatar, BottomNavigation, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Pagination, Paper, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { getPosts, getUserPosts } from 'api/users'
import CreatePost from './CreatePost'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
// import reactPaginate from 'react-paginate'
import ReactPaginate from 'react-paginate'
import FlexBetween from 'components/common/FlexBetweeen'

function Posts({userId, isProfile = false}) {
  
//   const [posts, setPosts] = useState([]);
const dispatch = useDispatch();
const user = useSelector((state)=> state.user)
  let posts = useSelector((state)=> state.posts)
  const token = useSelector((state)=> state.token);
  const [size, setSize] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1)

  let userPosts = async()=>{
    const data = await getUserPosts(userId, size, token)
    console.log(data);
    dispatch(setPosts({
      posts: data.post
    }))
    setSize(data.size)
  }
  
  let postsFeed = async()=>{
      // const query = { sortBy: "-createdAt" };
      const data =await getPosts(size, token);
      console.log(data)
      dispatch(setPosts({
              posts: data.post
          })
      )
    setSize(data.size)
      // setTotalPages(data.totalPages);
  }

  // const handlePageChange = (event, value)=>{
  //   setCurrentPage(value)
  // }

  const handleSend = async()=>{
    if(isProfile){
      const data = await getUserPosts(userId, size, token)
      dispatch(setPosts({
        posts: data.post
      }))
      setSize(data.size)
    }else{
      let data =await getPosts(size, token);
      dispatch(setPosts({
        posts: data.post
      }))
      setSize(data.size)
    }

  }

    useEffect(()=>{
        if(isProfile){
          userPosts();
        }else{
          postsFeed()

        }
    },[]) 


  return (
    <Paper >
    {user._id == userId && <CreatePost />}

    <Box sx={{m:1}} >
        {posts && posts.map((post)=>(
          <Post 
          key={post._id}
          post={post}
          />

    ))}
    {/* <ReactPaginate style={{display: "flex"}}
    pageCount={totalPages}
    pageRangeDisplayed = {5}
    marginPagesDisplayed={2}
    onPageChange={handlePageChange}
    activeClassName = "active"
    /> */}
    
    {/* {!isProfile && <Paper sx={{ position: 'fixed', bottom: 0, left: 385, right: 385 }} elevation={3}>
    <BottomNavigation>
    <Stack spacing={2} mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={2}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </BottomNavigation>
    
        <Box sx={{textAlign: "center"}}>Page {currentPage} of {totalPages}</Box>
    </Paper>} */}
    <Box sx={{textAlign: "center", margin: "10px"}}>
    <Button onClick = {handleSend}>Load More</Button>
    </Box>
    </Box>
    </Paper>
  )
}

export default Posts

