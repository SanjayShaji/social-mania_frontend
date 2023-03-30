import React, { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, InputBase, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { pink, red } from '@mui/material/colors'
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CommentOutlined, FavoriteBorder, PostAdd, Send } from '@mui/icons-material'
import { getPostComments, removePost } from 'api/users';
import CommnetBox from '../users/comments/CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from 'state';
import moment from 'moment'
import {useInView} from 'react-intersection-observer'
import { blockPost } from 'api/admin';
import Skeleton from 'react-loading-skeleton';


function ViewPost({post, user, setReportedPosts}) {
  const dispatch = useDispatch()
  const token = useSelector(state=> state.adminToken);
//   const user = useSelector(state=> state.admin);
  const {ref, inView, entry} = useInView({
    rootMargin: "100px 0px",
    threshold: 0
  })
  const likeCount = Object.keys(post.likes).length
  const [comments, setComments] = useState([]);

  const ITEM_HEIGHT = 48;
  const createdAt = moment(post.createdAt);
  const timeAgo = moment(createdAt).fromNow();
  const formattedDate = moment(createdAt).format('MMMM DD, YYYY');
  const [height, setHeight] = useState(0)
  // const options = [
  //   'None',
  //   'Atria',
  // ];
  
  useEffect(()=>{
    console.log(post)
  },[])

  let getComments = async () => {
    let comment = await getPostComments(post._id, token);
    setComments(comment)
  }

  const renderMedia = () => {
    if (post.files[0].endsWith('.jpg') || post.files[0].endsWith('.jpeg') || post.files[0].endsWith('.png')) {
      return <CardMedia
        onLoad={onLoad}
        ref={ref}
        component="img"
        image={inView ? post.files[0] : <Skeleton height={400} />}
        sx={{ height: inView ? '100%' : `400px`, objectFit: 'contain' }}
      // alt="image"
      />;
    } else if (post.files[0].endsWith('.mp4') || post.files[0].endsWith('.avi') || post.files[0].endsWith('.mov')) {
      return (
        // <video controls>
        //   <source src={post.files[0]} type="video/mp4" />
        <CardMedia
          onLoad={onLoad}
          ref={ref}
          component="video"
          src={inView ? post.files[0] : <Skeleton height={400} />}
          // controls
          controls={inView}
          autoPlay={inView}
          loop={inView}
          muted={inView}
          sx={{ height: inView ? '100%' : `400px`, objectFit: 'contain' }}
        // alt="image"
        />

      );
    } else {
      return <p>Unsupported file type</p>;
    }
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    getComments();
    setExpanded(!expanded);
  };


  const blockPostFn = async()=>{
    const posts = await blockPost(post._id, token);
    setReportedPosts(posts)
  }

  const onLoad = (event) => {
    setHeight(event.target.clientHeight);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ borderRadius: "10px", m: 3 }} elevation={20}>
      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} 
          src = {`http://localhost:4000/images/profile-images/${user.profileImage}`}
          aria-label="recipe">
            
          </Avatar>
        }
        action={
          <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      
        }
        title={user.firstName}
        subheader={formattedDate}
      />
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >

          {post.status ? <MenuItem onClick={()=>{
            blockPostFn()
            handleClose()
            }}>Block Post</MenuItem> : 
            <MenuItem onClick={()=>{
                blockPostFn()
                handleClose()
                }}>Unblock Post</MenuItem>
            }

          <MenuItem onClick={handleClose}>More</MenuItem>
      </Menu>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>

      {/* <CardMedia
        onLoad = {onLoad}
        ref = {ref}
        component="img"
        image={inView ? post.images[0]: ''}
        sx={{ height: inView ? 'auto' : `${height}px` }}
        alt="image"
      /> */}
      {renderMedia()}

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites">
          
            <FavoriteBorder />

        </IconButton>
        <Typography>{likeCount}</Typography>

        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentOutlined />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

          <CommnetBox
            key={post._id}
            postId ={post._id}
          />
      </Collapse>

      <Box sx={{marginLeft: "50px"}}>
        <h2 >Reported reasons</h2>
        {Object.entries(post.report[0]).map(([reason, users]) => (
            <p>{reason} : {users.length}</p>
        ))}
      </Box>
    </Card>
  )
}

export default ViewPost;
