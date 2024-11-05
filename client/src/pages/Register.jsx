import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CTALayout from "../components/layout/CTALayout";
import { auth } from '../states/atoms/auth'
import { useSetRecoilState } from "recoil";
import axios from 'axios'
import toast from "react-hot-toast";
import { API_URL } from '../config'

export default function Register() {
    const navigate = useNavigate()
    const setAuth = useSetRecoilState(auth)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById("email").value
        const pass = document.getElementById("password").value
        const name = document.getElementById("name").value
        const body = {
            name: name,
            username: username,
            password: pass
        }
        try {
            const res = await axios.post(`${API_URL}/register`, body)
            const msg = res.data.msg
            const msgele = document.getElementById("msg")
            if (res.status === 400) {
                console.log(msg)
                msgele.innerHTML = msg
                setTimeout(() => {
                    msgele.className = "text-xs text-red-900 mt-3 text-center"
                    msgele.innerHTML = "signup signup signup signup signup signup"
                }, 3000)
            } else if (res.status === 404) {
                console.log(msg)
                msgele.innerHTML = msg
                setTimeout(() => {
                    msgele.className = "text-xs text-gray-900 mt-3 text-center"
                    msgele.innerHTML = "signup signup signup signup signup signup"
                }, 3000)
            } else if (res.status === 200) {
                setAuth({
                    username: username,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify({
                    id_: res.data.userid,
                    username: username,
                    token: res.data.token,
                    name: res.data.name
                }));
                navigate("/")
            }
        }
        catch (err) {
            console.log(err)
            toast.error("An error occured")
        }
    }
    return (
        <CTALayout>
            <section className="text-black-900 body-font ">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
                        <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 text-black-900">
                        <h2 className="text-green-500 text-lg font-bold title-font mb-5">Register</h2>
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-black-900 font-bold">Full Name</label>
                            <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-bold" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-black-900 font-bold">Username</label>
                            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-bold" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-black-900 font-bold">Password</label>
                            <input type="text" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-bold" />
                        </div>
                        <button className="inline-flex justify-center items-center text-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-white-100 font-extrabold rounded text-base mt-4 md:mt-0" onClick={handleSubmit}>Signup
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" className="w-3 h-3 ml-0.5" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <div id="msg" className="text-xs text-gray-900 mt-3 text-center">signup signup signup signup signup signup</div>
                    </div>
                </div>
            </section>
        </CTALayout>
    )
}