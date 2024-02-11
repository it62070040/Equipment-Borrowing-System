import { Box, Grid } from "@mui/material";
import * as React from "react";
import "../Equipments.css";
import { gql, useMutation } from "@apollo/client";
import mongoose from "mongoose";
import EquipmentsEdit from "../EquipmentsEdit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

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

  useEffect(() => { }, [refetch]);

  const toDelete = async (current) => {
    let currentId = current;
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {value ? (
          <Grid container>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <p className="table-title">Title</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                  <p className="table-title">Amount</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={6}>

                  <p className="table-status">Status</p>

                </Grid>
                <Grid item xs={6}><p className="table-status">Result : {searchResult.length}</p></Grid>
              </Grid>
            </Grid>
          </Grid>

        ) : (
          <h4 style={{ textAlign: "center" }}>ไม่พบข้อมูลที่ค้นหา</h4>
        )}

        {searchResult.map((item, index) => (
          // <div className="eq-item-row-admin">
          //   <Box key={item._id}>
          //     <Grid container>
          //       <Grid item xs={8}>
          //         <Link to={`/equipmentInfo/${item._id}`}>
          //           <Grid container>
          //             <Grid
          //               item
          //               xs={3}
          //               sx={{ display: "flex", justifyContent: "center" }}
          //             >
          //               <img
          //                 style={{
          //                   width: "120px",
          //                   height: "120px",
          //                   objectFit: "cover",
          //                 }}
          //                 className="table-img"
          //                 alt="complex"
          //                 src={item.url_pic}
          //               />
          //             </Grid>
          //             <Grid
          //               item
          //               xs={9}
          //               sx={{
          //                 flexDirection: "column",
          //                 display: "flex",
          //                 justifyContent: "center",
          //               }}
          //             >
          //               <p className="style-name">{item.name}</p>
          //               <p className="style-des">{item.description}</p>
          //             </Grid>
          //           </Grid>
          //         </Link>
          //       </Grid>

          //       <Grid
          //         item
          //         xs={4}
          //         sx={{
          //           flexDirection: "column",
          //           display: "flex",
          //           justifyContent: "center",
          //         }}
          //       >
          //         <Grid container>
          //           <Grid item xs={4} className="style-status">
          //             {item.status === "Available" ? (
          //               <p style={{ color: "#008000" }}>{item.status}</p>
          //             ) : (
          //               <p style={{ color: "#FF0000" }}>{item.status}</p>
          //             )}
          //           </Grid>
          //           <Grid item xs={8} className="style-btn">
          //             <Link to={`/equipment-edit/${item._id}`}>
          //               <button className="btn-edit" key={index}>
          //                 Edit
          //               </button>
          //             </Link>
          //             <button
          //               className="btn-del"
          //               onClick={() => toDelete(item._id)}
          //             >
          //               Delete
          //             </button>
          //           </Grid>
          //         </Grid>
          //       </Grid>
          //     </Grid>
          //   </Box>
          // </div>

          <Link to={`/equipmentInfo/${item._id}`}>
            <div className="eq-item-row-con" key={item._id}>
              <div className="eq-item-row">
                <ul className="table-item-row-admin">
                  <li className="table-item-img">
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                      src={item.url_pic}
                      alt="Logo"
                    />
                    <div className="table-item-title">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                  <li className="table-item">{item.amount}</li>
                  <li
                    className="table-item"
                    style={
                      item.status === "Available"
                        ? { color: "green" }
                        : { color: "gray" }
                    }
                  >
                    {item.status}
                  </li>
                  <li
                    className="style-btn"
                  >
                    <div className="table-item-title">
                      <Link to={`/equipment-edit/${item._id}`}>
                        <button className="btn-edit" key={index}>
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn-del"
                        onClick={() => toDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default CardTable;
