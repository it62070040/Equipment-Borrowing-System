import { Box, Grid } from "@mui/material";
import * as React from "react";
import "../Equipments.css";
import { gql, useMutation } from "@apollo/client";
import mongoose from "mongoose";
import EquipmentsEdit from "../EquipmentsEdit";
import Swal from "sweetalert2";

const EQUIPMENTS_MUTATION = gql`
  mutation ($id: MongoID!) {
    deleteEquipmentId(_id: $id) {
      recordId
    }
  }
`;
const CardTable = ({ searchResult, value, refetch }) => {
  // CommonJS
  const Swal = require("sweetalert2");
  //mutation
  const [deleteEquipmentId] = useMutation(EQUIPMENTS_MUTATION);

  // find how to get info to edit equipment by id
  const toEdit = (id) => {
    window.location = `/equipment-edit/${id}`;
    // linkId(id);
  };
  // const linkId = (index) => {
  //   const result = searchResult.filter((e) => e.id === index);
  //   GetInfo(result)
  //   console.log(result);
  // };
  // function GetInfo(result) {
  //   return <EquipmentsEdit equipmentsDetail={result} />;
  // };

  const toDelete = async (current) => {
    // const objectId = mongoose.Types.ObjectId(current);
    let currentId = current;
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
           deleteEquipmentId({
            variables: {
              id: currentId,
            },
          }).then(refetch);
        } catch (err) {
          console.error(err.message);
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {value ? (
          <Grid container>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <p className="table-title">Title</p>
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
        ) : (
          <h4 style={{ textAlign: "center" }}>ไม่พบข้อมูลที่ค้นหา</h4>
        )}

        {searchResult.map((item, index) => (
          <Box
            key={item._id}
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
                      src={item.url_pic}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p className="style-name">{item.name}</p>
                    <p className="style-des">{item.description}</p>
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
                  <Grid item xs={4} className="style-status">
                    {item.status === "Available" ? (
                      <p style={{ color: "#008000" }}>{item.status}</p>
                    ) : (
                      <p style={{ color: "#FF0000" }}>{item.status}</p>
                    )}
                  </Grid>
                  <Grid item xs={8} className="style-btn">
                    <button
                      className="btn-edit"
                      onClick={() => toEdit(item._id)}
                      key={index}
                      // type={type}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-del"
                      onClick={() => toDelete(item._id)}
                      // type={type}
                    >
                      Delete
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
};
export default CardTable;
