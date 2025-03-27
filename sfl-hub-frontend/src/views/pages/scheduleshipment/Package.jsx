// Package.jsx
import React from "react";
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Package = ({
  packageData,
  handlePackageChange,
  handleAddPackage,
  handleRemovePackage,
  handlePackageSubmit,
  commercialInvoiceData,
  handleInvoiceChange,
  handleAddInvoiceRow,
  handleRemoveInvoiceRow,
  calculateTotalValue,
  handlepackagePrevious
}) => {
  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
    <Typography variant="h5" sx={{ mb: 3 }}>
    Package Information
  </Typography>

  {/* Top Selectors */}
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel id="package-type-label">Package Type (required)</InputLabel>
        <Select
          labelId="package-type-label"
          value="" // Add state and handler if needed, e.g., packageType, setPackageType
          label="Package Type (required)"
        >
          <MenuItem value="package">Package</MenuItem>
          <MenuItem value="box">Box</MenuItem>
          <MenuItem value="envelope">Envelope</MenuItem>
          {/* Add more package types if needed */}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="No. of Packages"
        type="number"
        defaultValue={1} // Add state and handler if needed, e.g., numPackages, setNumPackages
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel id="duties-taxes-label">Duties & Taxes Paid By</InputLabel>
        <Select
          labelId="duties-taxes-label"
          value="" // Add state and handler if needed, e.g., dutiesPaidBy, setDutiesPaidBy
          label="Duties & Taxes Paid By"
        >
          <MenuItem value="recipient">Recipient (No Additional Fees)</MenuItem>
          <MenuItem value="sender">Sender</MenuItem>
          {/* Add more options if needed */}
        </Select>
      </FormControl>
    </Grid>
  </Grid>

  {/* Package Details Table */}
  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
    Package Details
  </Typography>
  <form onSubmit={handlePackageSubmit}>
    {packageData.map((pkg, index) => (
      <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", p: 2, position: "relative" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="No of Packages"
              name="noOfPackages"
              type="number"
              value={pkg.noOfPackages}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="Weight (lbs)*"
              name="weight"
              type="number"
              value={pkg.weight}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="Length (in)*"
              name="length"
              type="number"
              value={pkg.length}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="Width (in)*"
              name="width"
              type="number"
              value={pkg.width}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="Height (in)*"
              name="height"
              type="number"
              value={pkg.height}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="Chargeable Weight"
              name="chargeableWeight"
              type="number"
              value={pkg.chargeableWeight}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              disabled
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <TextField
              label="Insured Value (USD)*"
              name="insuredValue"
              type="number"
              value={pkg.insuredValue}
              onChange={(e) => handlePackageChange(index, e)}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
        </Grid>
        {packageData.length > 1 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemovePackage(index)}
            sx={{ position: "absolute", top: 0, right: 0, minWidth: 0, padding: "1px" }}
            aria-label="remove package"
          >
            {/* Remove */}
          </Button>
        )}
      </Box>
    ))}

    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddPackage}
      sx={{
        mb: 2,
        backgroundColor: "#777",
        "&:hover": {
          backgroundColor: "#999",
        },
      }}
    >
      Add New Row
    </Button>

    {/* Commercial Invoice Table */}
    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
      Commercial Invoice
    </Typography>
    {commercialInvoiceData.map((invoice, index) => (
      <Box key={index} sx={{ mb: 2, border: "1px solid #ccc", p: 2, position: "relative" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="package-number-label">Package Number</InputLabel>
              <Select
                labelId="package-number-label"
                name="packageNumber"
                value={invoice.packageNumber}
                label="Package Number"
                onChange={(e) => handleInvoiceChange(index, e)}
              >
                {packageData.map((_, i) => (
                  <MenuItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Content Description"
              name="contentDescription"
              value={invoice.contentDescription}
              onChange={(e) => handleInvoiceChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={invoice.quantity}
              onChange={(e) => handleInvoiceChange(index, e)}
              fullWidth
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Value Per Qty"
              name="valuePerQty"
              type="number"
              value={invoice.valuePerQty}
              onChange={(e) => handleInvoiceChange(index, e)}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Total Value"
              value={calculateTotalValue(index)}
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            />
          </Grid>
        </Grid>
        {commercialInvoiceData.length > 1 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveInvoiceRow(index)}
            sx={{ position: "absolute", top: 0, right: 0, minWidth: 0, padding: "1px" }}
            aria-label="remove invoice row"
          >
            {/* Remove */}
          </Button>
        )}
      </Box>
    ))}

    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddInvoiceRow}
      sx={{
        mb: 2,
        backgroundColor: "#777",
        "&:hover": {
          backgroundColor: "#999",
        },
      }}
    >
      Add New Row
    </Button>

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handlepackagePrevious}
        sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 1, sm: 0 } }}
      >
        Previous
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#eb0c40",
          "&:hover": { bgcolor: "#ed64a6" },
          width: { xs: "100%", sm: "auto" },
        }}
        endIcon={<ArrowForwardIcon />}
      >
        Next
      </Button>
    </Box>
  </form>
</Box>
  );
};

export default Package;
