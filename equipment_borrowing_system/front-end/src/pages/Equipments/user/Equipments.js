import React from "react";
import "./Equipments.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import BasicTable from "./components/table";


function Equipments() {
  return (
    <div className="equipments">
      <div className="eq-container">
        <div className="eq-header">
          Equipments
          <Link to="/equipments">
                Admin Site
              </Link>
        </div>
        <div className="eq-body">
          <Box
            className="eq-body-container"

          >
            <div className="searchEq-container">
              <h2 style={{textAlign: "center"}}>Search Equipments</h2>
              <div className="search-border">
                <i className="fas fa-search" style={{paddingTop: 6, paddingLeft: 10, paddingRight: 10, color: "#000"}} />
                <input
                    className="search-input"
                    placeholder="Equipment name..." 
                />
              </div>
              <h3>Equipment Category</h3>
              <button 
                className="btn-search"
                // onClick={onClick}
                // type={type}
              >
                Search
              </button>
            </div>

            <div className="eq-item-container">
              <BasicTable />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Equipments;
