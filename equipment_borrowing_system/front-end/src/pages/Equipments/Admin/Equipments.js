import React from "react";
import "./Equipments.css";

import SearchBar from "./components/SearchBar";
import { Box } from "@mui/material";

function Equipments() {
  return (
    <div className="equipments">
      <div className="equipments-container">
        <h1 className="Header-title">Equipments</h1>
        <Box
          className="search-bar"
          sx={{
            width: "100%",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            px: 5
          }}
        >
          <SearchBar />
        </Box>
        {/* <Box className="table" sx={{p: 1, mx:5, mt:4, backgroundColor: '#fff', borderRadius: '10px'}}>
          <CardTable />
        </Box> */}
      </div>
    </div>
  );
}

export default Equipments;
