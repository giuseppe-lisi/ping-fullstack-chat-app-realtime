import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !authUser)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );

    return (
        <div>
            <Toaster toastOptions={{className: "",}}/>

            <Navbar></Navbar>

            <Routes>
                <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />}/>
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
            </Routes>
        </div>
    );
}

export default App;
