import { Box, Grid } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
// import data from './ListData.json';
import "./MiniBar.css";
import Moment from 'moment';
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const ORDER_MUTATION = gql`
  mutation ($id: MongoID!, $record: UpdateByIdOrderInput!) {
    updateOrderId(_id: $id, record: $record) {
      recordId
    }
  }
`;


export default function CardTable({ data, refetch }) {
  const Swal = require("sweetalert2");
  const [updateOrderId] = useMutation(ORDER_MUTATION);

  const handleReturn = async (id) => {
    const item = data[id];
    //console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              orderstatus: "Return",
              returnstatus: "Pending",
          }
        },
      });
      Swal.fire({
        icon: "success",
        title: `Send Return Request Success`,
        showConfirmButton: false,
        // timer: 3000
      });
      refetch()
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCancel = async (id) => {
    const item = data[id];
    //console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              orderstatus: "Cancel",
              borrowstatus: "",
              returnstatus: "",
          }
        },
      });
      Swal.fire({
        icon: "success",
        title: `Cancel Borrow Request Success`,
        showConfirmButton: false,
        // timer: 3000
      });
      refetch()
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
                <p className="table-status">Return date</p>
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
                    {item.borrowstatus === "Approved" && item.returnstatus === "Borrowing" ? (
                      <p style={{ color: "#008000" }}>
                        {item.returnstatus}
                      </p>
                    ) : item.returnstatus === "Success" ? (
                      <p style={{ color: "#008000" }}>
                        {item.returnstatus}
                      </p>
                    ) : item.borrowstatus === "Unapproved" ? (
                      <p style={{ color: "#FF0000" }}>{item.borrowstatus}</p>
                    ) : item.returnstatus === "Fail" ? (
                      <p style={{ color: "#FF0000" }}>{item.returnstatus}</p>
                    ) : item.orderstatus === "Cancel" ? (
                      <p style={{ color: "#FF0000" }}>{item.orderstatus}</p>
                    ) : item.borrowstatus === "Pending" ? (
                      <p style={{ color: "#2196F3" }}>{item.borrowstatus}</p>
                    ) : (
                      <p style={{ color: "#2196F3" }}>
                        {item.returnstatus}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={8} className="style-btn-bor">
                    {item.borrowstatus === "Pending" &&
                    item.orderstatus === "Borrow" ? (
                      <button
                        className="btn-del-bor"
                        onClick={(e) => handleCancel(e.target.value)}
                        value={index}
                      >
                        Cancel
                      </button>
                    ) : item.orderstatus === "Borrow" &&
                      item.borrowstatus === "Approved" ? (
                      <button
                        className="btn-return"
                        onClick={(e) => handleReturn(e.target.value)}
                        value={index}
                      >
                        Return Equipment
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
