import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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

export default function SelectMenuItem() {
  const [currency, setCurrency] = React.useState("อุปกรณ์อิเล็กทรอนิค");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
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
          value={currency}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
