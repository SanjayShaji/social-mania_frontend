import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    admin: null,
    adminToken: null,
    posts: [],
    comments: [],
    chats : [],
    messages : [],
    users: [],
    error: null,
    loading : 0
    // receivedMessage: []
    // currentChat : ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin : (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setError : (state, action)=>{
            state.error = action.payload.error;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null
        },
        setLoading: (state) =>{
            state.loading = state.loading + 1;
        },

        setAdminLogin : (state, action)=>{
            state.admin = action.payload.admin;
            state.adminToken = action.payload.adminToken;
        },
        setAdminLogout: (state) =>{
            state.admin = false;
            state.adminToken = null
        },

        setRecievedRequests: (state, action)=>{
            if(state.user){
                state.user.recievedFriendRequests = action.payload.recievedFriendRequests;
            }else{
                console.error("user friends non-existent");
            }
        },

        setSentRequests: (state, action)=>{
            if(state.user){
                state.user.sentFriendRequests = action.payload.sentFriendRequests;
            }else{
                console.error("user friends non-existent");
            }
        },

        setFriends: (state, action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends non-existent");
            }
        },

        setProfile: (state, action)=>{
            if(state.user){
                state.user.profileImage = action.payload.profileImage
            }else{
                console.error("no profile")
            }
        },

        setCover: (state, action)=>{
            if(state.user){
                state.user.coverImage = action.payload.coverImage
            }else{
                console.error("no cover")
            }
        },

        setPosts: (state, action)=>{
            state.posts = action.payload.posts
        },

        setPost: (state, action) =>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post._id) return action.payload.post;
                
                return post;
            });
            state.posts = updatedPosts;
        },

        setComments: (state, action)=>{
            state.comments = action.payload.comments
        },

        setUsers: (state, action)=>{
            state.users = action.payload.users
        },

        setUser: (state, action) =>{
            const updatedUsers = state.users.map((user)=>{
                if(user._id === action.payload.user._id) return action.payload.user;
                
                return user;
            });
            state.users = updatedUsers;
        },

        setChats: (state, action)=>{
            state.chats = action.payload.chats
        },

        setCurrentChat: (state, action)=>{
            state.currentChat = action.payload.currentChat
        },

        setMessages: (state, action)=>{
            state.messages = action.payload.messages
        },

        // setReceivedMessage: (state, action)=>{
        //     state.receivedMessage = action.payload.receivedMessage
        // }
        
    }
})

export const {setMode, setLogin, setLogout,setAdminLogin, 
    setAdminLogout, setProfile, setCover, setRecievedRequests, 
    setSentRequests, setFriends, setPosts, setPost, setComments,
    setUsers, setUser, setError,setLoading,
    setChats, setCurrentChat, setMessages} = authSlice.actions;

export default authSlice.reducer;