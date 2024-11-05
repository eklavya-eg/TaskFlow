import useAuth from "../hooks/auth/useAuth";

export default function AuthProvider({children}) {
    useAuth();
    return (
        <>
          {children}
        </>
    )
}