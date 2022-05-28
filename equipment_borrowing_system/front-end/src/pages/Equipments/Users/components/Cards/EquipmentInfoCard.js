import React, { useState, useCallback } from "react";
import "./EquipmentInfoCard.css";
import { IconButton } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useApp } from "../../../../../context/AppContext";
import Moment from 'moment';
import Swal from "sweetalert2";

import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const ORDER_MUTATION = gql`
  mutation ($record: CreateOneOrderInput!) {
    createOrder(record: $record) {
      recordId
    }
  }
`;

const EQUIPMENTAMOUNT_MUTATION = gql`
  mutation ($id: MongoID!, $record: UpdateByIdEquipmentInput!) {
    updateEquipmentId(_id: $id, record: $record) {
      recordId
    }
  }
`;

function EquipmentInfoCard({ equipment, refetch }) {
  const Swal = require("sweetalert2");
  const { user } = useApp();
  const [userId, setUserId] = useState(user._id);
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [order_amount, setAmount] = useState(1);
  const [createOrderMutation] = useMutation(ORDER_MUTATION);
  const [updateEquipmentAmount] = useMutation(EQUIPMENTAMOUNT_MUTATION);

  const onClickBorrow = useCallback(
    async (e) => {
      e.preventDefault();
      
      try {
        if (borrowDate > returnDate) {
        Swal.fire({
          title: "Borrow date do not less than return date",
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
          reverseButtons: true,
        });
      }
        else {

          await createOrderMutation({
            variables: {
              record: {
                userId,
                equipmentId: equipment._id,
                borrowDate,
                returnDate,
                order_amount,
              },
            },
          });
          console.log("Make Borrow!!");
          Swal.fire({
            icon: "success",
            title: "Create Borrow Request Success",
            showConfirmButton: false,
            // timer: 3000
          });
          handleUpdateEquipment(order_amount, equipment.amount);
          setBorrowDate(null);
          setReturnDate(null);
          // setUserI('')
          setAmount(1);
          refetch();
        }
      
        // refetch({ postLimit: 10 })
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Please fill your Request Information",
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
          reverseButtons: true,
        });
      }
    },
    [userId, borrowDate, returnDate, order_amount, createOrderMutation, refetch]
  );
  const handleUpdateEquipment = async (orderAmount, equipmentAmount) => {
    const amountUpdate = equipmentAmount - orderAmount;
    if (amountUpdate > 0) {
      console.log("updateAmount: "+ amountUpdate);
      try {
        await updateEquipmentAmount({
          variables: {
            id: equipment._id,
            record: {
              amount: amountUpdate,
            },
          },
        });
        refetch();
      } catch (err) {
        console.error(err.message);
      }
    } else if (amountUpdate == 0)  {
      // Alert
      console.log("Out of order!!");
      try {
        await updateEquipmentAmount({
          variables: {
            id: equipment._id,
            record: {
              amount: amountUpdate,
              status: "Unavailable",
            },
          },
        });
        refetch();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const toAdd = () => {
    if (order_amount < equipment.amount) {
      setAmount(order_amount + 1);
    }
    // console.log("add");
  };
  const toDel = () => {
    // console.log("del");
    if (order_amount <= 1) {
      setAmount(1);
    } else {
      setAmount(order_amount - 1);
    }
  };

  const checkBorrowDate = (Bdate) => {
    if(Bdate < Moment()){
      Swal.fire({
        title: "Please fill a correct borrow date",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        reverseButtons: true,
      });
    }
    else {
      setBorrowDate(Bdate)
    }
  }
  const checkReturnDate = (Rdate) => {
    if(Rdate < Moment()){
      Swal.fire({
        title: "Please fill a correct return date",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        reverseButtons: true,
      });
    }
    else {
      setReturnDate(Rdate)
    }
  }

  return (
    <div className="eqInfoCard">
      <div className="eqInfoCard-container">
        <div className="eqInfo-pic">
          <img id="eq-img" src={equipment.url_pic} alt="Logo" />
        </div>
        <div className="eqInfo-text">
          <div className="eqInfo-text-header">
            <h2>{equipment.name}</h2>
            <br />
          </div>

          <div className="eqInfo-text-body">
            <span>Description : {equipment.description}</span>
            <span>Pickup Location : คณะเทคโนโลยีสารสนเทศ</span>
            <span>Amount : {equipment.amount}</span>
            <span>Category : {equipment.category}</span>

            {equipment.amount <= 0 ? (
              <div className="outOrder-container">
                <h3>ขออภัย ขณะนี้ของหมด</h3>
              </div>
            ) : user.role === "admin" ? (
              <div className="btn-borrow-container">
                <Link to={`/equipment-edit/${equipment._id}`}>
                  <button className="btn-borrow">Edit Equipment</button>
                </Link>
              </div>
            ) : (
              <>
                <div className="picker-container">
                  <div className="label-picker">
                    <span>Borrow Date :</span>
                    <span>Return Date :</span>
                    <span>Amount :</span>
                  </div>

                  <div className="date-picker">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                      inputFormat="dd/MM/yyy"
                        label="Custom input"
                        value={borrowDate}
                        onChange={(newValue) => {
                        checkBorrowDate(newValue) }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                          // <Box sx={{ display: "flex", alignItems: "center" }}>
                          <div className="datePicker-border">
                            <input
                              className="datePicker-input"
                              ref={inputRef}
                              {...inputProps}
                            />
                            {InputProps?.endAdornment}
                          </div>

                          // </Box>
                        )}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Custom input"
                        value={returnDate}
                        inputFormat="dd/MM/yyy"
                        onChange={(newValue) => {
                          checkReturnDate(newValue);
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                          // <Box sx={{ display: "flex", alignItems: "center" }}>
                          <div className="datePicker-border">
                            <input
                              className="datePicker-input"
                              ref={inputRef}
                              {...inputProps}
                            />
                            {InputProps?.endAdornment}
                          </div>

                          // </Box>
                        )}
                      />
                    </LocalizationProvider>
                    <div className="datePicker-border">
                      <label htmlFor="icon-button-add" onClick={toDel}>
                        <IconButton>
                          <RemoveCircleOutlineIcon
                            sx={{ color: "black", fontSize: "40px" }}
                          />
                        </IconButton>
                      </label>
                      <input
                        className="amount-input"
                        disabled
                        value={order_amount}
                      />
                      <label htmlFor="icon-button-add" onClick={toAdd}>
                        <IconButton>
                          <AddCircleOutlineIcon
                            sx={{ color: "black", fontSize: "40px" }}
                          />
                        </IconButton>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="btn-borrow-container">
                  <button
                    className="btn-borrow"
                    onClick={onClickBorrow}
                    // type={type}
                  >
                    Borrow
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentInfoCard;
