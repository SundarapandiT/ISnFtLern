import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, FormControl, Typography } from "@mui/material";
// import Allstates from '../../../data/Allstates.json';
import {api} from "../../../utils/api";

const StateDropdown = ({ country, setState, senderErrors, state: selectedState }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) return;
  
    const fetchStates = async () => {
      try {
        setLoading(true);
  
        const response = await axios.post(`${api.BackendURL}/locations/getstate`, {
          CountryID: country,
        });
  
        const stateList = response.data.user?.[0] || [];
        console.log(stateList)
  
        // Extract only statename
        const stateNames = stateList.map((state) => state.statename);
  
        setStates(stateNames);
      } catch (error) {
        console.error("Failed to fetch states:", error);
        setStates([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStates();
  }, [country]);
  

  return (
    <FormControl fullWidth>
      <Autocomplete
        disablePortal
        id="state-autocomplete"
        options={states}
        loading={loading}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => setState(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select State"
            error={!!senderErrors.state}
            helperText={senderErrors.state}
            required
          />
        )}
        value={states.find((s) => s === selectedState) || null}
      />
      {senderErrors.state && (
        <Typography color="error" variant="caption">
          {senderErrors.state}
        </Typography>
      )}
    </FormControl>
  );
};

export default StateDropdown;
