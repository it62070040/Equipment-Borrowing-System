import { Box, Grid } from "@mui/material";
import * as React from "react";
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
  console.log(data);
  const Swal = require("sweetalert2");
  const [updateOrderId] = useMutation(ORDER_MUTATION);
  const approved = async (id) => {
    const item = data[id];
    console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              borrowstatus: "Approved",
              returnstatus: "Borrowing"
          }
        },
      });
      Swal.fire({
        icon: "success",
        title: `Approve Borrow Request Success`,
        showConfirmButton: false,
        // timer: 3000
      });
      refetch()
    } catch (err) {
      console.error(err.message);
    }
  };

  const unApproved = async (id) => {
    const item = data[id];
    console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              borrowstatus: "Unapproved",
          }
        },
      });
      Swal.fire({
        icon: "success",
        title: `Unapprove Borrow Request Success`,
        showConfirmButton: false,
        // timer: 3000
      });
      refetch()
    } catch (err) {
      console.error(err.message);
    }
  };

  const success = async (id) => {
    const item = data[id];
    console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              returnstatus: "Success",
          }
        },
      });
      Swal.fire({
        icon: "success",
        title: `Approve Return Request Success`,
        showConfirmButton: false,
        // timer: 3000
      });
      refetch()
    } catch (err) {
      console.error(err.message);
    }
  };

  const fail = async (id) => {
    const item = data[id];
    console.log(item._id);
    try {
      await updateOrderId({
        variables: {
          id: item._id,
          record: {
              returnstatus: "Fail",
          }
        },
      });
      Swal.fire({
        icon: "success",
        title: `Unapprove Return Request Success`,
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
                    <img className="table-img" alt="complex" src={item.equipment.url_pic} />
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
                    <p className="style-name">{item.equipment.name}</p>
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
                    <p className="style-name">{item.user.studentId}</p>
                    <p className="style-name">{item.user.fullname}</p>
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
                    <p className="style-name">{Moment(item.borrowDate).format('DD/MM/YYYY')}</p>
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
                    <p className="style-name">{Moment(item.returnDate).format('DD/MM/YYYY')}</p>
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
                    {item.returnstatus === "Success" ? (
                      <p style={{ color: "#008000" }}>{item.returnstatus}</p>
                    ) : item.borrowstatus === "Approved" && item.returnstatus === "Borrowing" ? (
                      <p style={{ color: "#008000" }}>{item.borrowstatus}</p>
                    ) : item.borrowstatus === "Unapproved" ? (
                      <p style={{ color: "#FF0000" }}>{item.borrowstatus}</p>
                    ) : item.returnstatus === "Fail" ? (
                      <p style={{ color: "#FF0000" }}>{item.returnstatus}</p>
                    ) : (
                      <p style={{ color: "#2196F3" }}>{item.returnstatus}</p>
                    )}
                  </Grid>
                  <Grid item xs={8} className="style-btn-bor">
                    <Grid>
                      {item.borrowstatus === "Pending" ? (
                        <button
                          className="btn-return"
                          style={{ backgroundColor: "#2196F3" }}
                          onClick={(e) => approved(e.target.value)}
                          value={index}
                        >
                          Approve
                        </button>
                      ) : item.returnstatus === "Pending" ? (
                        <button
                          className="btn-return"
                          onClick={(e) => success(e.target.value)}
                          value={index}
                        >
                          Success
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                    <Grid>
                      {item.borrowstatus === "Pending" ? (
                        <button
                          className="btn-del-bor"
                          onClick={(e) => unApproved(e.target.value)}
                          value={index}
                        >
                          Unapprove
                        </button>
                      ) : item.returnstatus === "Pending" ? (
                        <button
                          className="btn-del-bor"
                          onClick={(e) => fail(e.target.value)}
                          value={index}
                        >
                          Fail
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
