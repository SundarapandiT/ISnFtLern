import React from "react";
import {
  Box,
  FormControl,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

import { NextButton, PickupBox } from "../../styles/scheduleshipmentStyle";

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
  iszip,
  setisZip,
  resiszip,
  setresisZip,
  setZipCode,
  setRecipientZipCode,
}) => {
  return (
    <PickupBox>
      <form onSubmit={handlePickupSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            options={[
              { label: "Air", value: "Air" },
              { label: "Ocean", value: "Ocean" },
              { label: "Ground", value: "Ground" },
            ]}
            getOptionLabel={(option) => option.label}
            value={shipmentType ? { label: shipmentType, value: shipmentType } : null}
            onChange={(event, newValue) => setShipmentType(newValue?.value || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
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
            onChange={(event, newValue) => {
              setFromCountry(newValue?.value || "");
              setisZip(newValue?.iszipavailable ?? 0);
              setZipCode("");
            }}

            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
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
            onChange={(event, newValue) => { setToCountry(newValue?.value || ""); setresisZip(newValue?.iszipavailable ?? 0); setRecipientZipCode("") }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
                label="To Country"
                error={!!pickupErrors.toCountry}
                helperText={pickupErrors.toCountry}
              />
            )}
          />
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <NextButton
            type="submit"
            variant="contained"
          >
            Next
          </NextButton>
        </Box>
      </form>
    </PickupBox>
  );
};

export default PickupForm;