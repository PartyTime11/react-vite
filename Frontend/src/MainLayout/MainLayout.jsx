import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Auth from "../Pages/Auth/Auth";
import Catalogue from "../Pages/Catalogue/Catalogue";
import Basket from "../Pages/Auth/Basket/Basket";
import ProtectedRoute from '../components/ProtectedRoute'; 
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

const MainLayout = () => {
    return (
        <AuthProvider> 
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="auth" element={<Auth />}>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="basket" element={<ProtectedRoute><Basket /></ProtectedRoute>} />
                        </Route>
                        <Route path="catalogue" element={<Catalogue />} />
                        </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};

export default MainLayout;