import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const chatInstance = axios.create({ baseURL: baseURL });

export const getVendor = (id) => chatInstance.get(`/chat/vendorData/${id}`);
export const getUser = (userId) => chatInstance.get(`/chat/userData/${userId}`);
export const getChats = (id, vendorId) =>
  chatInstance.get(`/chat/chats?id=${id}&vendorId=${vendorId}`);

