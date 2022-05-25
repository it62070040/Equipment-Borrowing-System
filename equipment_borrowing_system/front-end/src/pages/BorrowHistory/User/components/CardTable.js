import { Box, Grid } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
// import data from './ListData.json';
import "./MiniBar.css";
import Moment from 'moment';
import { gql, useMutation } from "@apollo/client";

const ORDER_MUTATION = gql`
  mutation ($id: MongoID!, $record: UpdateByIdOrderInput!) {
    updateOrderId(_id: $id, record: $record) {
      recordId
    }
  }
`;


export default function CardTable({ data }) {
  const [updateOrderId] = useMutation(ORDER_MUTATION);

  const handleReturn = async (id) => {
    const item = data[id];
    console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              orderstatus: "return",
              borrowstatus: "",
              returnstatus: "pending",
          }
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCancel = async (id) => {
    const item = data[id];
    console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              orderstatus: "cancel",
              borrowstatus: "",
              returnstatus: "",
          }
        },
      });
    } catch (err) {
      console.error(err.message);
    }
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
                <p className="table-status">Borrow date</p>
              </Grid>
              <Grid item xs={3}>
                <p className="table-status">Borrow date</p>
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
                    <p className="style-name">amount : {item.order_amount}</p>
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
                    <p className="style-status-bor">{Moment(item.borrowDate).format('DD/MM/YYYY')}</p>
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
                    <p className="style-status-bor">{Moment(item.returnDate).format('DD/MM/YYYY')}</p>
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
                    {item.returnstatus === "success" ||
                    item.borrowstatus === "approved" ? (
                      <p style={{ color: "#008000" }}>
                        {item.returnstatus}
                        {item.borrowstatus}
                      </p>
                    ) : item.returnstatus === "fail" ||
                      item.borrowstatus === "unapproved" ? (
                      <p style={{ color: "#FF0000" }}>
                        {item.returnstatus}
                        {item.borrowstatus}
                      </p>
                    ) : item.orderstatus === "cancel" ? (
                      <p style={{ color: "#FF0000" }}>{item.orderstatus}</p>
                    ) : (
                      <p style={{ color: "#2196F3" }}>
                        {item.borrowstatus}
                        {item.returnstatus}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={8} className="style-btn-bor">
                    {item.borrowstatus === "pending" &&
                    item.orderstatus === "borrow" ? (
                      <button
                        className="btn-del-bor"
                        onClick={(e) => handleCancel(e.target.value)}
                        value={index}
                      >
                        cancel
                      </button>
                    ) : item.orderstatus === "borrow" &&
                      item.borrowstatus === "approved" ? (
                      <button
                        className="btn-return"
                        onClick={(e) => handleReturn(e.target.value)}
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
