import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import "./MiniBar.css";
import Moment from "moment";
import { Link } from "react-router-dom";
import { useApp } from "../../../context/AppContext";


export default function CardTable({ data }) {
  const { user } = useApp();

  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Grid container>
          <Grid item xs={10}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <p className="table-title">Title</p>
              </Grid>
              <Grid item xs={2}>
                <p className="table-title">User</p>
              </Grid>
              <Grid item xs={2} className="style-status-bor">
                <p className="table-title">Borrow date</p>
              </Grid>
              <Grid item xs={2} className="style-status-bor">
                <p className="table-title">Return date</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={12} className="style-status-bor">
                <p className="table-status">Status</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* list equipment */}
        {data?.map((item, index) => (
          <Link to={ user?.role === "user" ? `/borrow-history-user` : user?.role === "" ? `/` : `/borrow-history`}>
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
                  <Grid item xs={10}>
                    <Grid container>
                      <Grid
                        item
                        xs={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          className="table-img"
                          alt="complex"
                          src={item.equipment.url_pic}
                        />
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
                        <p className="style-name">{item.equipment.name}</p>
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
                        <p className="style-name">{item.user.studentId}</p>
                        <p className="style-name">{item.user.fullname}</p>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        className="style-status-bor"
                        sx={{
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <p className="style-name">
                          {Moment(item.borrowDate).format("DD/MM/YYYY")}
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        className="style-status-bor"
                        sx={{
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <p className="style-name">
                          {Moment(item.returnDate).format("DD/MM/YYYY")}
                        </p>
                      </Grid>
                    </Grid>
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
                    <Grid container>
                      <Grid item xs={12} className="style-status-bor">
                        {item.returnstatus === "Success" ? (
                          <p style={{ color: "#008000" }}>
                            {item.returnstatus}
                          </p>
                        ) : item.borrowstatus === "Approved" &&
                          item.returnstatus === "Borrowing" ? (
                          <p style={{ color: "#008000" }}>
                            {item.borrowstatus}
                          </p>
                        ) : item.borrowstatus === "Unapproved" ? (
                          <p style={{ color: "#FF0000" }}>
                            {item.borrowstatus}
                          </p>
                        ) : item.returnstatus === "Fail" ? (
                          <p style={{ color: "#FF0000" }}>
                            {item.returnstatus}
                          </p>
                        ) : item.borrowstatus === "Pending" ? (
                          <p style={{ color: "#2196F3" }}>{item.borrowstatus}</p>
                        ) : (
                          <p style={{ color: "#2196F3" }}>
                            {item.returnstatus}
                          </p>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
           </Link>
        ))}
      </Box>
    </div>
  );
}
