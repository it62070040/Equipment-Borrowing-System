import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import SelectRadio from "./components/SelectRadio";
import SelectMenuItem from "./components/SelectMenuItem";
import UploadImage from "./components/UploadImage";

function EquipmentsCreate() {
  return (
    <div className="equipments">
      <div className="equipments-container">
        <h1 className="Header-title">Create Equipments</h1>
        <Box className="style-form" noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Name :
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                id="outlined-required"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Description :
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                id="outlined-required"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Amount :
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                id="outlined-number"
                type="number"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Status :
            </Grid>
            <Grid item xs={10}>
              <SelectRadio />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Category :
            </Grid>
            <Grid item xs={10}>
              <SelectMenuItem />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Picture :
            </Grid>
            <Grid item xs={10}>
              <UploadImage />
            </Grid>
          </Grid>
          <div className="button-submit" style={{textAlign: 'center'}}>
            <button className="btn-submit">Submit</button>
          </div>
          

          {/* <div>
            <TextField
              required
              id="outlined-required"
              label="Required"
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              fullWidth
              margin="normal"
            />
          </div> */}
        </Box>
      </div>
    </div>
  );
}

export default EquipmentsCreate;
