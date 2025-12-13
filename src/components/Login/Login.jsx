import React, { useContext, useRef, useState } from 'react';
import MyNavLink from '../MyAddition/MyNavLink';
import { AuthContext } from '../../Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const { singIn, loading, setUser, setLoading, googleSignIn, sendPassResetEmail } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const emailRef = useRef(null);
    const handleLogin = (e) => {
        e.preventDefault();
        setError('')
        const from = e.target;
        const email = from.email?.value;
        const password = from.password?.value;


        singIn(email, password)
            .then(res => {
                setLoading(false)
                setUser(res.user)
                toast.success("Well done !!!");
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(err => {

                setError(err.message);
            })


    }

    const handleGoogle = () => {
        googleSignIn()
            .then(res => {
                setLoading(false)
                setUser(res.user)
                toast.success("Well done !!!");
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(err => {

                setError(err.message);
            })

    }
    const handleForgetPassword = async () => {
        const email = emailRef.current?.value.trim();

        if (!email) {
            toast.error("first give email");
            return;
        }

        try {
            await sendPassResetEmail(email);
            toast.success("check the gmail for reset code ");
        } catch (err) {
            if (err.message.includes("user-not-found")) {
                toast.error("There are no Account for this gmail");
            } else {
                toast.error("Something is wrong try again later");
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent text-center mb-3">
                    Welcome to KrishLink
                </h1>
                <form onSubmit={handleLogin} className="space-y-3">
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email" name='email' ref={emailRef}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />

                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password" name='password'
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />

                    <button
                        type="button"
                        onClick={handleForgetPassword}
                        disabled={loading}
                        className={`text-green-700 hover:underline text-sm ${loading ? 'opacity-60' : ''}`}
                    >
                        {loading ? 'getting code..' : 'Forget password?'}
                    </button>

                    <button type='submit' className="w-full bg-gradient-to-r from-green-600 to-green-900 text-white py-2 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all">
                        Login
                    </button>
                </form>

                {
                    error && <p className='text-red-500'> {error}</p>
                }

                <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-400">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-green-100 transition-all">
                    Continue with Google
                </button>

                <p className="text-center text-gray-600 mt-3 text-sm">
                    Don't have an account?
                    <MyNavLink to='/register'> Sign up </MyNavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;