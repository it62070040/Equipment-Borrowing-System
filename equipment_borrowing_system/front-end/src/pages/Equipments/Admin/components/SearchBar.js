import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
//test mock data for search
import data from "./ListData.json";
import CardTable from "./CardTable";
import { Box } from "@mui/material";

export default function SearchBar() {
  const [inputText, setInputText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  // convert input to lower case
  const inputHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    }
  };

  React.useEffect(() => {
    const result = data.filter((e) => e.name.toLowerCase().includes(inputText));
    setSearchResult(result);
  }, [inputText]);

  //result from search
  console.log(searchResult);

  return (
    <>
    <Paper
        className="searchBar-search"
        component="form"
        sx={{ p: "2px 4px", display: 'flex', width: '60%'}}
      >
        <SearchIcon sx={{ m: 1 }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search equipment name"
          onKeyDown={inputHandler}
        />
         
      </Paper>
      
      
      {/* วิธีเอาตัวแปรมาใช้
      <div>
        {searchResult.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div> */}
      <Box
        className="table"
        sx={{
          p: 1,
          
          mt: 4,
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: '100%'
        }}
      >
       <CardTable searchResult={searchResult} />
      </Box>
      
    </>
  );
}
