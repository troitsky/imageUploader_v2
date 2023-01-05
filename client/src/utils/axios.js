import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://imageuploader.onrender.com/",
})
export default axiosInstance