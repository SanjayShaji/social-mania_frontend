const baseUrl = "http://localhost:4000/api"

module.exports = {

    register : async(values, onSubmitProps)=>{
        const registerResponse = await fetch(`${baseUrl}/auth/register`,
        {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(values)
        })
        const savedUser =await registerResponse.json();
        onSubmitProps.resetForm();
        return savedUser;
      },

      login : async(values, onSubmitProps)=>{
        const loginResponse = await fetch(`${baseUrl}/auth/login`,
        {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(values)
        })
        const loggedIn =await loginResponse.json();
        console.log(loggedIn);
        onSubmitProps.resetForm();
        return loggedIn;
      },

      getUsers: async (userId, token) => {
        const query = {userId: userId}
        const res = await fetch(`${baseUrl}/users/?` + new URLSearchParams(query), {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });
        return res.json();
      },

      searchUser: async (userId, searchName, token) => {
        const query = {userId: userId}
        const res = await fetch(`${baseUrl}/users/search/${searchName}/?`+ new URLSearchParams(query), {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });
        return res.json();
      },

      getUser: async (userId, token) => {
        console.log(userId);
        const response = await fetch(`${baseUrl}/users/${userId}`, {
          method: "GET",
          headers: { 
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        return response.json();
      },

      createProfile: async(formData, token)=>{
        console.log(formData);
        const response = await fetch(`${baseUrl}/users/profile`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        return response.json();
      },

      createCover: async(formData, token)=>{
        console.log(formData);
        const response = await fetch(`${baseUrl}/users/cover`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        return response.json();
      },

      createPost: async(formData, token)=>{
        const response = await fetch(`${baseUrl}/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        return response.json();
      },

      updatePost: async(formData, token)=>{
        console.log(formData)
        // formData.userId = JSON.stringify(formData.userId)
        // console.log(formData)
        let response = await fetch(`${baseUrl}/posts/update`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        })
        return response.json();
      },

      reportPost: async(formData, token)=>{
        console.log(formData)
        console.log(token)
        let response = await fetch(`${baseUrl}/posts/report`, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
          },
          body: formData
        })
        return response.json();
      },

      getUserPosts: async(userId, limit, token)=>{
        let query = {limit: limit}
        const response = await fetch(`${baseUrl}/posts/${userId}/?`+ new URLSearchParams(query),
        {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
        }
        );
        return response.json();
      },

      getPosts: async (limit, token) => {
        let query = {limit: limit}
        const response = await fetch(`${baseUrl}/posts/?`+ new URLSearchParams(query), {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          
        });
        console.log(response);
        return response.json();
    
      },

      ////////////////////////////////////////////

      removePost: async(postId, userId, token)=>{
        const response = await fetch(`${baseUrl}/posts/remove/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId})
        })
        return response.json();
      },


      likePost: async (postId, userId, token) => {
        console.log(postId + " " + userId);
        const response = await fetch(`${baseUrl}/posts/like/${postId}`, {
          method: "PATCH",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId }),
    
        });
        console.log(response);
        return response.json()
      },
    
      friendRequest: async (requestId, userId, token) => {
        
        console.log(requestId + " " + userId);
        const response = await fetch(`${baseUrl}/users/friend-request/${requestId}/`, {
          method: "PATCH",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId }),
    
        });
        console.log(response);
        return response.json()
      },
    
      acceptRejectRequest: async(requestId, userId, query, token)=>{
        console.log(requestId + " " + userId);
        const response = await fetch(`${baseUrl}/users/accept-reject-friend-request/${requestId}/?`+ new URLSearchParams(query), {
          method: "PATCH",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId }),
    
        });
        console.log(response);
        return response.json()
      },

      removeFriend: async(requestId, userId, token)=>{
        console.log(requestId + " " + userId);
        const response = await fetch(`${baseUrl}/users/remove-friend/${requestId}`, {
          method: "PATCH",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId }),
    
        });
        console.log(response);
        return response.json()
      },

      getUserFriendRequests: async (userId, token) => {
        const response = await fetch(`${baseUrl}/users/friend-requests`, {
          method: "POST",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        console.log(response);
        return response.json()
      },

      getFriends : async(userId, token)=>{
        const response = await fetch(`${baseUrl}/users/${userId}/friends`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
        return response.json()
      },
    
      getPostComments: async (postId, token) => {
        // const response = await axios.get(`${baseUrl}/posts/comments/${postId}`)
        // console.log(response);
        // return response.data;
        const response = await fetch(`${baseUrl}/posts/comments/${postId}`, {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
        });
        console.log(response);
        return response.json()
      },
    
      createComment: async (postId, userId, comment, token) => {
        const response = await fetch(`${baseUrl}/posts/comment`, {
          method: "POST",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postId: postId, userId: userId, comment: comment })
        });
        return response.json();
      },
    
      getReplyComments: async (parentId, token) => {
        const response = await fetch(`${baseUrl}/posts/comment/reply/${parentId}`, {
          method: "GET",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
        });
        console.log(response);
        return response.json()
      },
    
      createReplyComment: async (postId, userId, parentId, reply, token) => {
        const response = await fetch(`${baseUrl}/posts/comment/reply`, {
          method: "POST",
          headers: {
            Authorization : `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postId, userId, parentId, reply })
        });
        return response.json();
      },

      removeComment: async(postId, commentId, userId, token)=>{
        const response = await fetch(`${baseUrl}/posts/comment/delete/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({postId, userId})
        })
        return response.json();
      },
}


// export const hideAllPostsFromTimelineAction = (postId) => async (dispatch, getState) => {
//   try {
//     const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_KEY));
//     dispatch({ type: types.HIDE_ALL_POSTS_FROM_TIMELINE, payload: true });  
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_IPURL}/post/hideAllSelectedPost`,
//       {
//         postId: [postId],
//       },
//       {
//         headers: { Authorization: `Bearer ${user?.token}` },
//       }
//     );
//     dispatch({
//       type: types.HIDE_ALL_POSTS_FROM_TIMELINE_SUCCESS,
//       payload: data.data.successResult,
//     });

//   } catch (error) {
//     dispatch({
//       type: types.HIDE_ALL_POSTS_FROM_TIMELINE_ERROR,
//       payload: error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };