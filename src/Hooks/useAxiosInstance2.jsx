import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instanceSecure = axios.create({
    baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {

    //! current user
    const { user, logOut } = useAuth();

    useEffect(() => {

        //! Request interceptor
        const requestInterceptor = instanceSecure.interceptors.request.use(
            (config) => {

                //! token add in headers
                if (user?.accessToken) {
                    config.headers.authorization = `Bearer ${user.accessToken}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        //! Response interceptor
        const responseInterceptor = instanceSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {

                //! unauthorized or forbidden
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    console.log("Unauthorized access. Logout user");

                    //! optional logout
                    logOut()
                        .then(() => { })
                        .catch(err => console.log(err));
                }

                return Promise.reject(error);
            }
        );
       

        //! cleanup interceptor
        return () => {
            instanceSecure.interceptors.request.eject(requestInterceptor);
            instanceSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [user?.accessToken, logOut]);

    return instanceSecure;
};

export default useAxiosSecure;