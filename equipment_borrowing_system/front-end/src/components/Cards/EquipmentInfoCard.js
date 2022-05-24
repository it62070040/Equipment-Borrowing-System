import React, { useState } from "react";
import "./EquipmentInfoCard.css";
import logo from "../../assets/EQ-logo.png";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function EquipmentInfoCard({equipment}) {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [amount, setAmount] = useState(null);

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
                  <input
                    className="amount-input"
                    type="number"
                    placeholder="Number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="btn-borrow-container">
              <button
                className="btn-borrow"
                // onClick={onClick}
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
