// SectionTabs.jsx
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const SectionTabs = ({ activeTab, setActiveTab, isMobile }) => {
  const tabLabels = ["Schedule Pickup", "Sender", "Recipient", "Package", "Payment"];
  const tabValues = tabLabels.map((label) => label.toLowerCase().replace(" ", "-"));

  return (
    <Tabs
      orientation={isMobile ? "vertical" : "horizontal"}
      value={activeTab}
      onChange={(e, newValue) => setActiveTab(newValue)}
      variant="fullWidth"
      indicatorColor="undefined"
      sx={{ position: "relative" }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: isMobile ? "auto" : 0,
          left: isMobile ? "auto" : `${tabValues.indexOf(activeTab) * 20}%`,
          top: isMobile ? `${tabValues.indexOf(activeTab) * 20}%` : "auto",
          width: isMobile ? "100%" : "20%",
          height: isMobile ? "20%" : "100%",
          backgroundColor: "#eb0c40",
          borderRadius: "5px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
          transition: isMobile ? "top 0.3s ease-in-out" : "left 0.3s ease-in-out",
        }}
      />
      {tabLabels.map((label, index) => (
        <Tab
          key={label}
          label={label}
          value={tabValues[index]}
          sx={{
            textAlign: "center",
            fontSize: { xs: "12px", sm: "16px" },
            backgroundColor: activeTab === tabValues[index] ? "" : "transparent",
            borderRadius: "9px",
            transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            "&.Mui-selected": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              color: "white",
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default SectionTabs;
