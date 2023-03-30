import axios from 'axios';

const API = axios.create({baseURL: `http://localhost:4000/socket`})

export const createChat = (data)=> API.post(`/chat`, data)

export const userChats = (id)=> API.get(`/chat/${id}`)

export const getMessages = (id)=> API.get(`/message/${id}`)

export const addMessage = (data) => API.post('/message/', data)