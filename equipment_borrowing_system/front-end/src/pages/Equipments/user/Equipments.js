import React, { useState, useEffect, useCallback } from "react";
import "./Equipments.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import BasicTable from "./components/table";

function Equipments() {
  const [click, setClick] = useState(false);
  const [pickCateArr, setPickCateArr] = useState(["All"]);

  const dropdownClick = () => setClick(!click);
  const category = ["All", "Arduinos", "อื่น ๆ", "Games", "Dog", "Cat", "Fish"];

  const chooseCateClick = (cate) => {
    const updateArr = [...pickCateArr];
    const cateIndex = pickCateArr.findIndex((e) => e === cate);
    if (cateIndex >= 0) {
      updateArr.splice(cateIndex, 1);
    } else {
      updateArr.push(cate);
    }
    setPickCateArr(updateArr);
    console.log(cate);
  };
  const checkoutCate = (category) => {
    const updateArr = [...pickCateArr];
    const cateIndex = pickCateArr.findIndex((e) => e === category);
    updateArr.splice(cateIndex, 1);
    console.log(updateArr);
    console.log(cateIndex);
    setPickCateArr(updateArr);
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
                    style={{
                      paddingTop: 11,
                      paddingRight: 10,
                      fontSize: "22px",
                    }}
                    className={click ? "fas fa-times" : "fas fa-caret-down"}
                    onClick={dropdownClick}
                  />
                </div>
              </div>

              {click ? (
                <div className="dropdown-container">
                  <ul
                    className={click ? "category-list" : { display: "hidden" }}
                  >
                    {category.map((cate, i) => (
                      <li
                        key={i}
                        className="category-row"
                        onClick={() => chooseCateClick(cate)}
                      >
                        <i
                          style={{
                            paddingRight: 10,
                            fontSize: "22px",
                          }}
                          className={
                            pickCateArr.findIndex((e) => e === cate) >= 0
                              ? "fas fa-check-square"
                              : "fas fa-square"
                          }
                        />
                        {cate}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="btn-search-container">
                <button
                  className="btn-search"
                  // onClick={onClick}
                  // type={type}
                >
                  Search
                </button>         
              </div>
              
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
