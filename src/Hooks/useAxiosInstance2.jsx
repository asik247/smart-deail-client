import axios from "axios"
import { useEffect } from "react"
const instance = axios.create({
    baseURL: "https://api.example.com"
})
const useAxiosInstance2 = () => {
    useEffect(() => {
        //?Add a request interceptor;
        const requestIntercepor = instance.interceptors.request.use((config) => {
            //? token set;
            config.headers.authorization = `Bearer ${'abc token'}`
            return config;
        })
        return () => {
            instance.interceptors.request.eject(requestIntercepor);
        }

    }, [])

    return instance
}
export default useAxiosInstance2