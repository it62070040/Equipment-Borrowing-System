import React from 'react'
import { ReactDOM } from 'react-dom';
import Button from '@mui/material/Button';
import './Home.css'

function Home() {
    return (
        <div className="home">
            <div className="home-container" style={{backgroundColor: "white", margin: "100px", width: "35%", position: "relative", padding: "50px", fontSize: "2vw", borderRadius: "25px"}}>
                <h3>ระบบยืม-คืนอุปกรณ์การศึกษา</h3>
                <h1>Equipment</h1>
                <h1>Borrowing</h1>
                <h1>System</h1>
                <Button variant="contained" size="large" style={{backgroundColor: "#6AB4FA", fontSize: "1.5vw"}}>Borrow Equipments</Button>
            </div>
                <img src="../../../assets/Home_background.png"></img>
        </div>
    )
}

export default Home;