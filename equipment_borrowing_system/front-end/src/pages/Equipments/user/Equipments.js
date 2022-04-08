import React, { useState, useEffect, useCallback } from "react";
import "./Equipments.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import BasicTable from "./components/table";
import { display } from "@mui/system";

function Equipments() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [pickCateArr, setPickCateArr] = useState(["All","Dog", "Cat", "Bat"]);
  const [chooseCate, setChooseCate] = useState(false);
  const handleClick = () => setClick(!click);

  const checkoutCate = (category) => {
    // setChooseCate(!chooseCate);
    const updateArr = [...pickCateArr]
    const cateIndex = pickCateArr.findIndex((e) => e === category)
    updateArr.splice(cateIndex, 1)
    console.log(updateArr);
    console.log(cateIndex);
    setPickCateArr(updateArr)
  };

  

  return (
    <div className="equipments">
      <div className="eq-container">

        <div className="eq-header">
          Equipments
          <Link to="/equipments">Admin Site</Link>
        </div>
        <div className="eq-body">
          <Box className="eq-body-container">
            <div className="searchEq-container">
              <h3 style={{ textAlign: "center" }}>Search Equipments</h3>
              <div className="search-border">
                <i
                  className="fas fa-search"
                  style={{
                    paddingTop: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "#000",
                  }}
                />
                <input
                  className="search-input"
                  placeholder="Equipment name..."
                />
              </div>
              <h3>Equipment Category</h3>
              <div className="search-category-border">
                <div className="picked-cate">
                  {pickCateArr.map((pick, i) => (
                    <button
                      style={{ marginRight: 5 }}
                      key={i}
                      className="btn-cate"
                      // onClick={onClick}
                      // type={type}
                    >
                      {pick}
                      <i
                        style={{ paddingLeft: 10, zIndex: 2, fontSize: "18px" }}
                        className="fas fa-times"
                        onClick={() => checkoutCate(pick)}
                      />
                    </button>
                  ))}
                </div>
                <div className="choose-category" style={{ textAlign: "right" }}>
                  <i
                    style={{ paddingTop: 11, paddingRight: 10, fontSize: "22px" }}
                    className={click ? "fas fa-times" : "fas fa-caret-down"}
                    onClick={handleClick}
                  />
                </div>
              </div>
              <div className={ click ? "dropdown-container": { display: "hidden"}} >
        
        </div>
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
