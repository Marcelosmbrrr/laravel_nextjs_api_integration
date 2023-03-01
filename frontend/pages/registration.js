import * as React from 'react';
import { env } from '@/next.config';
import Link from 'next/link';
import axios from 'axios';

const initialForm = { name: "", email: "", password: "", password_confirmation: "" };
const initialFieldError = { error: false, message: "" };
const initialFormError = { name: initialFieldError, email: initialFieldError, password: initialFieldError, password_confirmation: initialFieldError };
const formValidation = {
    name: (value) => value.length > 0 ? initialFieldError : { error: true, message: "Informe o nome" },
    email: (value) => value.length > 0 ? initialFieldError : { error: true, message: "Informe o email" },
    password: (value) => value.length > 0 ? initialFieldError : { error: true, message: "Informe a senha" },
    password_confirmation: (value) => value.length > 0 ? initialFieldError : { error: true, message: "Informe a confirmação da senha" }
}

export default function Registration() {

    const [form, setForm] = React.useState(initialForm);
    const [formError, setFormError] = React.useState(initialFormError);

    function handleSubmit(e) {
        e.preventDefault();

        let is_valid = true;
        let validation = Object.assign({}, formError);
        for (let field in form) {
            validation[field] = formValidation[field](form[field]);
            if (validation[field].error) {
                is_valid = false;
            }
        }

        setFormError(validation);

        if (is_valid) {
            fetchServer();
        }

    }

    async function fetchServer() {
        try {

            const response = await axios.post(`${env.API_URL}/api/registration`);
            console.log(response);

        } catch (e) {
            console.log(e);
            if (e.response.code === 422) {

                let validation = Object.assign({}, initialFormError);
                let errors = e.response.data.errors;

                for (let field in validation) {
                    if (errors.hasOwnProperty(field)) {
                        validation[field] = { error: true, message: errors[field][0] }
                    }
                }

                setFormError(validation);

            }
        }
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <div className='flex justify-center'>
                        <img
                            className="h-12 px-5"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Tailwind icon"
                        />
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
                            className="h-12  px-5"
                            alt="Laravel icon"
                        />
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                            className="h-12  px-5"
                            alt="NextJS icon"
                        />
                    </div>
                    <div className='mt-8'>
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                            Registration
                        </h2>
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <div>
                            <input
                                name="name"
                                type="text"
                                className={`relative block w-full appearance-none rounded border border-${formError.name.error ? "red" : "gray"}-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                placeholder="Full name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <span className='text-red-500 text-sm'>{formError.name.message}</span>
                        </div>
                        <div className='mt-6'>
                            <input
                                name="password"
                                type="password"
                                className={`relative block w-full appearance-none rounded border border-${formError.email.error ? "red" : "gray"}-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                placeholder="Password"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <span className='text-red-500 text-sm'>{formError.email.message}</span>
                        </div>
                        <div className='mt-6'>
                            <input
                                name="password"
                                type="password"
                                className={`relative block w-full appearance-none rounded border border-${formError.password.error ? "red" : "gray"}-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <span className='text-red-500 text-sm'>{formError.password.message}</span>
                        </div>
                        <div className='mt-6'>
                            <input
                                name="password_confirmation"
                                type="password"
                                className={`relative block w-full appearance-none rounded border border-${formError.password_confirmation.error ? "red" : "gray"}-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                placeholder="Password confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                            />
                            <span className='text-red-500 text-sm'>{formError.password_confirmation.message}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-start">
                        <div className="text-sm">
                            <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Login
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}