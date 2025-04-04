import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, FormControl, Typography } from "@mui/material";
import Allstates from '../../../data/Allstates.json';

const StateDropdown = ({ country, setState, senderErrors, state: selectedState }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) return;
    setLoading(true);

    if (Allstates[country]) {
      setStates(Allstates[country]);
    } else {
      setStates([]);
    }

    setLoading(false);
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
