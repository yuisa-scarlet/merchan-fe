import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message)
      return Promise.resolve(error.message)
    }

    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message)
      return Promise.resolve(error.message)
    }

    return Promise.reject(error)
  },
)

export { axiosInstance }
