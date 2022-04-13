import React, { useState } from "react";
import "./EquipmentInfoCard.css";
import logo from "../../assets/EQ-logo.png";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function EquipmentInfoCard() {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [amount, setAmount] = useState(null);

  return (
    <div className="eqInfoCard">
      <div className="eqInfoCard-container">
        <div className="eqInfo-pic">
          <img src={logo} alt="Logo" />
        </div>
        <div className="eqInfo-text">
          <div className="eqInfo-text-header">
            <h3>Name</h3>
            <br />
          </div>

          <div className="eqInfo-text-body">
            <span>Description :</span>
            <span>ช่องทางรับอุปกรณ์ :</span>
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
                        <input className="datePicker-input" ref={inputRef} {...inputProps} />
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
                        <input className="datePicker-input" ref={inputRef} {...inputProps} />
                        {InputProps?.endAdornment}
                      </div>
                      
                    // </Box>
                  )}
                />
              </LocalizationProvider>
                      <div className="datePicker-border">
                        <input className="amount-input" type="number" placeholder="Number" onChange={(e) => setAmount(e.target.value)}/>
                      </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentInfoCard;
