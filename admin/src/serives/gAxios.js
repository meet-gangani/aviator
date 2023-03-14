import axios from 'axios'
import constant from '../global'

const axiosInstance = axios.create({
  baseURL: constant.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance

