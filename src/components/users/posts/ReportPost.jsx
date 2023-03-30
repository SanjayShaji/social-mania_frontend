

import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputBase, Modal, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
// import Wrapper from './Wrapper';
import Dropzone from "react-dropzone";
import { AutoStories, DeleteOutlined, EditOutlined, Image, PhotoLibrary, VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from 'state';
import { createPost, reportPost, updatePost } from 'api/users';



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

function ReportPost({ report = false, setIsReport, post }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    // const posts = useSelector(state=> state.posts);
    // const [posts, setPosts] = useState()
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setIsReport(false)
        setOpen(false)
    };

    useEffect(() => {
        if (report && post) {
            handleOpen()
        }
    }, [report])

    const handleReport = async () => {

        const formData = new FormData();

        formData.append("userId", user._id);
        formData.append("postId", post._id);
        formData.append("content", content);
        console.log(post);
        console.log(content);
        let data = {
            postId: post._id
        }
        const posts = await reportPost(formData, token);
        console.log(posts);
        // dispatch(setPosts({
        //   posts
        // }))
        // setPostContent("");
    }

    return (

        // <Wrapper>
        <Box sx={{ textAlign: 'center' }}>

            <Modal
                sx={{ marginTop: "150px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Report</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            value = {content}
                            onChange = {(e)=>{
                                console.log(e.target.value)
                                setContent(e.target.value)
                            }}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Violent or repulsive content" control={<Radio />} label="Violent or repulsive content" />
                            <FormControlLabel value="Hateful or abusive content" control={<Radio />} label="Hateful or abusive content" />
                            <FormControlLabel value="Spam or misleading" control={<Radio />} label="Spam or misleading" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    {/* <textarea rows={3} cols={42} style={{ border: "none" }}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setPostContent(e.target.value)

                        }}

                        value={postContent}
                        placeholder='Write something!!'
                    /> */}

                    <Button
                        onClick={() => {
                            handleReport();
                            handleClose();
                            // navigate('/');

                        }}
                    >
                        Report
                    </Button>
                </Box>

            </Modal>
        </Box>
        // </Wrapper>

    )
}

export default ReportPost