import axios from "axios";

export const baseUrl = 'http://localhost:8080/';

axios.defaults.baseURL = baseUrl;

export const api = {
  messages: 'messages',
  users: 'users'
};

export const getMessagesApi = () => axios.get(api.messages);
export const setUserApi = (title: string) => axios.post(api.users, { title });
