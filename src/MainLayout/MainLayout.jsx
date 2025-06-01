import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Slider from "../components/Slider/Slider"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Auth/Login/Login"
import Register from "../Pages/Auth/Register/Register"
import Error from "../Pages/Error/Error"
import AuthCheck from "../AuthCheck/AuthCheck"
import Auth from "../Pages/Auth/Auth"


const MainLayout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Slider />
            <Routes>
                <Route path="/" element={
                    <AuthCheck>
                        <Home/>
                    </AuthCheck>
                    } />
                <Route path="auth" element={<Auth/>}>
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                </Route>
                
                <Route path="*" element={<Error/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainLayout