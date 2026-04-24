import { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { updateProfile } from "firebase/auth";
const Registation = () => {
    const { registerUsers } = useContext(AuthContext)
    // console.log(userInfo);
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password, name, photo);
        registerUsers(email, password)
            .then(res => {
                // const registerUserInfo = {
                //     name:res.user.displayName,
                //     email:res.user.email,
                //     photo:res.user.photoURL,
                    
                // }
                const updateUsers = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(res.user, updateUsers)
                // fetch('http://localhost:3000/users',{
                //     method:'POST',
                //     headers:{
                //         'content-type':'application/json'
                //     },
                //     body:JSON.stringify(registerUserInfo)

                // })
                .then(res=>res.json())
                .then(data=>{
                    console.log('after save db dataa',data);
                })
            }
            )
            .catch(error => console.log(error.message))

        // const user = { name, photo, email, password };

        // console.log(user);
        // এখানে backend / firebase এ পাঠাতে পারো
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-1 font-medium">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Enter photo URL"
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

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

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Redirect */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/auth" className="text-blue-500 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registation;