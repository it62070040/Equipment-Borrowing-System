import React from "react";
import "./Equipments.css";

import SearchBar from "./components/SearchBar";
import { Box, Button, Stack, IconButton, Icon } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Equipments() {

  // add equipement but wait to research and DB
  const toAdd = () => {
    window.location = `/equipment-create`;
    console.log("add");
  };
  return (
    <div className="equipments">
      <div className="equipments-container">
        <h1 className="Header-title">Equipments
        <Stack>
          <label htmlFor="icon-button-add" onClick={() => toAdd()}>
            <IconButton>
              <AddCircleIcon sx={{ color: "black", fontSize: "50px" }} />
            </IconButton>
          </label>
        </Stack></h1>
        <Box
          className="search-bar"
          sx={{
            width: "100%",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            px: 5,
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
