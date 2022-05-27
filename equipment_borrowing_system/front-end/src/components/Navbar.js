import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/EQ-logo.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { gql, useMutation } from "@apollo/client";
import { useApp } from "../context/AppContext";
import Swal from "sweetalert2";

const clientId =
  "1089120979699-boinlps81kfjm5ptjhetjnbsj8cd1a2r.apps.googleusercontent.com";
const settings = ["Logout"];
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const USER_MUTATION_REG = gql`
  mutation ($record: CreateOneUserInput!) {
    createUser(record: $record) {
      recordId
    }
  }
`;

function Navbar() {
  const Swal = require("sweetalert2");
  const { login } = useApp();
  const { logout } = useApp();
  const { user } = useApp();
  const [userRole, setUserRole] = useState("");
  const [showloginButton, setShowloginButton] = useState(true);
  const [showUsername, setShowUsername] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [createUserMutation] = useMutation(USER_MUTATION_REG);
  const [studentId, setStudentId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [checkUserLogin, setCheckUserLogin] = useState(false);
  useEffect(() => {
    if (user === null) {
      setCheckUserLogin(false);
    } else {
      setCheckUserLogin(true);
      setShowUsername(true);
      setShowloginButton(false);
      setOpen(false);
      setUserRole(user.role);
    }
  }, [user, checkUserLogin]);

  const onLoginSuccess = useCallback(
    async (res) => {
      if (String(res.profileObj.email) === "ebsystem.adm@gmail.com") {
        try {
          await login(res.profileObj.email);
          console.log("Logged in as Admin");
        } catch (err) {
          console.log(err.message);
        }
      } else if (
        String(res.profileObj.email).slice(-15) === "@it.kmitl.ac.th"
      ) {
        setFullname(res.profileObj.name);
        setStudentId(String(res.profileObj.email).slice(0, 8));
        setEmail(res.profileObj.email);
        let fullname = res.profileObj.name;
        let studentId = String(res.profileObj.email).slice(0, 8);
        let email = res.profileObj.email;
        // console.log("Login Success:", res.profileObj);
        try {
          await createUserMutation({
            variables: {
              record: {
                studentId,
                fullname,
                email,
              },
            },
          });
          await login(email);
          console.log(`Welcome new user, Your're logged in as : ${email}`);
        } catch (err) {
          if (err.message.startsWith("E11000")) {
            try {
              await login(email);
              console.log(`Logged in as : ${email}`);
            } catch (err) {
              console.log("You're not logged in");
            }
          } else {
            console.log("Server error");
          }
        }
      } else if(
        String(res.profileObj.email).slice(-15) !== "@it.kmitl.ac.th" || String(res.profileObj.email) !== "ebsystem.adm@gmail.com"
      ){
        // alert
        // Swal.fire({
        //   title: "Please Login again Use only @it.kmitl.ac.th",
        //   icon: "warning",
        //   showConfirmButton: false,
        //   timer: 3000
        // })
        alert("Please login with account @it.kmitl.ac.th");
      }
    },
    [login, email, fullname, studentId, createUserMutation, user]
  );

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = useCallback(() => {
    logout();
    console.clear();
    window.location.reload();
    // setShowloginButton(true);
    // setShowUsername(false);
  });

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    handleOpen();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      // console.log(button)
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const showProfile = useCallback(() => {
    return (
      <div className={checkUserLogin ? "hi" : "profile-mobile"}>
        <Tooltip title="Logout">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPJD6MgvgZse6oQb_zvtiWhIrdieoTyYCM8w&usqp=CAU" />
            <div className="userName">{user.fullname}</div>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
              ></GoogleLogout>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }, [user, anchorElUser]);

  useEffect(() => {
    showButton();
  }, [button]);

  window.addEventListener("resize", setButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img
              style={{ width: "60px", height: "auto" }}
              src={logo}
              alt="Logo"
            />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={() => setClick(!click)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              {userRole === "admin" ? (
                <Link
                  to="/equipments"
                  className="nav-links"
                  onClick={() => setClick(!click)}
                >
                  Equipment Admin
                </Link>
              ) : (
                <Link
                  to="/equipments-user"
                  className="nav-links"
                  onClick={() => setClick(!click)}
                >
                  Equipments
                </Link>
              )}
            </li>
            <li className="nav-item">
              {userRole === "admin" ? (
                <Link
                  to="/borrow-history"
                  className="nav-links"
                  onClick={() => setClick(!click)}
                >
                  Borrow Order
                </Link>
              ) : (
                <Link
                  to="/borrow-history-user"
                  className="nav-links"
                  onClick={() => setClick(!click)}
                >
                  Borrow History
                </Link>
              )}
            </li>
            <li>
              {!checkUserLogin && showUsername ? (
                showProfile()
              ) : (
                <div className="nav-links-mobile" onClick={closeMobileMenu}>
                  Sign In
                </div>
              )}
            </li>
          </ul>
          <div className="btn-signin-contaier">
            {!checkUserLogin ? (
              <button className="btn-signin" onClick={handleOpen}>
                Sign In
              </button>
            ) : null}
            {/* <button className="btn-signin" onClick={handleOpen}>
                Sign In
              </button> */}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Sign In
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  style={{ textAlign: "center" }}
                >
                  <GoogleLogin
                    theme="dark"
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                </Typography>
              </Box>
            </Modal>

            {checkUserLogin && showUsername ? showProfile() : null}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
