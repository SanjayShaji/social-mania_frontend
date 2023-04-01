import  React, { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useInView } from 'react-intersection-observer';

function PostImages({postImages}) {
  const posts = useSelector(state=> state.posts)
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [height, setHeight] = useState("")
  let [loading, setLoading] = useState(false)
  const onLoad = (event) => {
    setHeight(event.target.clientHeight);
  };
  const {ref, inView, entry} = useInView({
    rootMargin: "100px 0px",
    threshold: 0
  })

  
  useEffect(()=>{
    console.log(height)
    setTimeout(()=>{
      setLoading(true)
    },800)
  })

  return (
    <Box sx={{ height: "500px", overflow: "scroll" }}>
      <Typography sx={{textAlign: "center", m:2}}>Posts</Typography>

    <ImageList  sx={{ width: "85%", height : 'auto' }} cols={isSmallScreen ? 1 : 2} >
      {postImages && postImages.map((post) => (
        <ImageListItem  key={post._id}>
      {loading && <img
        onLoad={onLoad}
        ref = {ref}
        src={inView ? post.files[0] : ""}
        sx={{ objectFit:"contain",  height: "100%" }}
        srcset={post.files[0]}
        alt="image"
        loading="lazy"
      /> || <SkeletonTheme baseColor="white"
      highlightColor="grey"
      borderRadius="0.5rem"
      duration={4}>
      <Skeleton height={150} />
      </SkeletonTheme>}   
    </ImageListItem>
      )) }
    </ImageList>
    </Box>
  );
}


export default PostImages