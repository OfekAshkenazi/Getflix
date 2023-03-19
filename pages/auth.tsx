import axios from 'axios'
import { SetStateAction, useState } from "react";

import Input from "@/components/input";

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react';

export default function Auth() {

    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [name, setUserName] = useState('')


    const [toggleLoginSignup, setToggleLoginSignup] = useState(true)

    async function login() {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiels'
            })
        } catch (err) {
            console.log(err)
        }

    }

    async function register() {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })
            login()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="relative h-full w-full bg-[url('/imgs/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">

            <div className="bg-black w-full h-full bg-opacity-50">

                <nav className="px-12 py-5">
                    <img src="/imgs/logo.png" alt="logo" className="h-12" />
                </nav>

                <div className="flex justify-center">


                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">

                        <h2 className="text-white text-4xl mb-8 font-semibold">{toggleLoginSignup ? 'Log in' : 'Register'}</h2>

                        <div className="flex flex-col gap-4">

                            {!toggleLoginSignup && <Input
                                label="Username"
                                id="name"
                                type="text"
                                onChange={(ev: { target: { value: SetStateAction<string> } }) => setUserName(ev.target.value)}
                                value={name}
                            />}

                            <Input
                                label="Email"
                                id="email"
                                type="email"
                                onChange={(ev: { target: { value: SetStateAction<string> } }) => setEmail(ev.target.value)}
                                value={email}
                            />

                            <Input
                                label="Password"
                                id="password"
                                type="password"
                                onChange={(ev: any) => setPassowrd(ev.target.value)}
                                value={password}
                            />
                        </div>

                        <button onClick={() => toggleLoginSignup ? login() : register()} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {toggleLoginSignup ? 'Login' : 'Sign up'}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiels' })}
                                className="
                            w-10 
                            h-10
                          bg-white
                            rounded-full 
                            flex 
                            items-center 
                            justify-center 
                            cursor-pointer 
                            hover:opacity-80 
                            transition">
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiels' })}
                                className="
                               w-10
                               h-10
                             bg-white 
                               rounded-full
                               flex 
                               items-center 
                               justify-center 
                               cursor-pointer 
                               hover:opacity-80 
                               transition">
                                <FaGithub size={30} />
                            </div>
                        </div>

                        <p className="text-neutral-500 mt-12">
                            {toggleLoginSignup ? 'First time using Getflix?' : 'Already have an account?'}
                            <span className="text-white ml-1 hover:underline cursor-pointer"
                                onClick={() => setToggleLoginSignup(!toggleLoginSignup)}
                            >
                                {toggleLoginSignup ? 'Create an account' : 'Login'}
                            </span>
                        </p>

                    </div>

                </div>

            </div>

        </section>
    )
}
