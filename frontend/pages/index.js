import * as React from 'react';
import { env } from '@/next.config';
import Link from 'next/link';
import Router from 'next/router';
import { setCookie } from 'nookies'
import { LockClosedIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/context/Auth';

const initialForm = { email: "", password: "" };
const initialFieldError = { error: false, color: "gray", message: "" };
const initialFormError = { email: initialFieldError, password: initialFieldError };
const formValidation = {
  email: (value) => value.length > 0 ? initialFieldError : { error: true, color: "red", message: "Informe o email" },
  password: (value) => value.length > 0 ? initialFieldError : { error: true, color: "red", message: "Informe a senha" }
}

export default function Login() {

  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  const [form, setForm] = React.useState(initialForm);
  const [formError, setFormError] = React.useState(initialFormError);
  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      fetchServer();
    }

  }

  async function fetchServer() {
    try {

      const response = await axios.post(`${env.API_URL}/api/login`, JSON.stringify(form));

      setUser(response.data.user);

      setCookie(undefined, 'auth-token', response.data.authtoken, {
        maxAge: 60
      });

      enqueueSnackbar(response.data.message, { variant: "success" });

      Router.push("/dashboard");

    } catch (error) {
      console.log(error);
      setLoading(false);
      handleErrorResponse(error.response);
    }
  }

  function handleErrorResponse(response) {
    enqueueSnackbar(response.data.message, { variant: "error" });

    if (response.status === 422) {
      let validation = Object.assign({}, initialFormError);
      for (let field in response.data.errors) {
        validation[field] = {
          error: true,
          message: response.data.errors[field][0]
        }
      }
      setFormError(validation);
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
              Sign in to your account
            </h2>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                className={`relative block w-full appearance-none rounded border border-${formError.email.color}-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <span className='text-red-500 text-sm'>{formError.email.message}</span>
            </div>
            <div className='mt-6'>
              <input
                id="password"
                name="password"
                type="password"
                className={`relative block w-full appearance-none rounded border border-${formError.password.color}-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span className='text-red-500 text-sm'>{formError.password.message}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/registration" className="font-medium text-indigo-600 hover:text-indigo-500">
                Registration
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={loading}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {loading ?
                  <div role="status">
                    <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-white fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                  :
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                }
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
