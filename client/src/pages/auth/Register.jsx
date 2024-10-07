import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
            console.error('Registration error:', error);
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">Register</h1>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Password"
                            autoComplete="new-password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}

                    <button
                        className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="text-center">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Home
                    </Link>
                    {" | "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
