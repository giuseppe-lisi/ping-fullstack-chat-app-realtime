import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
    const { authUser, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    console.log(authUser);

    return (
        <div>
            <Navbar></Navbar>

            <Routes>
                <Route path="/" Component={Homepage} />
                <Route path="/signup" Component={SignUpPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/settings" Component={SettingsPage} />
                <Route path="/profile" Component={ProfilePage} />
            </Routes>
        </div>
    );
}

export default App;
