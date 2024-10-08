import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/images/login.jpg';
import fryingPanVideo from '../../assets/icons/frying-pan.mp4';
import api from "../../api";

const validationSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
        ),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        setLoading(true);
        const userData = {
            password: values.password,
            email: values.email,
            profile: { role: "user" },
        };

        try {
            await api.post("api/account/register/", userData);
            toast.success('Registration successful. Redirecting to login...');
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            toast.error('Registration failed. The email might already exist.');
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            password: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleRegister(values);
        },
    });

    return (
        <section className="h-screen flex justify-center items-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}>
            {/* Overlay to make the background image lighter */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-blue-500 mb-6">EpiRecipes</h1>
                
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Email Address"
                            className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Password"
                            autoComplete="new-password"
                            className="text-lg w-full px-4 py-3 border border-solid border-gray-300 rounded mb-4"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-3 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                    ) : null}

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold uppercase tracking-wider"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

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
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-red-600 hover:underline hover:underline-offset-4 ml-1"
                    >
                        Login
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Register;
