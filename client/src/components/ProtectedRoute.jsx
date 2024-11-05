import { useRecoilValue } from "recoil";
import { auth } from "../states/atoms/auth";
import DefaultPage from "../pages/DefaultPage";

export default function ProtectedRoute({element: Element}){
    const {token} = useRecoilValue(auth)
    return(
        <>
        {token===null ? <DefaultPage/> : <Element />}
        </>
    )
}