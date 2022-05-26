import React, { useState, useCallback } from "react";
import "./EquipmentInfoCard.css";
import { containerClasses, IconButton} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useApp } from '../../../../../context/AppContext'

import { gql, useMutation } from "@apollo/client";

const ORDER_MUTATION = gql`
mutation ($record: CreateOneOrderInput! ){
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

function EquipmentInfoCard({equipment, refetch }) {
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
    console.log("click");
        // console.log({ borrowDate, returnDate, order_amount})
        try {
            await createOrderMutation({ variables: {
                record: {
                  userId,
                  equipmentId: equipment._id,
                  borrowDate,
                  returnDate,
                  order_amount
                },
            }
          })
          console.log("Make Borrow!!");
          handleUpdateEquipment(order_amount, equipment.amount)
            setBorrowDate(null)
            setReturnDate(null)
            // setUserI('')
            setAmount(1)
            refetch()
            // refetch({ postLimit: 10 })
        } catch (err) {
            console.error(err)
        }
        
    },[userId, borrowDate, returnDate, order_amount, createOrderMutation, refetch]
  )
    const handleUpdateEquipment = async (orderAmount, equipmentAmount) => {
      const amountUpdate = equipmentAmount-orderAmount
      if(amountUpdate >= 0) {
      
      // console.log("updateAmount: "+ amountUpdate);
      try {
        await updateEquipmentAmount({
          variables: {
            id: equipment._id,
            record: {
              amount: amountUpdate,
            },
          },
        });
        refetch()
      } catch (err) {
        console.error(err.message);
      }
    }
    else {
      // Alert
      console.log("Out of order!!");
      try {
        await updateEquipmentAmount({
          variables: {
            id: equipment._id,
            record: {
              status: "Unavailable"
            },
          },
        });
        refetch()
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
            
            { equipment.amount <= 0 ? 
            <div className="outOrder-container">
              <h3>ขออภัย ขณะนี้ของหมด</h3> 
            </div>

            :
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
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentInfoCard;
