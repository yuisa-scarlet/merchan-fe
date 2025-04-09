import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      response.headers["Authorization"] = `Bearer ${token}`
    }
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

axiosInstance.interceptors.request.use(
  (config) => {
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

export { axiosInstance }
