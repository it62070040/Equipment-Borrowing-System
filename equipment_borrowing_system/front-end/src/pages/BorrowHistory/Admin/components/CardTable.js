import { Box, Grid } from "@mui/material";
import * as React from "react";
// import data from './ListData.json';
import "./MiniBar.css";

export default function CardTable({ data }) {
  const approve = (id) => {
    data[id].status = "approve"
    console.log(data[id]);
    data[id].status = "return equipment"
    console.log(data[id]);
  };
  const notApprove = (id) => {
    data[id].status = "not approve"
    console.log(data[id]);
  };
  const success = (id) => {
    data[id].status = "success"
    console.log(data[id]);
  };
  const fail = (id) => {
    data[id].status = "fail"
    console.log(data[id]);
  };
  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                <p className="table-title">Title</p>
              </Grid>
              <Grid item xs={3}>
                <p className="table-title">User</p>
              </Grid>
              <Grid item xs={2}>
                <p className="table-title">Borrow date</p>
              </Grid>
              <Grid item xs={2}>
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
                    xs={2}
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
                    <p className="style-name">{item.user_id}</p>
                    <p className="style-name">{item.username}</p>
                  </Grid>
                  <Grid
                    item
                    xs={2}
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
                    xs={2}
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
                    ) : item.status === "cancel" ||
                      item.status === "not approve" || item.status === "fail" ? (
                      <p style={{ color: "#FF0000" }}>{item.status}</p>
                    ) : item.status === "approve" ? (
                      <p style={{ color: "#2196F3" }}>{item.status}</p>
                    ) : (
                      <p style={{ color: "#000" }}>{item.status}</p>
                    )}
                  </Grid>
                  <Grid item xs={8} className="style-btn-bor">
                    <Grid>
                      {item.status === "wait for approve" ? (
                        <button
                          className="btn-return"
                          style={{ backgroundColor: "#2196F3" }}
                          onClick={(e) => approve(e.target.value)}
                          value={index}
                        >
                          approve
                        </button>
                      ) : item.status === "return equipment" ? (
                        <button
                          className="btn-return"
                          onClick={(e) => success(e.target.value)}
                          value={index}
                        >
                          success
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                    <Grid>
                      {item.status === "wait for approve" ? (
                        <button
                          className="btn-del-bor"
                          onClick={(e) => notApprove(e.target.value)}
                          value={index}
                        >
                          not approve
                        </button>
                      ) : item.status === "return equipment" ? (
                        <button
                          className="btn-del-bor"
                          onClick={(e) => fail(e.target.value)}
                          value={index}
                        >
                          fail
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
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
