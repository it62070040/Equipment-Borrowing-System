import React, { useCallback, useState } from "react";
import { Box, Grid, TextField, IconButton, Stack } from "@mui/material";
import SelectRadio from "./components/SelectRadio";
import SelectMenuItem from "./components/SelectMenuItem";
import UploadImage from "./components/UploadImage";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { gql, useMutation } from "@apollo/client";

const EQUIPMENT_MUTATION = gql`
  mutation ($_id: MongoID!) {
    createEquipment(record: $record) {
      recordId
    }
  }
`;
const currencies = [
  {
    value: "อุปกรณ์อิเล็กทรอนิค",
    label: "อุปกรณ์อิเล็กทรอนิค",
  },
  {
    value: "อุปกรณ์ทำ Arduino",
    label: "อุปกรณ์ทำ Arduino",
  },
  {
    value: "อุปกรณ์เครื่องใช้ทั่วไป",
    label: "อุปกรณ์เครื่องใช้ทั่วไป",
  },
  {
    value: "อุปกรณ์สันทนาการ",
    label: "อุปกรณ์สันทนาการ",
  },
];
const EquipmentsCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("อุปกรณ์อิเล็กทรอนิค");
  const [url_pic, setUrl_pic] = useState("");
  const [status, setStatus] = useState("");
  const [why_unavailable, setWhy_unavailable] = useState("");
  const [amount, setAmount] = useState(1);

  const [createEquipmentMutation] = useMutation(EQUIPMENT_MUTATION);

  const handleCreateEquipments = async (e) => {
    e.preventDefault();
    console.log("click");
    try {
      await createEquipmentMutation({
        variables: {
          record: {
            name,
            description,
            category,
            url_pic,
            status,
            why_unavailable,
            amount,
          },
        },
      });
      console.log(
        name,
        description,
        category,
        url_pic,
        status,
        why_unavailable,
        amount
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const toAdd = () => {
    console.log("add");
    setAmount(amount + 1)
  };
  const toDel = () => {
    console.log("del");
    if(amount <= 0) {
      setAmount(0)
    }
    else{
      setAmount(amount - 1)
    }
    
  };

  return (
    <div className="equipments">
      <div className="equipments-container">
        <h1 className="Header-title">Create Equipments</h1>
        {/* <form></form> */}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Amount :
            </Grid>
            <Grid item xs={10}>
              {/* <TextField
                required
                id="outlined-required"
                fullWidth
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              /> */}
            {amount}
              <Stack>
                <label htmlFor="icon-button-add" onClick={toAdd}>
                  <IconButton>
                    <AddCircleOutlineIcon sx={{ color: "black", fontSize: "50px" }} />
                  </IconButton>
                </label>
              </Stack>
              <Stack>
                <label htmlFor="icon-button-add" onClick={toDel}>
                  <IconButton>
                    <RemoveCircleOutlineIcon sx={{ color: "black", fontSize: "50px" }}/>
                  </IconButton>
                </label>
              </Stack>
              
              
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Status :
            </Grid>
            <Grid item xs={10}>
              {/* <SelectRadio /> */}
              <FormControl fullWidth>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
                    <Grid item xs={3} sx={{ alignSelf: "center" }}>
                      <FormControlLabel
                        value="unavailable"
                        control={<Radio />}
                        label="unavailable"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        id="reason"
                        label="optional"
                        fullWidth
                        margin="normal"
                        value={why_unavailable}
                        onChange={(e) => setWhy_unavailable(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Category :
            </Grid>
            <Grid item xs={10}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Picture :
            </Grid>
            <Grid item xs={10}>
              {/* <UploadImage /> */}
              <TextField
                required
                id="outlined-number"
                type="string"
                fullWidth
                margin="normal"
                value={url_pic}
                onChange={(e) => setUrl_pic(e.target.value)}
              />
            </Grid>
          </Grid>
          <div className="button-submit" style={{ textAlign: "center" }}>
            <button className="btn-submit" onClick={handleCreateEquipments}>
              Submit
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default EquipmentsCreate;
