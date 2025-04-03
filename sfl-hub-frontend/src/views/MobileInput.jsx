import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
// import { TextField, InputAdornment } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";

const MobileInput = ({ registerDetails, handleChange, handleBlur, setState, state }) => {
  return (
    <PhoneInput
      country={"in"} 
      value={registerDetails.mobile}
      onChange={(value) =>
        handleChange({ target: { name: "mobile", value } })
      }
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
        paddingLeft: "48px", // To align with the icon
      }}
      containerStyle={{ width: "100%" }}
      inputProps={{
        name: "mobile",
        required: true,
      }}
    />
  );
};

export default MobileInput;
