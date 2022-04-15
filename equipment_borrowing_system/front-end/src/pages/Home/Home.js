import React from "react";
import "./Home.css";


function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-papar-left-con">
          <div className="home-papar-left">
            <h2>ระบบยืม-คืนอุปกรณ์การศึกษา</h2>
            <h1>Equipment</h1>
            <h1>Borrowing</h1>
            <h1>System</h1>
            <button
              className="btn-home-borrow"
            >
              Borrow Equipments
            </button>
          </div>
        </div>

        <div className="home-img">
          <img
            id="home-img-first"
            src={require("./../../assets/555.png")}
          ></img>
        </div>
      </div>
      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Box
              className="home-box"
              sx={{
                backgroundColor: "white",
                width: "80%",
                fontSize: "1.5vw",
                borderRadius: "20px",
                py: 4,
                px: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="home-div" style={{}}>
                <h3>ระบบยืม-คืนอุปกรณ์การศึกษา</h3>
                <h1>Equipment</h1>
                <h1>Borrowing</h1>
                <h1>System</h1>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "#6AB4FA",
                    fontSize: "1.5vw",
                    fontFamily: "sans-serif",
                  }}
                >
                  Borrow Equipments
                </Button>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "2%" }}>
              <div className="img-home">
                  <img src={require("./../../assets/555.png")} ></img>
              </div>
            
          </Grid>
        </Grid>
      </Box> */}
    </div>
  );
}

export default Home;
