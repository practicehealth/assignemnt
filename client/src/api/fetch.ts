import axios from "axios";

const BACKEND_URI: string = import.meta.env.VITE_BACKEND_URI;


export const server = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URI
})
