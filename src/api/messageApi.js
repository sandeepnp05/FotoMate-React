import axios from 'axios'
const baseURL =  import.meta.env.VITE_BASE_URL;
const messageInstance = axios.create({baseURL:baseURL})

export const sendMessageApi = (message) => messageInstance.post('/message',message)
