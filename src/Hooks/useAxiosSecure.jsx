import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
const instanceSecure = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = () => {
    //!import user form useAuth;
    const { user, logOut } = useAuth();

    const navagate = useNavigate()
    useEffect(() => {
        //?Add a request interceptor;
        const requestInterceptor = instanceSecure.interceptors.request.use((config) => {
            //? headers:authorization set;
            if (user?.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`
            }
            return config;
        },
            (error) => {
                return Promise.reject(error)
            }
        )


        //?Add a response interceptor;
        const responseInterceptor = instanceSecure.interceptors.response.use(res => {
            return res
        }, err => {
            // console.log('inside err',err);
            const status = err.status;
            if (status === 401 || status === 403) {
                console.log('You LogOut');
                logOut()
                    .then(() => {
                        navagate('/auth')
                    })
            }


        })


        return () => {
            instanceSecure.interceptors.request.eject(requestInterceptor)
            instanceSecure.interceptors.response.eject(responseInterceptor)

        }
    }, [user, logOut, navagate])
    return instanceSecure
}
export default useAxiosSecure