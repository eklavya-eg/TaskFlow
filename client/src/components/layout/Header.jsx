import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth } from "../../states/atoms/auth"
import { useNavigate, NavLink } from "react-router-dom";


export default function Header() {
    const { token } = useRecoilValue(auth)
    const navigate = useNavigate()
    console.log("token")
    return (
        <>
            <div className="text-black-900 body-font">
                <div className="max-w-full mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-black-900 mb-4 md:mb-0 font-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <div className="ml-3 text-xl font-semibold" onClick={() => {
                            navigate("/")
                        }}>TaskFlow</div>
                    </a>
                    <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <NavLink to="/" className="mr-5 hover:text-black-900 font-bold">Stats</NavLink>
                        <NavLink to="/flow" className="mr-5 hover:text-black-900 font-bold">TaskFlow</NavLink>
                        <NavLink to="/about" className="mr-5 hover:text-black-900 font-bold">About</NavLink>
                    </div>
                    {token === null ? <LoginButton /> : <ProfileButton />}
                    {/* <ProfileButton /> */}
                </div>
            </div>
        </>
    )
}

function LoginButton() {
    const navigate = useNavigate()
    return (
        <>
            <button className="inline-flex items-center text-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-white-100 font-bold rounded text-base mt-4 md:mt-0" onClick={() => {
                navigate("/login")
            }}>Login
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
        </>
    )
}


function ProfileButton() {
    const navigate = useNavigate()
    const setAuth = useSetRecoilState(auth)
    const logoutHandler = () => {
        setAuth({
            token: null,
            username: null
        })
        localStorage.removeItem("auth");
        navigate("/")
    }
    return (
        <>
            <button className="inline-flex items-center text-green-500 border-0 py-1 px-3 focus:outline-none bg-gray-100 hover:bg-gray-200 font-bold rounded text-base mt-4 md:mt-0" onClick={logoutHandler}>Logout
            </button>
        </>
    )
}