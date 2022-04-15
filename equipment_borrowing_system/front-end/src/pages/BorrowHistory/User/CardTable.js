import { Box, Grid } from "@mui/material";
import * as React from "react";
// import data from './ListData.json';
import "./MiniBar.css";

export default function CardTable({ data }) {
  const returnEquipment = (id) => {
    data[id].status = "wait for check";
    console.log(data[id]);
  };
  const cancel = (id) => {
    data[id].status = "cancel";
    console.log(data[id]);
  };
  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <p className="table-title">Title</p>
              </Grid>
              <Grid item xs={3}>
                <p className="table-title">Borrow date</p>
              </Grid>
              <Grid item xs={3}>
                <p className="table-title">Borrow date</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={4}>
                <p className="table-status">Status</p>
              </Grid>
              <Grid item xs={8}></Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* list equipment */}
        {data?.map((item, index) => (
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              height: "145px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <Grid container>
              <Grid item xs={8}>
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <img className="table-img" alt="complex" src={item.url} />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p className="style-name">{item.name}</p>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p className="style-name">{item.borrow}</p>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p className="style-name">{item.return}</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid container>
                  <Grid item xs={4} className="style-status-bor">
                    {item.status === "success" ? (
                      <p style={{ color: "#008000" }}>{item.status}</p>
                    ) : item.status === "cancel" ? (
                      <p style={{ color: "#FF0000" }}>{item.status}</p>
                    ) : (
                      <p style={{ color: "#2196F3" }}>{item.status}</p>
                    )}
                  </Grid>
                  <Grid item xs={8} className="style-btn-bor">
                    {item.status === "wait for approve" ? (
                      <button
                        className="btn-del-bor"
                        onClick={(e) => cancel(e.target.value)}
                        value={index}
                      >
                        cancel
                      </button>
                    ) : item.status === "Borrow" ? (
                      <button
                        className="btn-return"
                        onClick={(e) => returnEquipment(e.target.value)}
                        value={index}
                      >
                        return equipment
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </div>
  );
}
