import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import "./Loader.scss";

const Loader = () => (
  <Box sx={{ display: "flex" }}>
    <CircularProgress />
  </Box>
);

export default Loader;
