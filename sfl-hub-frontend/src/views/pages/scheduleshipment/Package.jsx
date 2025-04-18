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
import { ButtonBox, NextButton, PrevButton } from "../../styles/scheduleshipmentStyle";
import toast from "react-hot-toast";

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
  samecountry,
}) => {

  function handleNext(e) {
    const totalinsured_value = packageData.reduce(
      (sum, pkg) => sum + Number(pkg.insured_value || 0),
      0
    );
    const totalDeclaredValue = commercialInvoiceData.reduce(
      (sum, _, index) => sum + Number(calculateTotalValue(index) || 0),
      0
    );

    if (samecountry===false) {
      const isNextEnabled = totalinsured_value <= totalDeclaredValue && totalinsured_value > 0;
      if (isNextEnabled) {
        console.log("different country")
        handlePackageSubmit();
      } else {
        toast.error("Insured value should be less than or equal to Total declared value and greater than zero.");
      }
    } else {
      console.log("same country")
      handlePackageSubmit();
    }

  }

  return (
    <Box className="ss-box">
      {/* Top Selectors */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Kept xs={12} sm={4} as it's a common responsive pattern */}
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
                const num = parseInt(e.target.value, 10);
                setNoOfPackages(num);
                updatePackageRows(num); // Ensure this function exists and works
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
      <form>
        {/* Added Box for horizontal scroll on small screens */}
        <Box sx={{ overflowX: 'auto', mb: 2 }}>
          <TableContainer component={Paper} sx={{ minWidth: 650 }}> {/* Set minWidth for TableContainer */}
            <Table className="common-table">
              <TableHead>
                <TableRow>
                  {/* Added minWidth and responsive padding to header cells */}
                  <TableCell sx={{ width: 245 }}>No of Pkgs</TableCell>
                  <TableCell sx={{ width: 245 }}>Weight (lbs)*</TableCell>
                  <TableCell sx={{ width: 499 }}>Dimension (L + W + H in)*</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Chargeable Wt</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Insured Val (USD)*</TableCell>
                  {packageData.length > 1 && <TableCell></TableCell>} {/*For Delete Icon*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {packageData.map((pkg, index) => (
                  <TableRow key={index}>
                    {/* Added responsive padding */}
                    <TableCell sx={{}}>
                      <TextField
                        name="noOfPackages"
                        type="number"
                        value={index + 1} // Default to row number if empty
                        // onChange={(e) => handlePackageChange(index, e)} // Usually you might not edit this directly if tied to selector
                        InputProps={{ readOnly: true }} // Make read-only if controlled by selector
                        fullWidth
                        variant="outlined"
                        size="small"
                        error={!!packageErrors[`noOfPackages_${index}`]}
                        helperText={packageErrors[`noOfPackages_${index}`]}
                        sx={{ backgroundColor: '#f0f0f0' }} // Indicate read-only visually
                      />
                    </TableCell>
                    <TableCell sx={{}}>
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
                        InputProps={{
                          endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{}}>
                      {/* Responsive Box for dimensions */}
                      <Box className="dimensions">
                        <TextField
                          name="length"
                          type="number"
                          label="L" // Add labels for clarity
                          value={pkg.length || ""}
                          onChange={(e) => handlePackageChange(index, e)}
                          variant="outlined"
                          size="small"
                          // Responsive width and margin
                          sx={{ width: { xs: '100%', sm: '31%' }, mb: { xs: 1, sm: 0 } }}
                          error={!!packageErrors[`length_${index}`]}
                          helperText={packageErrors[`length_${index}`]}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>+</Typography>
                        <TextField
                          name="width"
                          type="number"
                          label="W"
                          value={pkg.width || ""}
                          onChange={(e) => handlePackageChange(index, e)}
                          variant="outlined"
                          size="small"
                          sx={{ width: { xs: '100%', sm: '31%' }, mb: { xs: 1, sm: 0 } }}
                          error={!!packageErrors[`width_${index}`]}
                          helperText={packageErrors[`width_${index}`]}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                        <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>+</Typography>
                        <TextField
                          name="height"
                          type="number"
                          label="H"
                          value={pkg.height || ""}
                          onChange={(e) => handlePackageChange(index, e)}
                          variant="outlined"
                          size="small"
                          sx={{ width: { xs: '100%', sm: '90px' } }}
                          error={!!packageErrors[`height_${index}`]}
                          helperText={packageErrors[`height_${index}`]}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{}}>
                      <TextField
                        name="chargable_weight"
                        type="number"
                        value={pkg.chargable_weight || ""}
                        // onChange={(e) => handlePackageChange(index, e)} // Usually calculated, so disable direct edit
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputProps={{
                          readOnly: true,
                          endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                        }}
                        sx={{ backgroundColor: '#f0f0f0' }} // Indicate read-only visually
                      />
                    </TableCell>
                    <TableCell sx={{}}>
                      <TextField
                        name="insured_value"
                        type="number"
                        value={pkg.insured_value || ""}
                        onChange={(e) => handlePackageChange(index, e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={!!packageErrors[`insured_value_${index}`]}
                        helperText={packageErrors[`insured_value_${index}`]}
                      />
                    </TableCell>
                    <TableCell sx={{}}>
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
        </Box>

        {/* Responsive Box for Add button and totals */}

        <Box className="action-row">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddPackage}
            disabled={packageData.length >= 10}
          >
            ADD NEW ROW
          </Button>

          <Box className="summary-box">
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Totals:</Typography>
            <Typography variant="body2">Pkgs: {packageData.length}</Typography>
            <Typography variant="body2">
              Wt: {packageData.reduce((sum, pkg) => sum + Number(pkg.weight || 0), 0).toFixed(2)} lbs
            </Typography>
            <Typography variant="body2">
              Chrg Wt: {packageData.reduce((sum, pkg) => sum + Number(pkg.chargable_weight || 0), 0).toFixed(2)} lbs
            </Typography>
            <Typography variant="body2">
              Ins Val: ${packageData.reduce((sum, pkg) => sum + Number(pkg.insured_value || 0), 0).toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: samecountry ? "none" : "block" }}>
          {/* Commercial Invoice Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}> {/* Increased top margin */}
            Commercial Invoice
          </Typography>
          {/* Added Box for horizontal scroll on small screens */}
          <Box sx={{ overflowX: 'auto', mb: 2 }}>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}> {/* Set minWidth for TableContainer */}
              <Table className="common-table">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#333" }}>
                    {/* Added minWidth and responsive padding to header cells */}
                    <TableCell sx={{ width: 100 }}>Pkg No</TableCell>
                    <TableCell sx={{ width: 889 }}>Content Description*</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>Quantity*</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Value/Qty (USD)*</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Total Value (USD)</TableCell>
                    {commercialInvoiceData.length > 1 && <TableCell></TableCell>}{/*For Delete Icon*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commercialInvoiceData.map((invoice, index) => (
                    <TableRow key={index}>
                      {/* Added responsive padding */}
                      <TableCell sx={{}}>
                        <FormControl fullWidth variant="outlined" size="small">
                          {/* Removed explicit InputLabel for cleaner table look */}
                          <Select
                            name="packageNumber"
                            value={invoice.packageNumber || ""}
                            onChange={(e) => handleInvoiceChange(index, e)}
                            displayEmpty // Allows placeholder/empty display
                            error={!!packageErrors[`packageNumber_${index}`]}
                          >
                            {/* Generate options based on the actual number of packages */}
                            {[...Array(packageData.length).keys()].map((_, i) => (
                              <MenuItem key={i + 1} value={String(i + 1)}>
                                {i + 1}
                              </MenuItem>
                            ))}
                          </Select>
                          {packageErrors[`packageNumber_${index}`] && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                              {packageErrors[`packageNumber_${index}`]}
                            </Typography>
                          )}
                        </FormControl>
                      </TableCell>
                      <TableCell sx={{}}>
                        <TextField
                          name="contentDescription"
                          value={invoice.contentDescription || ""}
                          onChange={(e) => handleInvoiceChange(index, e)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          error={!!packageErrors[`contentDescription_${index}`]}
                          helperText={packageErrors[`contentDescription_${index}`]}
                        />
                      </TableCell>
                      <TableCell sx={{}}>
                        <TextField
                          name="quantity"
                          type="number"
                          value={invoice.quantity || ""}
                          onChange={(e) => handleInvoiceChange(index, e)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          error={!!packageErrors[`quantity_${index}`]}
                          helperText={packageErrors[`quantity_${index}`]}
                        />
                      </TableCell>
                      <TableCell sx={{}}>
                        <TextField
                          name="valuePerQty"
                          type="number"
                          value={invoice.valuePerQty || ""}
                          onChange={(e) => handleInvoiceChange(index, e)}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!packageErrors[`valuePerQty_${index}`]}
                          helperText={packageErrors[`valuePerQty_${index}`]}
                        />
                      </TableCell>
                      <TableCell sx={{}}>
                        <TextField
                          value={calculateTotalValue(index) || "0.00"} // Ensure calculateTotalValue handles NaN/null
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          sx={{ backgroundColor: '#f0f0f0' }} // Indicate read-only visually
                        />
                      </TableCell>
                      <TableCell sx={{}}>
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
          </Box>

          {/* Responsive Box for Add button and total value */}
          <Box className="invoice-action-row">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddInvoiceRow}
              className="add-button"

            >
              ADD NEW ROW
            </Button>

            <Typography variant="body1" className="total-value-text">
              Total Declared Value: $
              {commercialInvoiceData
                .reduce((sum, _, index) => sum + Number(calculateTotalValue(index) || 0), 0)
                .toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Navigation Buttons - Already responsive */}
        <ButtonBox>
          {/* Reversed column order on xs so 'Next' appears below 'Previous' */}
          <PrevButton
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handlepackagePrevious}
          >
            Previous
          </PrevButton>
          <NextButton
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
          >
            Next
          </NextButton>
        </ButtonBox>
      </form>
    </Box>
  );
};

export default Package;