import axios from "axios"
const instance = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosInstance = () => {
    return instance
}
export default useAxiosInstance