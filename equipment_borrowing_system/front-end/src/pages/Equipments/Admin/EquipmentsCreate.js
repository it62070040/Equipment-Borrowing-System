import React, { useCallback, useEffect, useState } from "react";
import "./EquipmentCreate.css";
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
// import FileBase64 from "react-file-base64";

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
  const [queryCategory, setqueryCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [url_pic, setUrl_pic] = useState("");
  const [status, setStatus] = useState("available");
  const [why_unavailable, setWhy_unavailable] = useState("");
  const [amount, setAmount] = useState(1);

  // const [images, setImages] = useState("");
  // const [selected, setSelected] = useState("");
  // const [toggle, setToggle] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);

  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [base64, setBase64] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [test, setTest] = useState("");

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = (a) => {
      setBase64(a.target.result);


      // let test = new Buffer(base64, 'base64')
      // console.log(test)
      // setUrl_pic(test)
    };
    reader.readAsDataURL(e);
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setNameFile(file.name);
        setImagePreview(reader.result);
        onChange(file);
        setTest(file)
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(url_pic)

  const remove = () => {
    setFile("");
    setImagePreview("");
    setBase64("");
    setNameFile("");
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
    console.log(
      name,
      description,
      category,
      url_pic,
      status,
      why_unavailable,
      amount
    );
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
    } catch (err) {
      console.error(err.message);
    }
    // window.location = `/equipments`;
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
                  <button className="btn-add" onClick={handleCreateCategory}>
                    เพิ่ม
                  </button>
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
                    {queryCategory.map((option) => (
                      <MenuItem key={option} value={option.category}>
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
            <Grid item xs={10}>
              {/* <UploadImage /> */}

              {/* <TextField
                required
                id="outlined-number"
                type="string"
                fullWidth
                margin="normal"
                value={url_pic}
                onChange={(e) => setUrl_pic(e.target.value)}
              /> */}

              {/* <input
                class="custom-file-input"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={console.log("click")}
                onClick={selectImages}
                required
              />
              <label class="custom-file-label" for="customFile">
                กรุณาเลือกรูปภาพของคุณ
              </label>

              <div class="text-center" id="card-img-top">
                <img src={images} alt="Placeholder image" class="w-25" />
              </div>

              <button onClick={deleteSelectImage} class="btn btn-secondary">
                ยกเลิกการเลือก
              </button> */}
              {/* ล่าสุด */}
              <Stack>
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={photoUpload}
                    src={imagePreview}
                  />
                  {/* <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setUrl_pic({ test, image: base64 })}
                  /> */}

                  {imagePreview === "" ? (
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{ mt: 1, py: 1.5 }}
                    >
                      กรุณาเลือกรูปภาพของคุณ
                    </Button>
                  ) : (
                    <img src={imagePreview} alt="Icone adicionar" />
                  )}
                  {imagePreview !== "" && (
                    <>
                      <section>
                        <p>{nameFile}</p>
                      </section>
                      <button type="button" onClick={remove}>
                        Remover
                      </button>
                    </>
                  )}
                </label>
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
