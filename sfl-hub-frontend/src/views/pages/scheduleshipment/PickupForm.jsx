import React from "react";
import {
  Box,
  FormControl,
  TextField,
  Autocomplete,
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
    <Autocomplete
      options={[
        { label: "Air", value: "air" },
        { label: "Ocean", value: "sea" },
        { label: "Ground", value: "ground" },
      ]}
      getOptionLabel={(option) => option.label}
      value={shipmentType ? { label: shipmentType, value: shipmentType } : null}
      onChange={(event, newValue) => setShipmentType(newValue?.value || "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Shipment Type"
          error={!!pickupErrors.shipmentType}
          helperText={pickupErrors.shipmentType}
        />
      )}
      disablePortal // Ensures options appear below the field
    />
  </FormControl>

  <FormControl fullWidth sx={{ mb: 2 }}>
    <Autocomplete
      options={countries}
      getOptionLabel={(option) => option.label}
      value={fromCountry ? countries.find((c) => c.value === fromCountry) : null}
      onChange={(event, newValue) => setFromCountry(newValue?.value || "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label="From Country"
          error={!!pickupErrors.fromCountry}
          helperText={pickupErrors.fromCountry}
        />
      )}
    />
  </FormControl>

  <FormControl fullWidth sx={{ mb: 2 }}>
    <Autocomplete
      options={countries}
      getOptionLabel={(option) => option.label}
      value={toCountry ? countries.find((c) => c.value === toCountry) : null}
      onChange={(event, newValue) => setToCountry(newValue?.value || "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To Country"
          error={!!pickupErrors.toCountry}
          helperText={pickupErrors.toCountry}
        />
      )}
    />
  </FormControl>

  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <Button
      type="submit"
      variant="contained"
      sx={{ bgcolor: "#E91E63", "&:hover": { bgcolor: "#ed64a6" } }}
    >
      Next
    </Button>
  </Box>
</form>
    </Box>
  );
};

export default PickupForm;