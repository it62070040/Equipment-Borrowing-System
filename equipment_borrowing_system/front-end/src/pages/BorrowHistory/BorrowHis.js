import React from "react";
import "./BorrowHis.css";
import { Box } from "@mui/material";
import MiniBarUser from "./User/MiniBar";
import MiniBarAdmin from "./Admin/MiniBar";

function BorrowHis() {
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
          {/* <MiniBarUser /> */}
          <MiniBarAdmin />
        </Box>
        {/* <Box className="table" sx={{p: 1, mx:5, mt:4, backgroundColor: '#fff', borderRadius: '10px'}}>
          <CardTable />
        </Box> */}
      </div>
    </div>
  );
}

export default BorrowHis;
