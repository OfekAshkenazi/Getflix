import axios from 'axios'

import Input from "@/components/input";
import { SetStateAction, useState } from "react";

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [name, setUserName] = useState('')

    const [toggleLoginSignup, setToggleLoginSignup] = useState(true)


    async function register() {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })
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
                            <Input
                                label="Username"
                                id="name"
                                type="text"
                                onChange={(ev: { target: { value: SetStateAction<string> } }) => setUserName(ev.target.value)}
                                value={name}
                            />
                            {!toggleLoginSignup && <Input
                                label="Email"
                                id="email"
                                type="email"
                                onChange={(ev: { target: { value: SetStateAction<string> } }) => setEmail(ev.target.value)}
                                value={email}
                            />}
                            <Input
                                label="Password"
                                id="password"
                                type="password"
                                onChange={(ev: any) => setPassowrd(ev.target.value)}
                                value={password}
                            />
                        </div>
                        <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {toggleLoginSignup ? 'Login' : 'Sign up'}
                        </button>
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
