import { useEffect } from "react";
import { auth } from "../../states/atoms/auth";
import { useSetRecoilState } from "recoil";

export default function useAuth(){
    const setAuth = useSetRecoilState(auth)
    let data = localStorage.getItem("auth")
    if(data){
        useEffect(()=>{
                data = JSON.parse(data);
                setAuth({
                    id_: data.id_,
                    username: data.username,
                    token: data.token
                })
        }, [])
    }
}


