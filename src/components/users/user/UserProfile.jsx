

import { Avatar, Box, Button, Card, CardMedia, IconButton, InputBase, Modal, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
// import Wrapper from './Wrapper';
import Dropzone from "react-dropzone";
import { AutoStories, DeleteOutlined, EditOutlined, Image, PhotoLibrary, VideoLibrary } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCover, setPosts, setProfile } from 'state';
import { createCover, createProfile } from 'api/users';
import FlexBetween from 'components/common/FlexBetweeen';

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

function UserProfile({ userData, isUser = false }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  // const posts = useSelector(state=> state.posts);

  // const [posts, setPosts] = useState()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsProfile(false);
    setIsCover(false)
    setOpen(false)
  };
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState();
  const [isProfile, setIsProfile] = useState(false)

  const [coverImage, setCoverImage] = useState(null);
  const [coverFile, setCoverFile] = useState();
  const [isCover, setIsCover] = useState(false)

  const { palette } = useTheme();
  useEffect(() => {
    console.log("tokenData" + token);
    console.log(isUser);
  })

  const handleProfilePost = async () => {
    // e.preventDefault()
    const formData = new FormData();
    formData.append("userId", user._id)
    if (profileImage) {
      formData.append("profileImage", profileImage);
      // formData.append("imagePath", image.name)
    }

    const profile = await createProfile(formData, token);
    console.log("posts");
    console.log(profile.profileImage);
    console.log("posts");
    dispatch(setProfile({
      profileImage: profile.profileImage
    }))
    setProfileImage(null);
  }

  const handleCoverPost = async () => {
    // e.preventDefault()
    const formData = new FormData();
    formData.append("userId", user._id)
    if (coverImage) {
      formData.append("coverImage", coverImage);
      // formData.append("imagePath", image.name)
    }

    const cover = await createCover(formData, token);
    console.log("posts");
    console.log(cover.coverImage);
    console.log("posts");
    dispatch(setCover({
      coverImage: cover.coverImage
    }))
    setCoverImage(null);
  }


  return (

    <Box sx={{ textAlign: 'center' }}>
      {isUser  &&
        <Box sx={{ position: "relative" }}>
          <Avatar
            onClick={() => {
              setIsProfile(true)
              handleOpen()
            }}
            alt="User Name" src={user?.profileImage}
            sx={{"&:hover": { cursor: "pointer" },backgroundColor: "white", width: 128, height: 128, position: "absolute", bottom: -20, left: 300 }} />
          <Card sx={{ height: "300px" }}>
            <CardMedia
              onClick={() => {
                setIsCover(true)
                handleOpen()
              }}
              sx={{ "&:hover": { cursor: "pointer" }, backgroundColor: "grey", objectFit: "contain", height: "100%" }}
              component="img" image={user?.coverImage} 
              />
          </Card>
        </Box>
      }

      {!isUser &&
        <Box sx={{ position: "relative" }}>
          <Avatar

            alt="User Name" src={userData?.profileImage}
            sx={{backgroundColor: "white", width: 128, height: 128, position: "absolute", bottom: -20, left: 300 }} />
          <Card sx={{ height: "300px" }}>
            <CardMedia
              sx={{ backgroundColor: "grey", objectFit: "contain", height: "100%" }}
              component="img" image={userData?.coverImage} 
              />
          </Card>
        </Box>
      }

      <Modal
        sx={{ marginTop: "150px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              if (isProfile) {
                setProfileImage(acceptedFiles[0])
                setProfileFile(URL.createObjectURL(acceptedFiles[0]));
              } else {
                setCoverImage(acceptedFiles[0])
                setCoverFile(URL.createObjectURL(acceptedFiles[0]));
              }

            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <Box
                  {...getRootProps()}
                  border={`2px solid ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!profileFile && isProfile ? (
                    <p>update Profile Here</p>
                  ) : (
                    <div>
                      {profileFile && <img style={{ height: "285px", width: "285px" }} src={profileFile} />}
                      {/* {coverFile && <img style={{ height: "285px", width: "285px" }} src={coverFile} />} */}

                      {/* <Typography>{image.name}</Typography> */}
                    </div>
                  )}

                  {!coverFile && isCover ? (
                    <p>update Cover Image Here</p>
                  ) : (
                    <div>
                      {/* {coverImage && <img style={{ height: "285px", width: "285px" }} src={profileFile} />} */}
                      {coverFile && <img style={{ height: "285px", width: "285px" }} src={coverFile} />}

                      {/* <Typography>{image.name}</Typography> */}
                    </div>
                  )}
                </Box>

                {profileImage && (
                  <IconButton
                    onClick={() => {
                      console.log(profileImage)
                      setProfileImage(null)
                    }
                    }
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}

                {coverImage && (
                  <IconButton
                    onClick={() => {
                      console.log(coverImage)
                      setCoverImage(null)
                    }
                    }
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </div>
            )}
          </Dropzone>

          {profileImage && <Button
            onClick={() => {
              handleProfilePost();
              handleClose();
              // navigate('/');

            }}
          >
            post
          </Button>}


          {coverImage && <Button
            onClick={() => {
              handleCoverPost();
              handleClose();
              // navigate('/');

            }}
          >
            post
          </Button>}
        </Box>
      </Modal>
    </Box>
    // </Wrapper>

  )
}

export default UserProfile