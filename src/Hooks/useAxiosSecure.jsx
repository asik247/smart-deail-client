import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react";
const instanceSecure = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = () => {
    //!import user form useAuth;
    const { user } = useAuth();
    useEffect(() => {
        //?Add a request interceptor;
        const requestInterceptor = instanceSecure.interceptors.request.use((config) => {
            //? headers:authorization set;
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config;
        })
        return () => {
            instanceSecure.interceptors.request.eject(requestInterceptor)
        }
    }, [user])
    return instanceSecure
}
export default useAxiosSecure