import { useEffect } from "react";
import { auth } from "../../state/atoms/auth";
import { useSetRecoilState } from "recoil";

export default function useAuth(){
    const setAuth = useSetRecoilState(auth)
    useEffect(()=>{
        let data = localStorage.getItem("auth")
        if(data){
            data = JSON.parse(data);
            setAuth({
                username: data.username,
                token: data.token
            })
        }
    }, [])
}