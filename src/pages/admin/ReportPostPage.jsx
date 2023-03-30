import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import dotenv from 'dotenv'
import { Box, Grid, Paper, styled, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import UsersList from 'components/admin/UsersList';
import ReportTable from 'components/admin/ReportTable';
// import Posts from '../../Components/UserComponents/Posts'

function ReportPostPage() {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  }))

  return (

    <Box sx={{ flexGrow: 1 }}>

      <Grid container spacing={3}>
        {isNonMobileScreens && <Grid item xs={4} md={2}>
          <Item >
            <Box width="100%" sx={{ top: "80px", position: "fixed" }}>
              {/* hello */}
            </Box>
          </Item>
        </Grid>}
        <Grid item xs={12} md={9}>
          <Item >
            <Box sx={{ marginTop: "65px" }}>
              <ReportTable/>
            </Box>
          </Item>
        </Grid>
        {isNonMobileScreens && <Grid item xs={4} md={1}>
          <Item>
            <Box width="100%" sx={{ top: "80px", position: "fixed" }}>
              {/* mannnn */}
            </Box>
          </Item>
        </Grid>}
      </Grid>
    </Box>

  )
}

export default ReportPostPage;