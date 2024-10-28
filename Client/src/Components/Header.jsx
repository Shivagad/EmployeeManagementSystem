
import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg'; // Adjust the path as needed
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center">
          <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          <span className="fs-4 fw-bold">TeamHub</span>
        </Link>
        <span className="fs-4 fw-bold">Emoployee Management System</span>
        
        <nav className="d-flex align-items-center">
          <Link to="/profile" className="text-white text-decoration-none mx-3 d-flex align-items-center">
            <FaUserCircle className="me-2" size={20} />
            Profile
          </Link>
          <Link to="/logout" className="text-white text-decoration-none">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
