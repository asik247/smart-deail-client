import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
;

const Login = () => {
    const { login, googleSingIn } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
        login(email, password)
            .then(res => {
                console.log(res.user);
            }).catch(error => {
                console.log(error);
            })
        // এখানে Firebase / backend login add করতে পারো
    };

    const handleGoogleLogin = () => {
        console.log("Google Login Clicked");
        googleSingIn()
            .then(res => {
                console.log(res.user);
            }).catch(error => {
                console.log(error.message);
            })

        // Firebase Google login later add করবো
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t"></div>
                    <p className="px-3 text-gray-400 text-sm">OR</p>
                    <div className="flex-1 border-t"></div>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                {/* Register Link */}
                <p className="text-center mt-4 text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/auth/registation"
                        className="text-blue-500 font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;