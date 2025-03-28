import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";

const PickupForm = ({
  shipmentType,
  setShipmentType,
  fromCountry,
  setFromCountry,
  toCountry,
  setToCountry,
  pickupErrors,
  countries,
  handlePickupSubmit,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        m: 3,
        width: "65%",
        alignSelf: "center",
        margin: "auto",
      }}
    >
      <form onSubmit={handlePickupSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Shipment Type</InputLabel>
          <Select
            value={shipmentType}
            onChange={(e) => setShipmentType(e.target.value)}
            label="Select Shipment Type"
            error={!!pickupErrors.shipmentType}
          >
            <MenuItem value="">Please select shipment type</MenuItem>
            <MenuItem value="air">Air</MenuItem>
            <MenuItem value="sea">Ocean</MenuItem>
            <MenuItem value="ground">Ground</MenuItem>
          </Select>
          {pickupErrors.shipmentType && (
            <Typography color="error" variant="caption">
              {pickupErrors.shipmentType}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>From Country</InputLabel>
          <Select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            label="From Country"
            error={!!pickupErrors.fromCountry}
          >
            <MenuItem value="">Please select from country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
          {pickupErrors.fromCountry && (
            <Typography color="error" variant="caption">
              {pickupErrors.fromCountry}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>To Country</InputLabel>
          <Select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            label="To Country"
            error={!!pickupErrors.toCountry}
          >
            <MenuItem value="">Please select to country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
          {pickupErrors.toCountry && (
            <Typography color="error" variant="caption">
              {pickupErrors.toCountry}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#eb0c40", "&:hover": { bgcolor: "#ed64a6" } }}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PickupForm;