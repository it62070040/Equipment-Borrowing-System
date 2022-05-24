import React from "react";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Stack,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { gql, useQuery, useMutation  } from "@apollo/client";

const EQUIPMENTS_QUERY = gql`
  query ($id: MongoID!) {
    equipmentId(_id: $id) {
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

const EQUIPMENT_MUTATION = gql`
  mutation ($id: MongoID!, $record: UpdateByIdEquipmentInput!) {
    updateEquipmentId(_id: $id, record: $record) {
      recordId
    }
  }
`;
const currencies = [
  "Arduino",
  "Electronics",
  "Tools",
  "Recreations",
  "Furnitures",
];

function EquipmentsEdit() {
  const pathArray = window.location.pathname.split("/");
  const currentId = pathArray[2];
  const { loading, error, data } = useQuery(EQUIPMENTS_QUERY, {
    variables: { id: currentId },
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("อุปกรณ์อิเล็กทรอนิค");
  const [url_pic, setUrl_pic] = useState("");
  const [status, setStatus] = useState("available");
  const [why_unavailable, setWhy_unavailable] = useState("");
  const [amount, setAmount] = useState(1);

  // validation name
  const [helperTextName, setHelperTextName] = useState("");
  const [errorName, setErrorName] = useState(false);
  // validation description
  const [helperTextDescription, setHelperTextDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);

    //mutation
    const [updateEquipmentId] = useMutation(EQUIPMENT_MUTATION);

  useEffect(() => {
    if (loading === false && data) {
      setName(data.equipmentId.name);
      setDescription(data.equipmentId.description);
      setAmount(data.equipmentId.amount);
      setCategory(data.equipmentId.category);
      setWhy_unavailable(data.equipmentId.why_unavailable);
      setUrl_pic(data.equipmentId.url_pic);
    }
  }, [loading, data]);

  if (loading) {
    return <h4>Loading...</h4>;
  }
  if (error) {
    return <h4> Error: {error.message}</h4>;
  }

  const toAdd = () => {
    console.log("add");
    setAmount(amount + 1);
  };
  const toDel = () => {
    console.log("del");
    if (amount <= 1) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };

  const handleSetName = (e) => {
    if (e.target.value.length <= 0) {
      setName(e.target.value);
      setErrorName(true);
      setHelperTextName("กรุณากรอกชื่ออุปกรณ์");
    } else {
      setName(e.target.value);
      setErrorName(false);
      setHelperTextName("");
    }
  };

  const handleSetDescription = (e) => {
    if (e.target.value.length <= 0) {
      setDescription(e.target.value);
      setErrorDescription(true);
      setHelperTextDescription("กรุณากรอกคำอธิบาย");
    } else {
      setDescription(e.target.value);
      setErrorDescription(false);
      setHelperTextDescription("");
    }
  };

  const handleEditEquipments = async (e) => {
    e.preventDefault();
    console.log("click");
    try {
      await updateEquipmentId({
        variables: {
          id: currentId,
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
    } catch (err) {
      console.error(err.message);
    }
    window.location = `/equipments`;
  };

  return (
    <div className="equipments">
      <div className="equipments-container">
        <h1 className="Header-title">Edit Equipments</h1>

        <Box className="style-form" noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Name :
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Name"
                id="outlined-required"
                fullWidth
                margin="normal"
                helperText={helperTextName}
                error={errorName}
                value={name}
                onChange={handleSetName}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Description :
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Description"
                id="outlined-required"
                fullWidth
                margin="normal"
                helperText={helperTextDescription}
                error={errorDescription}
                value={description}
                onChange={handleSetDescription}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 2 }}>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Amount :
            </Grid>
            <Grid
              item
              xs={10}
              sx={{ alignSelf: "center", textAlign: "center" }}
            >
              <Grid container>
                <Grid item xs={1}>
                  <Stack>
                    <label htmlFor="icon-button-add" onClick={toDel}>
                      <IconButton>
                        <RemoveCircleOutlineIcon
                          sx={{ color: "black", fontSize: "40px" }}
                        />
                      </IconButton>
                    </label>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <TextField disabled label={amount} />
                </Grid>
                <Grid item xs={1}>
                  <Stack>
                    <label htmlFor="icon-button-add" onClick={toAdd}>
                      <IconButton>
                        <AddCircleOutlineIcon
                          sx={{ color: "black", fontSize: "40px" }}
                        />
                      </IconButton>
                    </label>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Status :
            </Grid>
            <Grid item xs={10}>
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
                      <MenuItem key={option} value={option}>
                        {option}
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
            <button className="btn-submit" onClick={handleEditEquipments}>
              Submit
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default EquipmentsEdit;
