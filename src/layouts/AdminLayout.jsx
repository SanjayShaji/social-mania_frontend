import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/admin/Navbar";
import Sidebar from "components/admin/Sidebar";


const AdminLayout = () => {

  return (
    <Box sx={{marginTop: "20px"}} width="100%" height="100%" >
      <Box width="100%" zIndex={1} 
      sx={{ position:"fixed"}}
      >
      {/* <Navbar/> */}
      <Sidebar/>
      </Box>
      <Box flexGrow={1} >
        <Outlet sx={{m:5}}/>
      </Box>
    </Box>
  );
};

export default AdminLayout;
