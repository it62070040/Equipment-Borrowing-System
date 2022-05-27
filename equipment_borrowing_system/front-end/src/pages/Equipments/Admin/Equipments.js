import React from "react";
import "./Equipments.css";
import { Link } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import { Box, Button, Stack, IconButton, Icon } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Equipments() {
  return (
    <div className="equipments">
      <div className="equipments-container">
        <h1 className="Header-title">
          Equipments
          <Stack>
          <Link to={`/equipment-create`}>
            <label htmlFor="icon-button-add">
              <IconButton>
                <AddCircleIcon sx={{ color: "black", fontSize: "50px" }} />
              </IconButton>
            </label>
            </Link>
          </Stack>
        </h1>


        <Box
          className="search-bar"
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 5,
          }}
        >
          <SearchBar />
        </Box>
      </div>
    </div>
  );
}

export default Equipments;
