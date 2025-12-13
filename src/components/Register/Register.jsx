import React, { useContext, useState } from 'react';
import MyNavLink from '../MyAddition/MyNavLink';
import { AuthContext } from '../../Context/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {

    const { createUser, googleSignIn, setUser, setLoading, update, } = useContext(AuthContext);
    const [error, setError] = useState('')
    const [nameError, setNameError] = useState('');
    const [passError, setPassError] = useState('');
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        const from = e.target;
        const name = from.name?.value;
        const email = from.email?.value;
        const password = from.password?.value;
        const photoUrl = from.photoUrl?.value;
        if (name.length < 6) {
            setNameError('Name length must have to 6 character');
            return;
        }
        else {
            setNameError('');
        }

        if (!/[A-Z]/.test(password)) {
            setPassError("Must have an Uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPassError("Must have a Lowercase letter");
            return;
        }
        if (password.length < 6) {
            setPassError("Length must be at least 6 characters");
            return;
        }

        createUser(email, password)
            .then(res => {
                const currentUser = res.user;
                update(name, photoUrl)
                    .then(() => {
                        setUser(currentUser);
                        setLoading(false);
                        navigate('/');
                    })
                    .catch(err => console.log(err.message));
            })
            .catch(err => setError(err.message));



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

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent text-center mb-3">
                    Join KrishLink
                </h1>

                <form onSubmit={handleRegister} className="space-y-3">

                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text" name='name' required
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />
                    {
                        nameError && <p className='text-red-500'>{nameError}</p>
                    }

                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email" name='email' required
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />


                    <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
                    <input
                        type="text" name='photoUrl' required
                        placeholder="Enter photo URL"
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />



                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password" name='password' required
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />
                    {
                        passError && <p className='text-red-500' >{passError}</p>
                    }
                    {
                        error && <p className='text-red-500'> {error}</p>
                    }

                    <button type='submit' className="w-full bg-gradient-to-r from-green-600 to-green-900 text-white py-2 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all">
                        Register
                    </button>
                </form>

                <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-400">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-green-100 transition-all">
                    Continue with Google
                </button>


                {/* Login Link */}
                <p className="text-center text-gray-600 mt-3 text-sm">
                    Already have an account?{" "}
                    <MyNavLink to='/login'>Login</MyNavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;