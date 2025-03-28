import React from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

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
  handlepackagePrevious,
  packageErrors,
  packageType,
  setPackageType,
  noOfPackages,
  setNoOfPackages,
  dutiesPaidBy,
  setDutiesPaidBy,
  updatePackageRows,
}) => {
  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, m: 2 }}>
      {/* Top Selectors */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="package-type-label">Package Type (required)</InputLabel>
            <Select
              labelId="package-type-label"
              value={packageType || "Package"}
              label="Package Type (required)"
              onChange={(e) => setPackageType(e.target.value)}
            >
              <MenuItem value="Package">Package</MenuItem>
              <MenuItem value="Document">Document</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="no-of-packages-label">No. of Packages</InputLabel>
            <Select
              labelId="no-of-packages-label"
              value={noOfPackages || 1}
              label="No. of Packages"
              onChange={(e) => {
                setNoOfPackages(e.target.value);
                updatePackageRows(e.target.value);
              }}
            >
              {[...Array(10).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="duties-taxes-label">Duties & Taxes Paid By</InputLabel>
            <Select
              labelId="duties-taxes-label"
              value={dutiesPaidBy || "Recipient (No Additional Fees)"}
              label="Duties & Taxes Paid By"
              onChange={(e) => setDutiesPaidBy(e.target.value)}
            >
              <MenuItem value="Recipient (No Additional Fees)">Recipient (No Additional Fees)</MenuItem>
              <MenuItem value="Sender (Additional $15 Fees Applied)">Sender (Additional $15 Fees Applied)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Package Details Table */}
      <form onSubmit={handlePackageSubmit}>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#333", color: "white" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>No of Packages</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Weight (lbs)*</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dimension (L + W + H in inch)*</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Chargeable Weight</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Insured Value (USD)*</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell> {/* For Delete Icon */}
              </TableRow>
            </TableHead>
            <TableBody>
              {packageData.map((pkg, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      name="noOfPackages"
                      type="number"
                      value={pkg.noOfPackages || ""}
                      onChange={(e) => handlePackageChange(index, e)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={!!packageErrors[`noOfPackages_${index}`]}
                      helperText={packageErrors[`noOfPackages_${index}`]}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="weight"
                      type="number"
                      value={pkg.weight || ""}
                      onChange={(e) => handlePackageChange(index, e)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={!!packageErrors[`weight_${index}`]}
                      helperText={packageErrors[`weight_${index}`]}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TextField
                        name="length"
                        type="number"
                        value={pkg.length || ""}
                        onChange={(e) => handlePackageChange(index, e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ width: "60px" }}
                        error={!!packageErrors[`length_${index}`]}
                        helperText={packageErrors[`length_${index}`]}
                      />
                      <Typography>+</Typography>
                      <TextField
                        name="width"
                        type="number"
                        value={pkg.width || ""}
                        onChange={(e) => handlePackageChange(index, e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ width: "60px" }}
                        error={!!packageErrors[`width_${index}`]}
                        helperText={packageErrors[`width_${index}`]}
                      />
                      <Typography>+</Typography>
                      <TextField
                        name="height"
                        type="number"
                        value={pkg.height || ""}
                        onChange={(e) => handlePackageChange(index, e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ width: "60px" }}
                        error={!!packageErrors[`height_${index}`]}
                        helperText={packageErrors[`height_${index}`]}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="chargeableWeight"
                      type="number"
                      value={pkg.chargeableWeight || ""}
                      onChange={(e) => handlePackageChange(index, e)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="insuredValue"
                      type="number"
                      value={pkg.insuredValue || ""}
                      onChange={(e) => handlePackageChange(index, e)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      error={!!packageErrors[`insuredValue_${index}`]}
                      helperText={packageErrors[`insuredValue_${index}`]}
                    />
                  </TableCell>
                  <TableCell>
                    {packageData.length > 1 && (
                      <IconButton
                        onClick={() => handleRemovePackage(index)}
                        sx={{ color: "gray" }}
                        aria-label="delete package row"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddPackage}
            sx={{
              bgcolor: "#777",
              "&:hover": { bgcolor: "#999" },
            }}
          >
            ADD NEW ROW
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body1">{packageData.length}</Typography>
            <Typography variant="body1">
              {packageData.reduce((sum, pkg) => sum + Number(pkg.weight || 0), 0)}
            </Typography>
            <Typography variant="body1">
              {packageData.reduce((sum, pkg) => sum + Number(pkg.chargeableWeight || 0), 0)}
            </Typography>
            <Typography variant="body1">
              ${packageData.reduce((sum, pkg) => sum + Number(pkg.insuredValue || 0), 0)}
            </Typography>
          </Box>
        </Box>

        {/* Commercial Invoice Section */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Commercial Invoice
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#333", color: "white" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Package Number</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Content Description</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Value Per Qty</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Value</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell> {/* For Delete Icon */}
              </TableRow>
            </TableHead>
            <TableBody>
              {commercialInvoiceData.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        name="packageNumber"
                        value={invoice.packageNumber || ""}
                        onChange={(e) => handleInvoiceChange(index, e)}
                        variant="outlined"
                        disableUnderline
                        error={!!packageErrors[`packageNumber_${index}`]}
                      >
                        {packageData.map((_, i) => (
                          <MenuItem key={i + 1} value={String(i + 1)}>
                            {i + 1}
                          </MenuItem>
                        ))}
                      </Select>
                      {packageErrors[`packageNumber_${index}`] && (
                        <Typography variant="caption" color="error">
                          {packageErrors[`packageNumber_${index}`]}
                        </Typography>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="contentDescription"
                      value={invoice.contentDescription || ""}
                      onChange={(e) => handleInvoiceChange(index, e)}
                      fullWidth
                      variant="outlined"
                      InputProps={{ disableUnderline: true }}
                      error={!!packageErrors[`contentDescription_${index}`]}
                      helperText={packageErrors[`contentDescription_${index}`]}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="quantity"
                      type="number"
                      value={invoice.quantity || ""}
                      onChange={(e) => handleInvoiceChange(index, e)}
                      fullWidth
                      variant="outlined"
                      InputProps={{ disableUnderline: true }}
                      error={!!packageErrors[`quantity_${index}`]}
                      helperText={packageErrors[`quantity_${index}`]}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="valuePerQty"
                      type="number"
                      value={invoice.valuePerQty || ""}
                      onChange={(e) => handleInvoiceChange(index, e)}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      error={!!packageErrors[`valuePerQty_${index}`]}
                      helperText={packageErrors[`valuePerQty_${index}`]}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={calculateTotalValue(index) || "0.00"}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {commercialInvoiceData.length > 1 && (
                      <IconButton
                        onClick={() => handleRemoveInvoiceRow(index)}
                        sx={{ color: "gray" }}
                        aria-label="delete invoice row"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddInvoiceRow}
            sx={{
              bgcolor: "#777",
              "&:hover": { bgcolor: "#999" },
            }}
          >
            ADD NEW ROW
          </Button>
          <Typography variant="body1">
            Total Value: $
            {commercialInvoiceData
              .reduce((sum, invoice, index) => sum + Number(calculateTotalValue(index) || 0), 0)
              .toFixed(2)}
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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