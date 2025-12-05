import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navegar = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("usuario"); 
        navegar("/login");               
    };

    return (
        <button onClick={handleLogout} className="primary-btn" style={{ marginTop: "20px" }}>
            <img src="./src/assets/logout.svg" alt="logout" className="btn-left-icon" />
            Cerrar sesión
        </button>
    );
};

export default Logout;