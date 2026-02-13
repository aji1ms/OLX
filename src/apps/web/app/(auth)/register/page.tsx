'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { validateEmail, validateName, validatePassword, validatePhone } from "../../../helper/validation";
import { clearAuthError, registerThunk } from "../../../redux/slices/authSlice";

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/");
        }
    }, [isAuthenticated, router]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const [formError, setFormError] = useState({
        nameError: '',
        emailError: '',
        phoneError: '',
        passwordError: ''
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAuthError());
        }
    }, [error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nErr = validateName(formData.name);
        const eErr = validateEmail(formData.email);
        const phErr = validatePhone(formData.phone);
        const pErr = validatePassword(formData.password);

        if (nErr || eErr || phErr || pErr) {
            setFormError({
                nameError: nErr || '',
                emailError: eErr || '',
                phoneError: phErr || '',
                passwordError: pErr || ''
            });
            return;
        }

        const result = await dispatch(registerThunk(formData));

        if (registerThunk.fulfilled.match(result)) {
            toast.success("Registration Successful!");
            router.push("/login");
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">OLX</h1>
                    <p className="text-gray-600">Welcome back! Please register your account</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${formError.nameError ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                                placeholder="Enter your full name"
                            />
                            {formError.nameError && <p className="text-red-500 text-xs mt-1">
                                {formError.nameError}
                            </p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${formError.emailError ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                                placeholder="Enter your email"
                            />
                            {formError.emailError && <p className="text-red-500 text-xs mt-1">
                                {formError.emailError}
                            </p>}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${formError.phoneError ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                                placeholder="Enter your phone number"
                            />
                            {formError.phoneError && <p className="text-red-500 text-xs mt-1">
                                {formError.phoneError}
                            </p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${formError.passwordError ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                                placeholder="Enter your password"
                            />
                            {formError.passwordError && <p className="text-red-500 text-xs mt-1">
                                {formError.passwordError}
                            </p>}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Sign up"
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    By continuing, you agree to OLX Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};
