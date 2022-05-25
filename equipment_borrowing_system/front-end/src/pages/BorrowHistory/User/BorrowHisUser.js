import React from "react";
import "./BorrowHis.css";
import { Box } from "@mui/material";
import MiniBarUser from "./components/MiniBar";

function BorrowHisUser() {
  return (
    <div className="borrow">
      <div className="borrow-container">
        <h1 className="Header-title-Bor">History</h1>
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
          <MiniBarUser />
        </Box>
      </div>
    </div>
  );
}

export default BorrowHisUser;
