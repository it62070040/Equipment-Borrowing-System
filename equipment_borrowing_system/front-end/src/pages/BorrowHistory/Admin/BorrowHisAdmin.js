import React from "react";
import "./BorrowHis.css";
import { Box } from "@mui/material";
import MiniBarAdmin from "./components/MiniBar";

function BorrowHisAdmin() {
  return (
    <div className="borrow">
      <div className="borrow-container">
        <h1 className="Header-title-Bor">Order</h1>
        <Box
          className="search-bar"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            px: 5,
          }}
        >
          <MiniBarAdmin />
        </Box>
      </div>
    </div>
  );
}

export default BorrowHisAdmin;
