import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, Paper, styled, TextField, useMediaQuery } from '@mui/material'
import  { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

function RoomPage() {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const {roomId} = useParams();
    const myMeeting = async(element)=>{
        const appID = 1760412328
        const serverSecret = "c41a9e7e64e4be0a921b6cfc4c2b0715";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            'sanju'
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            }
        })
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
  return (
    <Box sx={{ flexGrow: 1, alignItems: "center", }}>
            <Grid container spacing={3}>
                {/* {isNonMobileScreens && <Grid item xs={4} md={1}>
                    <Item sx={{ marginTop: "70px" }}>
                        
                    </Item>
                </Grid>} */}
                <Grid  item xs={12} md={12} >
                    <Box sx={{ marginTop: "70px", textAlign: "center", height:"60%"}}>
                            <h1>Room Page</h1>
                        <Box sx={{ height:"100%"}} ref={myMeeting}>

                        </Box>
                        </Box>
                    {/* <Grid container > */}
                    {/* </Grid> */}
                </Grid>
                {/* {isNonMobileScreens && <Grid item xs={4} md={1}>
                    <Item sx={{ marginTop: "70px" }}>
                        
                    </Item>
                </Grid>} */}
            </Grid>

        </Box>
  )
}

export default RoomPage