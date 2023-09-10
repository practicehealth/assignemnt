import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { useMyContext } from "../context/mainContext"
import { useEffect } from "react"
const ProtectedRoutes = () => {
    const { loggedIn, verifyMe } = useMyContext();
    const navi = useNavigate();
    // console.log(loggedIn)
    useEffect(() => {
        (async function () {
            let token: string | undefined | any = localStorage.getItem('auth_token');
            token = token.split('"')[1];
            const isSucccess: any = await verifyMe(token);
            if (isSucccess == true) {
                navi("/");
            } else {
                navi("/login");
            };
        })();
    }, [])
    return (
        loggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes