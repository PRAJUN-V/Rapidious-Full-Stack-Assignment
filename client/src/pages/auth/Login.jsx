import React from 'react';
import backgroundImage from '../../assets/images/login.jpg'; 
import fryingPanVideo from '../../assets/icons/frying-pan.mp4';
import googleIcon from '../../assets/icons/Google.png';

function Login() {
    return (
        <>
            <section className="h-screen flex justify-center items-center bg-cover bg-center relative"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}>
                {/* Overlay to make the background image lighter */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-6">
                        <label className="mr-1 text-lg font-semibold">Sign in with</label>
                        <div className="flex justify-center space-x-2 items-center">
                            <button
                                type="button"
                                className="flex items-center h-12 w-auto px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]">
                                <img
                                    src={googleIcon}
                                    alt="Google Icon"
                                    className="h-8 w-8 mr-2"
                                />
                                <span className="text-sm font-bold">Google</span>
                            </button>
                        </div>
                    </div>

                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
                    </div>

                    <input className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
                        type="text" placeholder="Email Address" />

                    <input className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
                        type="password" placeholder="Password" />

                    <div className="flex justify-between font-semibold text-sm mb-4">
                        <label className="flex items-center text-slate-500 hover:text-slate-600 cursor-pointer">
                            {/* <input className="mr-2" type="checkbox" />
                            <span>Remember Me</span> */}
                        </label>
                        <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold uppercase tracking-wider">
                        Login
                    </button>

                    <div className="mt-4 font-semibold text-center text-sm text-slate-500 flex items-center justify-center">
                        {/* Frying pan video icon */}
                        <video
                            className="h-12 w-12"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src={fryingPanVideo} type="video/mp4" />
                            {/* Fallback for browsers that don't support video */}
                            Your browser does not support the video tag.
                        </video>

                        {/* Don't have an account text */}
                        Don't have an account?{' '}
                        <a className="text-red-600 hover:underline hover:underline-offset-4 ml-1 cursor-pointer">
                            Register
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
