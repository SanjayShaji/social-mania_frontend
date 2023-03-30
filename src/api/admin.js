const baseUrl = "http://localhost:4000/api"

export async function login(values, onSubmitProps) {
  const loginResponse = await fetch(`${baseUrl}/admin/auth`,
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
export async function getUsers(token) {
  const res = await fetch(`${baseUrl}/admin/users-list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
export async function getUser(userId, token) {
  const res = await fetch(`${baseUrl}/admin/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
export async function getReportedPosts(token) {
  const res = await fetch(`${baseUrl}/admin/reported-posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.json();
}
export async function blockPost(postId, token) {
  console.log(postId);
  const response = await fetch(`${baseUrl}/admin/post-block/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  return response.json();
}
export async function blockUser(userId, token) {
  console.log(userId);
  const response = await fetch(`${baseUrl}/admin/user-block/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(response);
  return response.json();
}