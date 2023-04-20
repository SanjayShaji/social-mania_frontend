import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Button,
    Card
} from "@mui/material";

import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close, VideoCall, Explore, AccountBox, Chat } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setUsers } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/common/FlexBetweeen";
import { getUsers, searchUser } from "api/users";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // const users = useSelector((state)=> state.users)
    const [userData, setUserData] = useState("");
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const handleSearch = async()=>{
        const data = await searchUser(user._id, userData, token)
        dispatch(setUsers({
            users: data.users
        }))
        setUserData("")
        navigate('/explore/true')
    }

    const fullName = `${user.firstName} ${user.lastName}`;
    return (
        <Card zIndex={2}>
        <Box  style={!isNonMobileScreens ? {display: "flex", flexDirection: "row-reverse", justifyContent: "start", gap: "4rem"} : 
        {display: "flex", justifyContent: "space-between", alignItems: "center"}} padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween   gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{
                        "&: hover": {
                            color: dark,
                            cursor: "pointer"
                        }
                    }}
                >SocialMania
                </Typography>

                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase 
                        value = {userData}
                        onChange = {(e)=>{
                            setUserData(e.target.value)
                        }}
                        placeholder="Search..." />
                        <IconButton>
                            <Search  onClick={handleSearch}/>
                        </IconButton>
                    </FlexBetween>
                )}

            </FlexBetween>
            
            {/* Desktop nav */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem" sx={{cursor: "pointer", fontSize: "25px"}}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode />
                        ) : (<LightMode />)}
                    </IconButton>
                    <IconButton onClick={()=>{navigate('/explore/false')}}><Explore/></IconButton>
                    <IconButton onClick={()=>{navigate('/chat')}}><Chat /></IconButton>
                    <IconButton onClick={()=>{navigate('/video-call')}}><VideoCall sx={{fontSize: "30px"}} /></IconButton>
                    <IconButton onClick={()=>{navigate(`/profile/${user._id}`)}}><AccountBox /></IconButton>
                    {/* <Notifications /> */}
                    <IconButton><Help /></IconButton>
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus" : {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input = {<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=> dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}

            {/* Mobile nav */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed"
                left="0"
                bottom = "0"
                height = "100%"
                zIndex= "10"
                maxWidth= "300px"
                backgroundColor= {background}
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close/>
                        </IconButton>
                    </Box>

                    {/* menu items */}
                    <FlexBetween sx={{cursor: "pointer", fontSize: "25px"}} gap="3rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (<LightMode />)}
                    </IconButton>
                    <IconButton onClick={()=>{navigate('/explore/false')}}><Explore /></IconButton>
                    <IconButton onClick={()=>{navigate('/chat')}}><Chat /></IconButton>
                    <IconButton onClick={()=>{navigate('/video-call')}}><VideoCall /></IconButton>
                    <IconButton onClick={()=>{navigate(`/profile/${user._id}`)}}><AccountBox /></IconButton>
                    {/* <Notifications /> */}
                    <IconButton><Help /></IconButton>
                    
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus" : {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input = {<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=> dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
                </Box>
            )}
            

        </Box>
        </Card>
    )
}

export default Navbar;
