import React from "react";
import TextField from "@mui/material/TextField";

function Input() {
  return (
    <TextField
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      sx={{ color: "color.default", bgcolor: "background.default" }}
    />
  );
}

export default Input;
