import React, {useState} from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";


function Home() {
  const { user } = useApp();
  const [userRole, setUserRole] = useState("");
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-papar-left-con">
          <div className="home-papar-left">
            <div className="home-papar-left-text">
            <h2>ระบบยืม-คืนอุปกรณ์การศึกษา</h2>
            <h1>Equipment</h1>
            <h1>Borrowing</h1>
            <h1>System</h1>

            </div>
            <div className="btn-home-borrow-con">
            {/* <button
              className="btn-home-borrow"
            >
              Borrow Equipments
            </button> */}
            <div className="btn-home-borrow">
            {userRole === "admin" ? (
            <Link
                to="/equipments-user"
                
              >
                Borrow Equipments
              </Link>
            ) :
             (
             <Link
              to="/equipments"
              
            >
              Equipment Admin
            </Link>
            )}
            </div>

            </div>
          </div>
        </div>

        <div className="home-img">
          <img
            id="home-img-first"
            src={require("./../../assets/15.png")}
          ></img>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
