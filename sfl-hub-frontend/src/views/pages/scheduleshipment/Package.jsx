import React, { useState, useRef, createRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonBox, NextButton, PrevButton } from "../../styles/scheduleshipmentStyle";

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
  // State to control dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  // Create an array of refs for valuePerQty TextFields (one ref per row)
  const valuePerQtyRefs = useRef(
    commercialInvoiceData.map(() => createRef())
  );

  // Update refs when commercialInvoiceData changes (e.g., when rows are added/removed)
  React.useEffect(() => {
    valuePerQtyRefs.current = commercialInvoiceData.map(
      (_, i) => valuePerQtyRefs.current[i] || createRef()
    );
  }, [commercialInvoiceData.length]);

  function handleNext(e) {
    const totalinsured_value = packageData.reduce(
      (sum, pkg) => sum + Number(pkg.insured_value || 0),
      0
    );
    const totalDeclaredValue = commercialInvoiceData.reduce(
      (sum, _, index) => sum + Number(calculateTotalValue(index) || 0),
      0
    );

    if (samecountry === false) {
      const isNextEnabled = totalinsured_value <= totalDeclaredValue && totalinsured_value > 0;
      if (isNextEnabled) {
        console.log("different country");
        handlePackageSubmit();
      } else {
        setOpenDialog(true);
      }
    } else {
      console.log("same country");
      handlePackageSubmit();
    }
  }

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle update action and focus valuePerQty
  const handleUpdateCommercialValue = () => {
    // Focus the valuePerQty TextField in the first row (index 0)
    if (valuePerQtyRefs.current[0]?.current) {
      valuePerQtyRefs.current[0].current.focus();
    }
    setOpenDialog(false);
  };

  return (
    <Box className="ss-box">
      {/* Dialog for Insured Value Error */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="insured-value-dialog-title"
        sx={{ "& .MuiDialog-paper": { minWidth: "400px", p: 2 } }}
      >
        <DialogTitle id="insured-value-dialog-title" sx={{ fontWeight: "bold" }}>
          Insured Value cannot exceed Customs value.
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Please change "Value Per Qty" in Commercial Invoice or update "Insured Value" in Get Rate.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateCommercialValue}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Update Commercial Value
          </Button>
        </DialogActions>
      </Dialog>

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
                const num = parseInt(e.target.value, 10);
                setNoOfPackages(num);
                updatePackageRows(num);
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
              value={dutiesPaidBy || "Recipient"}
              label="Duties & Taxes Paid By"
              onChange={(e) => setDutiesPaidBy(e.target.value)}
              disabled
            >
              <MenuItem value="Recipient">Recipient (No Additional Fees)</MenuItem>
              {/* <MenuItem value="Sender">Sender (Additional $15 Fees Applied)</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <form>
        <Box sx={{ overflowX: "auto", mb: 2 }}>
          <TableContainer component={Paper} sx={{ minWidth: 650 }}>
            <Table className="common-table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 245 }}>No of Pkgs</TableCell>
                  <TableCell sx={{ width: 245 }}>Weight (lbs)*</TableCell>
                  <TableCell sx={{ width: 499 }}>Dimension (L + W + H in)*</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Chargeable Wt</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Insured Val (USD)*</TableCell>
                  <TableCell sx={{ width: 60 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packageData.map((pkg, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        name="noOfPackages"
                        type="number"
                        value={index + 1}
                        inputProps={{
                          autoComplete: "off",
                          autoCorrect: "off",
                          autoCapitalize: "none"
                        }}
                        InputProps={{ readOnly: true }}
                        fullWidth
                        variant="outlined"
                        size="small"
                        error={!!packageErrors[`noOfPackages_${index}`]}
                        helperText={packageErrors[`noOfPackages_${index}`]}
                        sx={{ backgroundColor: "#f0f0f0" }}
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
                        inputProps={{
                          autoComplete: "off",
                          autoCorrect: "off",
                          autoCapitalize: "none"
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box className="dimensions">
                        <TextField
                          name="length"
                          type="number"
                          label="L"
                          value={pkg.length || ""}
                          onChange={(e) => handlePackageChange(index, e)}
                          variant="outlined"
                          size="small"
                          sx={{ width: { xs: "100%", sm: "31%" }, mb: { xs: 1, sm: 0 } }}
                          error={!!packageErrors[`length_${index}`]}
                          helperText={packageErrors[`length_${index}`]}
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                        <Typography sx={{ display: { xs: "none", sm: "block" } }}>+</Typography>
                        <TextField
                          name="width"
                          type="number"
                          label="W"
                          value={pkg.width || ""}
                          onChange={(e) => handlePackageChange(index, e)}
                          variant="outlined"
                          size="small"
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          sx={{ width: { xs: "100%", sm: "31%" }, mb: { xs: 1, sm: 0 } }}
                          error={!!packageErrors[`width_${index}`]}
                          helperText={packageErrors[`width_${index}`]}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                        <Typography sx={{ display: { xs: "none", sm: "block" } }}>+</Typography>
                        <TextField
                          name="height"
                          type="number"
                          label="H"
                          value={pkg.height || ""}
                          onChange={(e) => handlePackageChange(index, e)}
                          variant="outlined"
                          size="small"
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          sx={{ width: { xs: "100%", sm: "90px" } }}
                          error={!!packageErrors[`height_${index}`]}
                          helperText={packageErrors[`height_${index}`]}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="chargable_weight"
                        type="number"
                        value={pkg.chargable_weight || ""}
                        InputProps={{
                          readOnly: true,
                          endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                        }}
                        inputProps={{
                          autoComplete: "off",
                          autoCorrect: "off",
                          autoCapitalize: "none"
                        }}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ backgroundColor: "#f0f0f0" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="insured_value"
                        type="number"
                        value={pkg.insured_value || 0}
                        onChange={(e) => handlePackageChange(index, e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{
                          autoComplete: "off",
                          autoCorrect: "off",
                          autoCapitalize: "none"
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={!!packageErrors[`insured_value_${index}`]}
                        helperText={packageErrors[`insured_value_${index}`]}
                      />
                    </TableCell>
                    <TableCell>
                      {packageData.length > 1 ? (
                        <IconButton
                          onClick={() => handleRemovePackage(index)}
                          sx={{ color: "gray" }}
                          aria-label="delete package row"
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

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
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Totals:
            </Typography>
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
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Commercial Invoice
          </Typography>
          <Box sx={{ overflowX: "auto", mb: 2 }}>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
              <Table className="common-table">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#333" }}>
                    <TableCell sx={{ width: 100 }}>Pkg No</TableCell>
                    <TableCell sx={{ width: 889 }}>Content Description*</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>Quantity*</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Value/Qty (USD)*</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Total Value (USD)</TableCell>
                    <TableCell sx={{ width: 60 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commercialInvoiceData.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControl fullWidth variant="outlined" size="small">
                          <Select
                            name="packageNumber"
                            value={invoice.packageNumber || ""}
                            onChange={(e) => handleInvoiceChange(index, e)}
                            displayEmpty
                            error={!!packageErrors[`packageNumber_${index}`]}
                          >
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
                      <TableCell>
                        <TextField
                          name="contentDescription"
                          value={invoice.contentDescription || ""}
                          onChange={(e) => handleInvoiceChange(index, e)}
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          fullWidth
                          variant="outlined"
                          size="small"
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
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          fullWidth
                          variant="outlined"
                          size="small"
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
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          fullWidth
                          variant="outlined"
                          size="small"
                          inputRef={valuePerQtyRefs.current[index]} // Attach ref to TextField
                          InputProps={{
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
                          size="small"
                          inputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "none"
                          }}
                          InputProps={{
                            readOnly: true,
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          sx={{ backgroundColor: "#f0f0f0" }}
                        />
                      </TableCell>
                      <TableCell>
                        {commercialInvoiceData.length > 1 ? (
                          <IconButton
                            onClick={() => handleRemoveInvoiceRow(index)}
                            sx={{ color: "gray" }}
                            aria-label="delete invoice row"
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

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

        <ButtonBox>
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