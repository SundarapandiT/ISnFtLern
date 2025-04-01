import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const SectionTabs = ({ activeTab, setActiveTab, isMobile, completedTabs, shipmentType }) => {
  // Define tabs dynamically based on shipmentType
  const tabLabels =
    shipmentType === "sea"
      ? ["Schedule Pickup", "Sender", "Recipient", "Payment"]
      : ["Schedule Pickup", "Sender", "Recipient", "Package", "Payment"];
  const tabValues = tabLabels.map((label) => label.toLowerCase().replace(" ", "-"));

  // Determine the current tab index and disable future tabs
  const tabOrder = tabValues;
  const currentIndex = tabOrder.indexOf(activeTab);

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
          left: isMobile ? "auto" : `${(tabValues.indexOf(activeTab) * 100) / tabValues.length}%`,
          top: isMobile ? `${(tabValues.indexOf(activeTab) * 100) / tabValues.length}%` : "auto",
          width: isMobile ? "100%" : `${100 / tabValues.length}%`,
          height: isMobile ? `${100 / tabValues.length}%` : "100%",
          backgroundColor: "#eb0c40",
          borderRadius: "5px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
          transition: isMobile ? "top 0.3s ease-in-out" : "left 0.3s ease-in-out",
        }}
      />
      {tabLabels.map((label, index) => {
        const isDisabled = index > currentIndex && !completedTabs[tabOrder[index - 1]];
        return (
          <Tab
            key={label}
            label={label}
            value={tabValues[index]}
            disabled={isDisabled}
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
              "&.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.26)",
                opacity: 1,
              },
            }}
          />
        );
      })}
    </Tabs>
  );
};

export default SectionTabs;