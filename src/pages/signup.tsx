import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/domain/services/userService';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';



const Signup: React.FC = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const result = await signUp(values);
                if (result.success) {
                    toast.success('Signup successful!');
                    await router.push('/login');
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                console.error('Error during signup:', error);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className={`border ${formik.errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
                    </div>
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
                        Sign Up
                    </button>
                    <Link href="/signin" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;
