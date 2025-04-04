import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
// import { TextField, InputAdornment } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";

const MobileInput = ({ registerDetails, handleChange, handleRegister, handleBlur, setState, state }) => {
  return (
    <PhoneInput
      country={"in"} 
      enableSearch={true}
      value={registerDetails.mobile}
      onChange={(value, countryData) => {
        const formattedValue = `+${countryData.dialCode}${value.slice(countryData.dialCode.length)}`;
        handleChange({ target: { name: "mobile", value: formattedValue } });
        handleRegister({ target: { name: "mobile", value: formattedValue } });
      }}
      onBlur={(e) => handleBlur(e, "mobile")}
      onFocus={() =>
        setState((prevState) => ({
          ...prevState,
          mobileErr: false,
          mobileHelperText: "",
          checkMobile: false,
        }))
      }
      inputStyle={{
        width: "100%",
        height: "56px",
        paddingLeft: "48px",
      }}
      containerStyle={{ width: "100%" }}
      inputProps={{
        name: "mobile",
        required: true,
      }}
      isValid={() => !state.mobileErr} // Show error if invalid
    />
  );
};

export default MobileInput;