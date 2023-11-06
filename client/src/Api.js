import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://super-assistant-form.onrender.com',
})

export default axiosInstance;

