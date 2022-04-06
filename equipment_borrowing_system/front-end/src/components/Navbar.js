import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SignIn from "./GoogleSignIn";
import "./Navbar.css";
import logo from "../assets/EQ-logo.png"

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      // console.log(button)
    }};


  useEffect(() => {
    showButton();
  }, [button]);

  window.addEventListener("resize", setButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img style={{ width: "70px", height: "auto"}} src={logo} alt="Logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/equipments"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Equipments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/borrow-history"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Borrow History
              </Link>
            </li>
            <li >
              <Link
                to='/sign-in'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
          <div className="btn-signin-contaier">
            {button && (
            <Link to="/sign-in" >
              <button 
                className="btn-signin"
                // onClick={onClick}
                // type={type}
              >
                Sign In
              </button>
            </Link>
          )}
          </div>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
