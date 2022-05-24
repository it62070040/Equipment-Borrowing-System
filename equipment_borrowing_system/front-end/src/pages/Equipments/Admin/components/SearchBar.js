import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
//test mock data for search
import dataTest from "./ListData.json";
import CardTable from "./CardTable";
import { Box, Grid } from "@mui/material";
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
`;
const SearchBar = () => {
  const [inputText, setInputText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [value, setValue] = React.useState(true);
  const { loading, error, data, refetch } = useQuery(EQUIPMENTS_QUERY);

  useEffect(() => {
    if (loading === false && data) {
      setSearchResult(data.equipments);
    }
  }, [loading, data]);

  if (loading) {
    return <h4>Loading...</h4>;
  }
  if (error) {
    return <h4> Error: {error.message}</h4>;
  }

  const searchItem = () => {
    let result;
    const lowerCase = inputText.toLowerCase();
      result = data.equipments.filter(
        (e) =>
          e.name.toLowerCase().includes(lowerCase)
      );
      if(result.length === 0){
        setSearchResult(result)
        setValue(false)
      }
      else{
        setSearchResult(result);
        setValue(true)
      }
    }

  return (
    <>
        <Grid container>
          <Grid item xs={10} sx={{ alignSelf: "center", textAlign: "-webkit-center"}}>
            <Paper
              className="searchBar-search"
              component="form"
              sx={{ p: "2px 4px", ml:5, display: "flex", width: "90%"}}
            >
              <SearchIcon sx={{ m: 1 }} />
              <InputBase
                sx={{ ml: 1, flex: 1}}
                placeholder="Search equipment name"
                onChange={(e) => setInputText(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <button className="btn-search" onClick={searchItem} >Search</button>
          </Grid>
        </Grid>
      <Box
        className="table"
        sx={{
          p: 1,
          mt: 4,
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: "100%"
        }}
      >
        <CardTable searchResult={searchResult} value={value} />
        {/* {data.equipments.map((eq) => (
          <div key={eq._id}>
            <p>{eq.name}</p>
          </div>
        ))} */}
      </Box>
    </>
  );
};
export default SearchBar;
