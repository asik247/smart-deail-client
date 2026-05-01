import axios from "axios"
import useAuth from "./useAuth"
const instanceSecure = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = () => {
    //!import user form useAuth;
    const { user } = useAuth();
    //?Add a request interceptor;
    instanceSecure.interceptors.request.use((config) => {
        //? headers:authorization set;
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })
    return instanceSecure
}
export default useAxiosSecure