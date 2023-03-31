const baseUrl = "https://socialmania.site/api"

export async function register(values, onSubmitProps) {
  const registerResponse = await fetch(`${baseUrl}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
  const savedUser = await registerResponse.json();
  onSubmitProps.resetForm();
  return savedUser;
}
export async function login(values, onSubmitProps) {
  const loginResponse = await fetch(`${baseUrl}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
  const loggedIn = await loginResponse.json();
  console.log(loggedIn);
  onSubmitProps.resetForm();
  return loggedIn;
}
export async function getUsers(userId, token) {
  const query = { userId: userId };
  const res = await fetch(`${baseUrl}/users/?` + new URLSearchParams(query), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
export async function searchUser(userId, searchName, token) {
  const query = { userId: userId };
  const res = await fetch(`${baseUrl}/users/search/${searchName}/?` + new URLSearchParams(query), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
export async function getUser(userId, token) {
  console.log(userId);
  const response = await fetch(`${baseUrl}/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  return response.json();
}
export async function createProfile(formData, token) {
  console.log(formData);
  const response = await fetch(`${baseUrl}/users/profile`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return response.json();
}
export async function createCover(formData, token) {
  console.log(formData);
  const response = await fetch(`${baseUrl}/users/cover`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return response.json();
}
export async function createPost(formData, token) {
  const response = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return response.json();
}
export async function updatePost(formData, token) {
  console.log(formData);
  // formData.userId = JSON.stringify(formData.userId)
  // console.log(formData)
  let response = await fetch(`${baseUrl}/posts/update`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  return response.json();
}
export async function reportPost(formData, token) {
  console.log(formData);
  console.log(token);
  let response = await fetch(`${baseUrl}/posts/report`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  return response.json();
}
export async function getUserPosts(userId, limit, token) {
  let query = { limit: limit };
  const response = await fetch(`${baseUrl}/posts/${userId}/?` + new URLSearchParams(query),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
}
export async function getPosts(limit, token) {
  let query = { limit: limit };
  const response = await fetch(`${baseUrl}/posts/?` + new URLSearchParams(query), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  return response.json();

}
export async function removePost(postId, userId, token) {
  const response = await fetch(`${baseUrl}/posts/remove/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  });
  return response.json();
}
export async function likePost(postId, userId, token) {
  console.log(postId + " " + userId);
  const response = await fetch(`${baseUrl}/posts/like/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  });
  console.log(response);
  return response.json();
}
export async function friendRequest(requestId, userId, token) {

  console.log(requestId + " " + userId);
  const response = await fetch(`${baseUrl}/users/friend-request/${requestId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  });
  console.log(response);
  return response.json();
}
export async function acceptRejectRequest(requestId, userId, query, token) {
  console.log(requestId + " " + userId);
  const response = await fetch(`${baseUrl}/users/accept-reject-friend-request/${requestId}/?` + new URLSearchParams(query), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  });
  console.log(response);
  return response.json();
}
export async function removeFriend(requestId, userId, token) {
  console.log(requestId + " " + userId);
  const response = await fetch(`${baseUrl}/users/remove-friend/${requestId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  });
  console.log(response);
  return response.json();
}
export async function getUserFriendRequests(userId, token) {
  const response = await fetch(`${baseUrl}/users/friend-requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId })
  });
  console.log(response);
  return response.json();
}
export async function getFriends(userId, token) {
  const response = await fetch(`${baseUrl}/users/${userId}/friends`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}
export async function getPostComments(postId, token) {
  // const response = await axios.get(`${baseUrl}/posts/comments/${postId}`)
  // console.log(response);
  // return response.data;
  const response = await fetch(`${baseUrl}/posts/comments/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  return response.json();
}
export async function createComment(postId, userId, comment, token) {
  const response = await fetch(`${baseUrl}/posts/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId: postId, userId: userId, comment: comment })
  });
  return response.json();
}
export async function getReplyComments(parentId, token) {
  const response = await fetch(`${baseUrl}/posts/comment/reply/${parentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  return response.json();
}
export async function createReplyComment(postId, userId, parentId, reply, token) {
  const response = await fetch(`${baseUrl}/posts/comment/reply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId, userId, parentId, reply })
  });
  return response.json();
}
export async function removeComment(postId, commentId, userId, token) {
  const response = await fetch(`${baseUrl}/posts/comment/delete/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId, userId })
  });
  return response.json();
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