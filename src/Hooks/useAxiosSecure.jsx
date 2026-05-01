import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react";
import { useNavigate } from "react-router";
const instanceSecure = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = () => {
    //!import user form useAuth;
    const { user,logOutUser } = useAuth();
    const navagate = useNavigate()
    useEffect(() => {
        //?Add a request interceptor;
        const requestInterceptor = instanceSecure.interceptors.request.use((config) => {
            //? headers:authorization set;
            if (user?.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken111}`
            }
            return config;
        },
            (error) => {
                return Promise.reject(error)
            }
        )


        //?Add a response interceptor;
        const responseInterceptor = instanceSecure.interceptors.response.use((response) => {
            return response
        },
            (error) => {
                //?unauthorized & forbidding chaeacked;
                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.log('Unauthorized access. Logout user');
                    logOutUser()
                    .then(()=>{
                        console.log('You LogOut');
                        navagate('/auth')
                    }).catch(error=>{
                        console.log(error);
                    })

                }
                return Promise.reject(error)
            }

        )


        return () => {
            instanceSecure.interceptors.request.eject(requestInterceptor)
            instanceSecure.interceptors.response.eject(responseInterceptor)
        }
    }, [user,logOutUser])
    return instanceSecure
}
export default useAxiosSecure