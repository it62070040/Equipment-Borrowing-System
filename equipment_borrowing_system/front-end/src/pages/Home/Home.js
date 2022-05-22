import React from "react";
import "./Home.css";


function Home() {
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
            <button
              className="btn-home-borrow"
            >
              Borrow Equipments
            </button>
            </div>
          </div>
        </div>

        <div className="home-img">
          <img
            id="home-img-first"
            src={require("./../../assets/555.png")}
          ></img>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
