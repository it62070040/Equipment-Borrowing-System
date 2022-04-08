import React from 'react'
import Button from '@mui/material/Button';
import './Home.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Home() {
    return (
        
        <div className="home">
             <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={4} sx={{flexDirection: 'column', justifyContent: 'center', display: 'flex', alignItems: 'flex-end'}}>
                    <Box className="home-box" sx={{backgroundColor: "white", width: "80%", fontSize: "1.5vw", borderRadius: "20px", py:4, px:3, display: 'flex', justifyContent: 'center'}}>
                        <div className="home-div" style={{}}>
                            <h3>ระบบยืม-คืนอุปกรณ์การศึกษา</h3>
                            <h1>Equipment</h1>
                <h1>Borrowing</h1>
                <h1>System</h1>
                <Button variant="contained" size="large" style={{backgroundColor: "#6AB4FA", fontSize: "1.5vw"}}>Borrow Equipments</Button>
            </div>
               
            </Box>
        </Grid>
        <Grid item xs={8} sx={{ marginTop: "2%"}}>
        <img src={require("./../../assets/555.png")} width="100%"></img>
        </Grid>
      </Grid>
    </Box>

        </div>
    )
}

export default Home;