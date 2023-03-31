

import { Box, Button, IconButton, InputBase, Modal, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
// import Wrapper from './Wrapper';
import Dropzone from "react-dropzone";
import { Buffer } from 'buffer';
import { AutoStories, DeleteOutlined, EditOutlined, Image, PhotoLibrary, VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from 'state';
import { createPost, updatePost } from 'api/users';
import FlexBetween from 'components/common/FlexBetweeen';
import CropImage from './CropImage';


const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EditPost({ isEdit = false, setIsUpdate, post = false, isUser = true }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  // const posts = useSelector(state=> state.posts);

  // const [posts, setPosts] = useState()
  const [postContent, setPostContent] = useState("");
  const [postVideoContent, setPostVideoContent] = useState("");
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [file, setFile] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  };

  const handleVideoOpen = ()=> setVideoOpen(true)
  const handleVideoClose = ()=> setVideoOpen(false)
  
  const handleEditClose = () => {
    setIsUpdate(false)
    setOpen(false)
  }

  const navigate = useNavigate();
  const { palette } = useTheme();

  useEffect(() => {
    if (isEdit && post) {
        setImage(post.files[0]);
        setFile(post.files[0]);
        setPostContent(post.content)
        handleOpen();
    }
  }, [isEdit]);



  const convertToFile = async (image) => {
    var arr = image.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const filename = 'image'
    const fileResult = new File([u8arr], filename, { type: mime });
    return fileResult
  }

  const handlePost = async () => {

    const fileResult = await convertToFile(image);

    console.log(fileResult);

    const formData = new FormData();

    formData.append("userId", user._id)
    formData.append("description", postContent);
    if (image) {
      formData.append("file", fileResult);
      // formData.append("imagePath", image.name)
    }
    const posts = await createPost(formData, token);
    console.log(posts);
    dispatch(setPosts({
      posts
    }))
    setImage(null);
    setPostContent("");
  }

  const handleVideoPost = async () => {

    // const fileResult = await convertToFile(image);
    // console.log(fileResult);

    const formData = new FormData();

    formData.append("userId", user._id)
    formData.append("description", postVideoContent);
    if (video) {
      formData.append("file", video);
      // formData.append("imagePath", image.name)
    }
    const posts = await createPost(formData, token);
    console.log(posts);
    dispatch(setPosts({
      posts
    }))
    setImage(null);
    setPostContent("");
  }

  const handleEditPost = async () => {
    const fileResult = await convertToFile(image);

    const formData = new FormData();
    formData.append("userId", user._id)
    formData.append("postId", post._id)
    formData.append("description", postContent);
    console.log(formData)
    if (image != post.images[0]) {
      formData.append("image", fileResult);
      formData.append("imagePath", image.name)
    }
    const postData = await updatePost(formData, token);
    console.log(postData);
    dispatch(setPost({
      post: postData
    }))
    console.log(image)
    setImage(null);
    setPostContent("");
  }

  return (

    // <Wrapper>
    <Box sx={{ textAlign: 'center' }}>

      {!isEdit && isUser && <FlexBetween sx={{ m: 4, paddingLeft: "100px", paddingRight: "100px", border: "3px double pink" }}>

        <IconButton onClick={handleOpen}>
          <PhotoLibrary sx={{ fontSize: "35px" }} />
        </IconButton>
        <IconButton onClick={handleVideoOpen}>
          <VideoLibrary sx={{ fontSize: "35px" }} />
        </IconButton>
        <IconButton onClick={handleOpen}>
          <AutoStories sx={{ fontSize: "35px" }} />
        </IconButton>

      </FlexBetween>}

      <Modal
        sx={{ marginTop: "150px" }}
        open={open}
        onClose={isEdit ? handleEditClose : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <textarea rows={3} cols={42} style={{ border: "none" }}
            onChange={(e) => {
              console.log(e.target.value)
              setPostContent(e.target.value)

            }}

            value={postContent}
            placeholder='Write something!!'
          />
          
          <CropImage
            image={image}
            setImage={setImage}
          />
          {isEdit ? <Button
            // disabled={!postContent}
            onClick={() => {
              handleEditPost();
              handleEditClose();
              // navigate('/');

            }}
          >
            update
          </Button> :
            <Button
              disabled={!postContent}
              onClick={() => {
                handlePost();
                handleClose();
                // navigate('/');

              }}
            >
              post
            </Button>
          }
        </Box>

      </Modal>


      <Modal
        sx={{ marginTop: "150px" }}
        open={videoOpen}
        onClose={handleVideoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
          <textarea rows={3} cols={42} style={{ border: "none" }}
            onChange={(e) => {
              console.log(e.target.value)
              setPostVideoContent(e.target.value)

            }}

            value={postVideoContent}
            placeholder='Write something!!'
          />
          <input 
          onChange={(e) => {
            console.log(e.target.files[0])
            setVideo(e.target.files[0])

          }}
          file={video}
          type="file" name="video" accept=".mp4" />

            <Button
              disabled={!postVideoContent}
              onClick={() => {
                handleVideoPost();
                handleVideoClose();
                // navigate('/');

              }}
            >
              post
            </Button>
            </form>
        </Box>

      </Modal>
    </Box>
    // </Wrapper>

  )
}

export default EditPost