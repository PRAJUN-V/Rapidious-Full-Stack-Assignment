import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { jwtDecode } from 'jwt-decode';
import backgroundImage from '../../assets/images/login.jpg';
import fryingPanVideo from '../../assets/icons/frying-pan.mp4';
import googleIcon from '../../assets/icons/Google.png';
import Loading from '../../components/Loading';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterClick = () => {
        navigate('/register');
    };

    // Validation schema for form using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
            ),
    });

    // Handle form submission and API request
    const handleSubmit = async (values, { setErrors }) => {
        setIsLoading(true); // Show loading state
        await new Promise(resolve => setTimeout(resolve, 2500)); // 10000 ms = 10 seconds
        try {
            const res = await api.post("/api/account/token/", {
                email: values.email,
                password: values.password,
            });

            const { access, refresh } = res.data;
            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);

            const decoded = jwtDecode(access);
            const userRole = decoded.role;

            switch (userRole) {
                case "admin":
                    navigate("/admin/dashboard");
                    break;
                case "user":
                    navigate("/");
                    break;
                default:
                    navigate("/login");
                    break;
            }
        } catch (error) {
            setErrors({ submit: "Incorrect email or password." });
        } finally {
            setIsLoading(false); // Hide loading state after completion
        }
    };

    if (isLoading) {
        // Display only the loading component when loading
        return (
            <div className="h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <section className="h-screen flex justify-center items-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}>
            {/* Overlay to make the background image lighter */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {/* Google Sign-in button */}
                {/* <div className="text-center mb-6">
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
                </div> */}

                {/* Divider */}
                {/* <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
                </div> */}
                <h1 className="text-2xl font-bold text-blue-500 mb-6">EpiRecipes</h1>
                {/* Formik for form handling */}
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors }) => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {errors.submit && (
                                <div className="text-red-500 text-sm mb-4 text-center">
                                    {errors.submit}
                                </div>
                            )}

                            {/* <div className="flex justify-between font-semibold text-sm mb-4">
                                <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">
                                    Forgot Password?
                                </a>
                            </div> */}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold uppercase tracking-wider"
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <div className="mt-4 font-semibold text-center text-sm text-slate-500 flex items-center justify-center">
                    <video
                        className="h-12 w-12"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src={fryingPanVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    Don't have an account?{' '}

                    <button
                        onClick={handleRegisterClick}
                        className="text-red-600 hover:underline hover:underline-offset-4 ml-1 cursor-pointer"
                    >
                        Register
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
