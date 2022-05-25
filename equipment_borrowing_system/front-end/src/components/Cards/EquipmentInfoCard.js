import React, { useState, useCallback } from "react";
import "./EquipmentInfoCard.css";
import logo from "../../assets/EQ-logo.png";
import { Box, Grid, TextField, IconButton, Stack, FormControlLabel,FormControl, Radio, RadioGroup} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { gql, useMutation } from "@apollo/client";

const ORDER_MUTATION = gql`
mutation ($record: CreateOneOrderInput! ){
  createOrder(record: $record) {
    recordId
    }
}
`;

function EquipmentInfoCard({equipment}) {
  // console.log(equipment);
  const [userId, setUserId] = useState("628c1db2c93e67fb5955755d");
  const [equipmentId, setEquipmentId] = useState("628c1db3c93e67fb59557565");
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [order_amount, setAmount] = useState(1);
  const [createOrderMutation] = useMutation(ORDER_MUTATION);

  const onClickBorrow = async (e) => {
    e.preventDefault();
    console.log("click");
        console.log({ borrowDate, returnDate, order_amount})
        try {
            await createOrderMutation({ variables: {
                record: {
                  userId,
                  equipmentId,
                  borrowDate,
                  returnDate,
                  order_amount
                },
            }
          })
          console.log("Make Borrow!!");
            setBorrowDate('')
            setReturnDate('')
            // setUserI('')
            setAmount(1)
            // refetch({ postLimit: 10 })
        } catch (err) {
            console.error(err)
        }
    }
    // [borrowDate, returnDate, amount],

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
            <span>ช่องทางรับอุปกรณ์ : คณะเทคโนโลยีสารสนเทศ</span>
            <span>จำนวนของที่มี : {equipment.amount} ชิ้น</span>
            <div className="picker-container">
              <div className="label-picker">
                <span>Borrow Date :</span>
                <span>Return Date :</span>
                <span>Amount :</span>
              </div>

              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Custom input"
                    value={borrowDate}
                    onChange={(newValue) => {
                      setBorrowDate(newValue);
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Custom input"
                    value={returnDate}
                    onChange={(newValue) => {
                      setReturnDate(newValue);
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
                    // onChange={(e) => setAmount(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentInfoCard;
