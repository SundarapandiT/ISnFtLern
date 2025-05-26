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
  setPhone1,
  setPhone2,
  setRecipientPhone1,
  setRecipientPhone2,
  isGetrate,
}) => {
console.log(isGetrate,"isgetrate")
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
             disabled={isGetrate}
            onChange={(event, newValue) => setShipmentType(newValue?.value || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                className="small-textfield"
                label="Select Shipment Type"
                error={!!pickupErrors.shipmentType}
                helperText={pickupErrors.shipmentType}
                // InputProps={{
                //   ...params.InputProps,
                //   readOnly: isGetrate,  
                // }}
              />
            )}
            disablePortal
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
              setPhone1(""); setPhone2("");
            }}
             disabled={isGetrate}
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
             disabled={isGetrate}
            onChange={(event, newValue) => { setToCountry(newValue?.value || ""); setresisZip(newValue?.iszipavailable ?? 0); setRecipientZipCode(""); setRecipientPhone1(""); setRecipientPhone2(""); }}
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