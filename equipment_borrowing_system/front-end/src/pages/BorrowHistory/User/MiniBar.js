import * as React from "react";
import { Box, Grid, Button } from "@mui/material";
import "./MiniBar.css";
import CardTable from "./CardTable";
import dataBor from './ListData.json';
import dataRe from './ListData2.json';
import dataCan from './ListData3.json';

export default function MiniBar() {
  const [click, setClick] = React.useState("1");
  const [data, setData] = React.useState(dataBor);
  const handleClick = (value) => {
    setClick(value);
    if( value === '1'){
      setData(dataBor)
    }else if( value === '2' ) {
      setData(dataRe)
    }else if( value === '3' ) {
      setData(dataCan)
    }
  };
  return (
    <div style={{ width: '100%' }}>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <Button
              variant="text"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textTransform: 'none',
                color: click === "1" ? "#2196F3" : "#000",
                textDecoration: click === "1" ? 'underline' : "none",
                textUnderlineOffset: '2px',
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="1"
            >
              Borrow
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="text"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textTransform: 'none',
                color: click === "2" ? "#2196F3" : "#000",
                textDecoration: click === "2" ? 'underline' : "none",
                textUnderlineOffset: '2px',
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="2"
            >
              Return
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="text"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textTransform: 'none',
                color: click === "3" ? "#2196F3" : "#000",
                textDecoration: click === "3" ? 'underline' : "none",
                textUnderlineOffset: '2px',
              }}
              onClick={(e) => handleClick(e.target.value)}
              value="3"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Box
          className="table"
          sx={{
            p: 1,

            mt: 4,
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <CardTable data={data} />
        </Box>
      </Box>
    </div>
  );
}
