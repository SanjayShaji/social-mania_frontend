import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AuthPage from "pages/users/AuthPage";
import HomePage from "pages/users/HomePage";
import ProfilePage from "pages/users/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UsersList from "pages/users/UsersListPage";
import UserLayout from "layouts/UserLayout";
import AdminLayout from "layouts/AdminLayout";
import ChatPage from "pages/users/ChatPage";
import VideoCall from "pages/users/VideoCall"

import OtpLogin from "pages/users/OtpLogin";
import AdminAuthPage from "pages/admin/AdminAuthPage";
import DashBoard from "pages/admin/DashBoard";
import ReportPostPage from "pages/admin/ReportPostPage";
import ViewPost from "components/admin/viewPost";
import RoomPage from "pages/users/RoomPage";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isAdminAuth = Boolean(useSelector((state) => state.adminToken))
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/auth" element={!isAuth ? <AuthPage /> : <Navigate to="/" />} />
            <Route path="/otpAuth" element={!isAuth ? <OtpLogin /> : <Navigate to="/" />} />
            <Route element={isAuth ? <UserLayout /> : <Navigate to="/auth" />}>
              <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/auth" />} />
              <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />} />
              <Route path="/explore/:search" element={isAuth ? <UsersList /> : <Navigate to="/auth" />} />
              <Route path="/chat" element={isAuth ? <ChatPage /> : <Navigate to="/auth" />} />
              <Route path="/video-call" element={isAuth ? <VideoCall /> : <Navigate to="/auth" />} />
              <Route path="/room/:roomId" element={isAuth ? <RoomPage /> : <Navigate to="/auth" />} />
            </Route>
          {/* </Routes> */}

          {/* <Routes> */}
            <Route path="/admin/auth" element={!isAdminAuth ? <AdminAuthPage /> : <Navigate to="/admin" />} />
            <Route element={isAdminAuth ? <AdminLayout /> : <Navigate to="/admin/auth" />}>
              <Route path="/admin" element={isAdminAuth ? <DashBoard /> : <Navigate to="/admin/auth" />} />
              <Route path="/admin/report-posts" element={isAdminAuth ? <ReportPostPage /> : <Navigate to="/admin/auth" />} />
              {/* <Route path="/admin/view-post" element={isAdminAuth ? <ViewPost /> : <Navigate to="/admin/auth" />} /> */}
              {/* <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />} />
              <Route path="/usersList" element={isAuth ? <UsersList /> : <Navigate to="/auth" />} />
              <Route path="/chat" element={isAuth ? <ChatPage /> : <Navigate to="/auth" />} /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
