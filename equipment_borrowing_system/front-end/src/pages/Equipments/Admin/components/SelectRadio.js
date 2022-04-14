import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { TextField, Grid } from "@mui/material";

export default function SelectRadio() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl
    fullWidth
    >
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        
      >
        <Grid container>
          <Grid item>
            <FormControlLabel
              value="available"
              control={<Radio />}
              label="available"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} sx={{alignSelf: 'center'}}>
            <FormControlLabel
              value="not available"
              control={<Radio />}
              label="not available because"
            />
          </Grid>
          <Grid item xs={9}>
          <TextField
                id="reason"
                label="optional"
                fullWidth
                margin="normal"
              />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
