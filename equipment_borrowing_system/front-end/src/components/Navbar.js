import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SignIn from "./GoogleSignIn";
import "./Navbar.css";
import logo from "../assets/EQ-logo.png"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const clientId = "1089120979699-boinlps81kfjm5ptjhetjnbsj8cd1a2r.apps.googleusercontent.com";
const settings = ['Logout'];
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Navbar() {

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [info, setInfo] = useState({});
  const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        setShowUsername(true);
        setOpen(false)
        setInfo(res.profileObj)
    };

  const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

  const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        setShowUsername(false);
    };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      // console.log(button)
    }};

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
  const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          { showloginButton ?
              <Button onClick={handleOpen} variant="contained" size="large" sx={{backgroundColor: "#2196F3", fontFamily: "sans-serif"}}>Sign In</Button>
              : null}
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
          <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center"}}>
            Sign In
          </Typography>
          <Typography id="modal-modal-description" sx={{mt:2}} style={{textAlign: "center"}}>
          <GoogleLogin
                    theme="dark"
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    />
          </Typography>
          </Box>
          </Modal>

            {showUsername ?
               <Box sx={{ flexGrow: 0 }}>
               <Tooltip title="Logout">
                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                   <Avatar  src={info.imageUrl} />
                   {info.givenName}
                 </IconButton>
               </Tooltip>
               <Menu
                 sx={{ mt: '45px' }}
                 id="menu-appbar"
                 anchorEl={anchorElUser}
                 anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 keepMounted
                 transformOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 open={Boolean(anchorElUser)}
                 onClose={handleCloseUserMenu}
               >
                 {settings.map((setting) => (
                   <MenuItem key={setting} onClick={handleCloseUserMenu}>
                     <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout>
                   </MenuItem>
                 ))}
               </Menu>
             </Box>
             :null}
          </div>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
