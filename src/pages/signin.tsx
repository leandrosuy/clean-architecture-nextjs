import React from 'react';
import Link from 'next/link';
import { signIn } from '@/domain/services/userService';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const result = await signIn(values);
                if (result.success) {
                    localStorage.setItem('userToken', result.user.token);
                    await router.push('/home');
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`border ${formik.errors.email ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`border ${formik.errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
                    </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        type="submit"
                    >
                        Log In
                    </button>
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
