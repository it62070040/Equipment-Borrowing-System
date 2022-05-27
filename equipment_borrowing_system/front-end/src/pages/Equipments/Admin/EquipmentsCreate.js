import React, { useCallback, useEffect, useState } from "react";
import "./EquipmentCreate.css";
import { Link, useNavigate  } from "react-router-dom";
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
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Swal from "sweetalert2";

import { gql, useMutation, useQuery } from "@apollo/client";

const EQUIPMENT_MUTATION = gql`
  mutation ($record: CreateOneEquipmentInput!) {
    createEquipment(record: $record) {
      recordId
    }
  }
`;
const CATEGORY_QUERY = gql`
  query {
    categorys {
      category
    }
  }
`;

const CATEGORY_MUTATION = gql`
  mutation ($record: CreateOneCategoryInput!) {
    createCategory(record: $record) {
      recordId
    }
  }
`;

const EquipmentsCreate = () => {
  const Swal = require("sweetalert2");
  const navigate  = useNavigate()
  const [queryCategory, setqueryCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("Available");
  const [why_unavailable, setWhy_unavailable] = useState("");
  const [amount, setAmount] = useState(1);

  const [imagePreview, setImagePreview] = useState("");
  const [fileImage, setFileImage] = useState();

  var FormData = require("form-data");
  const formData = new FormData();

  const onFileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const f = e.target.files[0];
    if (reader !== undefined && f !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFileImage(f);
      };
      reader.readAsDataURL(f);
    }
  };

  const remove = () => {
    setImagePreview("");
  };

  // validation name
  const [helperTextName, setHelperTextName] = useState("");
  const [errorName, setErrorName] = useState(false);
  // validation description
  const [helperTextDescription, setHelperTextDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  // validation category
  const [helperTextCategory, setHelperTextCategory] = useState("");
  const [errorCategory, setErrorCategory] = useState(false);

  //query
  const { loading, error, data, refetch } = useQuery(CATEGORY_QUERY);
  //mutation
  const [createEquipmentMutation] = useMutation(EQUIPMENT_MUTATION);
  const [createCategoryMutation] = useMutation(CATEGORY_MUTATION);

  useEffect(() => {
    if (loading === false && data) {
      setqueryCategory(data.categorys);
    }
  }, [loading, data]);

  if (loading) {
    return <h4>Loading...</h4>;
  }
  if (error) {
    return <h4> Error: {error.message}</h4>;
  }

  const handleCreateEquipments = async (e) => {
    e.preventDefault();
    try {
      formData.append("file", fileImage);
      formData.append("upload_preset", "my-uploads");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/fswdproject/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      var url_pic = data.secure_url;

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
      // alert loading
      Swal.fire({
        icon: "success",
        title: "Create Equipment Success",
        showConfirmButton: false,
        // timer: 3000
      });

      navigate("/equipments") 
      
      // window.location = `/equipments`;
    } catch (err) {
      console.error(err.message);
      // alert error
      Swal.fire({
        title: "Please fill your equipment info.",
        icon: "warning",
        confirmButtonText: "Yes, I did it!",
        confirmButtonColor: "#3085d6",
        reverseButtons: true,
      });
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    console.log("click");
    try {
      await createCategoryMutation({
        variables: {
          record: {
            category: newCategory,
          },
        },
      }).then(refetch);
    } catch (err) {
      if (err.message.startsWith("E11000")) {
        setErrorCategory(true);
        setHelperTextCategory("ชื่อ Category นี้มีอยู่แล้ว");
      } else {
        console.log("Server error");
      }
    }
    setNewCategory("");
  };

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
                        value="Available"
                        control={<Radio />}
                        label="Available"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3} sx={{ alignSelf: "center" }}>
                      <FormControlLabel
                        value="Unavailable"
                        control={<Radio />}
                        label="Unavailable"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        id="reason"
                        label="สาเหตุ"
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
              เพิ่ม Category อื่น :
            </Grid>
            <Grid item xs={10}>
              <Box
                // component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25ch" },
                }}
                // noValidate
                // autoComplete="off"
              >
                <div className="div-center">
                  <TextField
                    id="category"
                    label="ชื่อ category"
                    fullWidth
                    margin="normal"
                    value={newCategory}
                    helperText={helperTextCategory}
                    error={errorCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      mt: 1,
                      py: 1.5,
                      ml: 2,
                      borderRadius: "15px",
                      boxShadow: 0,
                      backgroundColor: "#2196F3",
                    }}
                    onClick={handleCreateCategory}
                  >
                    เพิ่ม
                  </Button>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Category :
            </Grid>
            <Grid item xs={10}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="div-center">
                  <TextField
                    id="outlined-select-currency"
                    sx={{ mt: 1 }}
                    select
                    label="กรุณาเลือก Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {queryCategory.map((option, i) => (
                      <MenuItem key={i} value={option.category}>
                        {option.category}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Box>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2} className="name" sx={{ alignSelf: "center" }}>
              Picture :
            </Grid>
            <Grid>
              <Stack>
                {imagePreview === "" ? (
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={onFileChange}
                      src={imagePreview}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{ mt: 1, py: 1.5 }}
                    >
                      กรุณาเลือกรูปภาพของคุณ
                    </Button>
                  </label>
                ) : (
                  <div>
                    <Grid
                      container
                      sx={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <Grid sx={{ mt: 2 }}>
                        <img src={imagePreview} alt="Icone adicionar" />
                      </Grid>
                      <Grid>
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={remove}
                        >
                          Remover
                        </button>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Stack>
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
