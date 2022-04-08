import { Box, Button, Grid } from "@mui/material";
import * as React from "react";

export default function CardTable({ searchResult }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <p className="table-title">Title</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={3}>
                <p className="table-status">Status</p>
              </Grid>
              <Grid item xs={9}></Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* list equipment */}{" "}
        {searchResult?.map((item) => (
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              height: "145px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <Grid container>
              <Grid item xs={8}>
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <img className="table-img" alt="complex" src={item.url} />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p className="style-name">{item.name}</p>
                    <p className="style-des">{item.description}</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid container>
                  <Grid item xs={4}>
                    {item.status === "availble" ? (
                      <p className="style-status" style={{ color: "#008000" }}>
                        {item.status}
                      </p>
                    ) : (
                      <p className="style-status" style={{ color: "#FF0000" }}>
                        {item.status}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={8} sx={{ backgroundColor: "pink" }}>
                    <p className="style-btn">test</p>
                    <Button variant="contained" sx={{backgroundColor: "#FF0000", textTransform: 'lowercase'}}>
                      delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
}
