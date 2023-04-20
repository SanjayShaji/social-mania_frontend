
const baseUrl = `https://socialmania.site/socket`

export async function createChat(obj, token) {
    console.log(obj);
    const response = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    return response.json();
}


export async function userChats(id, token) {

    const res = await fetch(`${baseUrl}/chat/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

export async function getMessages(id, token) {

    const res = await fetch(`${baseUrl}/message/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}


export async function addMessage(obj, token) {
    console.log(obj);
    const response = await fetch(`${baseUrl}/message`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    return response.json();
}