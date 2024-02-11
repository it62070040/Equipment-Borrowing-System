import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Equipments.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
// import data from "../Admin/components/ListData.json";
import EquipmentTable from "./components/EquipmentTable";
import { Container, Skeleton } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const EQUIPMENTS_QUERY = gql`
query {
  equipments {
    _id
    name
    description
    amount
   	category
    url_pic
    status
    why_unavailable
  }
}
`
const CATEGORY_QUERY = gql`
  query {
    categorys {
      category
    }
  }
`;



function Equipments() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [category, setqueryCategory] = useState([]);
  const [click, setClick] = useState(false);
  const [pickCateArr, setPickCateArr] = useState([]);
  const {loading: loadingE, data: dataE, refetch: refetchE} = useQuery(EQUIPMENTS_QUERY)
  const {loading: loadingC , data: dataC, refetch: refetchC} = useQuery(CATEGORY_QUERY);
  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClick(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    refetchE()
    if(loadingE === false && dataE){
      setSearchResult(dataE.equipments);
      if (loadingC === false && dataC) {
        let arr =[]
        dataC.categorys.map((cate,i) => (
          arr.push(Object.values(cate).slice(1))
        ))
        setqueryCategory([...arr]);
        // console.log(arr);
      }
    }
  }, [loadingE, dataE, refetchE, refetchC])

  if (loadingE) {
    return (
    <Container >
      <Skeleton height={100}/>
      <Skeleton height={200}/>
    </Container>
    );
  }



  const dropdownClick = (e) => {
    e.stopPropagation()
    setClick(!click)
  };
  // const category = ["Arduino", "Electronics", "Tools", "Recreations", "Furnitures"];

  const chooseCateClick = (cate) => {
    const updateArr = [...pickCateArr];
    const cateIndex = pickCateArr.findIndex((e) => e === cate);
    if (cateIndex >= 0) {
      updateArr.splice(cateIndex, 1);
    } else {
      updateArr.push(cate);
    }
    setPickCateArr(updateArr);
  };
  const checkoutCate = (category) => {
    const updateArr = [...pickCateArr];
    const cateIndex = pickCateArr.findIndex((e) => e === category);
    updateArr.splice(cateIndex, 1);
    setPickCateArr(updateArr);
  };

  const searchItem = () => {
    let result;
    const lowerCase = searchInput.toLowerCase();
    if (pickCateArr.length === 0) {
      result = dataE.equipments.filter((e) => e.name.toLowerCase().includes(lowerCase));
    } else {
      result = dataE.equipments.filter(
        (e) =>
          pickCateArr.some((r) => e.category.includes(r)) &&
          e.name.toLowerCase().includes(lowerCase)
      );
    }

    setSearchResult(result);
    // console.log(result);
  };

  return (
    <div className="equipments">
      <div className="eq-container">
        <div className="eq-header">
          Equipments
        </div>
        <div className="eq-body">
          <Box className="eq-body-container">
            <div className="searchEq-container">
              <div className="searchEq">
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
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <h3>Equipment Category</h3>
              <div ref={wrapperRef}>
                <div className="search-category-border" >
                  <div className="picked-cate">
                    {pickCateArr.map((pick, i) => (
                      <button
                        style={{ marginRight: 5 }}
                        key={i}
                        className="btn-cate"
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
                  <div className="choose-category" style={{ textAlign: "right" }} onClick={dropdownClick}>
                    <i
                      style={{
                        paddingTop: 11,
                        paddingRight: 10,
                        fontSize: "22px",
                      }}
                      className={click ? "fas fa-times" : "fas fa-caret-down"}
                      
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
              </div>
              <div className="btn-search-container">
                <button className="btn-search" onClick={() => searchItem()}>
                  Search
                </button>
              </div>
            </div>
              </div>
              

            <div className="eq-item-container">
              <EquipmentTable searchResult={searchResult} refetch={refetchE}/>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Equipments;
