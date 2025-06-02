import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components with reduced font sizes
const InvoiceContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "800px",
  margin: "0 auto",
  border: "1px solid #000",
  fontFamily: "Arial, sans-serif",
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const Logo = styled("img")({
  width: "250px",
});

const CompanyDetails = styled(Box)(({ theme }) => ({
  textAlign: "right",
  "& p": {
    margin: 0,
    fontSize: "0.8rem", // Reduced from 0.9rem
  },
}));

const TableStyled = styled(Table)({
  "& th, & td": {
    border: "1px solid #000",
    padding: "4px 8px",
    fontSize: "0.8rem", // Reduced from 0.9rem
  },
  "& th": {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const PaymentTerms = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: "0.7rem", // Reduced from 0.8rem
  "& p": {
    margin: "2px 0",
  },
}));

const PaymentMethods = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  border: "1px solid #000",
  padding: theme.spacing(1),
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
  },
  "& th, & td": {
    border: "1px solid #000",
    padding: "4px",
    fontSize: "0.7rem", // Reduced from 0.8rem
    textAlign: "left",
  },
  "& th": {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  "& a": {
    color: "red",
    textDecoration: "none",
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  border: "1px solid #000",
  padding: theme.spacing(1),
  fontSize: "0.7rem", // Reduced from 0.8rem
  textAlign: "center",
}));

const Invoice = () => {
  return (
    <InvoiceContainer>
      {/* Header */}
      <Header>
        <Box>
          <Logo src="/SFL_logo.png" alt="SFL Worldwide Logo" />
        </Box>
        <CompanyDetails>
          <Typography variant="h6" fontSize="1.1rem">
            SFL Worldwide LLC
          </Typography>
          <Typography>3364 Garden Brook Drive, Farmers Branch, TX 75234</Typography>
          <Typography>Phone: 972-255-7447 Fax: 1-868-609-0778</Typography>
        </CompanyDetails>
      </Header>

      <Typography variant="h4" align="center" gutterBottom fontSize="1.5rem" fontWeight={600}>
        INVOICE
      </Typography>

      {/* Address and Details Table */}
      <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
        <Table>
          <TableBody>
            {/* Row 1: From Address (Left, spans 2 rows), Invoice Number & Invoice Date (Right) */}
            <TableRow>
              <TableCell
                rowSpan={2}
                sx={{
                  borderTop: "1px solid black",
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  verticalAlign: "top",
                  width: "40%",
                  padding: "12px",
                  height: "100px", 
                }}
              >
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  From: Ravinder Oswal
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>46657 Windmill Dr</Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>
                  Fremont, California - 94539, United States
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>14088870120</Typography>
              </TableCell>

              <TableCell sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Invoice Number
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>81674416860</Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Invoice Date
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>Invalid date</Typography>
              </TableCell>
            </TableRow>

            {/* Row 2: Tracking Number & Booking Date (Right) */}
            <TableRow>
              <TableCell sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Tracking Number
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>81674416860</Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Booking Date
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>05/27/2025</Typography>
              </TableCell>
            </TableRow>

            {/* Row 3: To Address (Left, spans 2 rows), Mode of Shipment & Invoice Due Date (Right) */}
            <TableRow>
              <TableCell
                rowSpan={2}
                sx={{
                  borderTop: "1px solid black",
                  borderLeft: "1px solid black",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  verticalAlign: "top",
                  width: "40%",
                  padding: "12px",
                  height: "100px", 
                }}
              >
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  To: M K Jain
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>
                  H-32/7B Lane W10B, Sainik Farms
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>
                  New Delhi, Delhi - 110062, India
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>
                  919810700829, 917678290548
                </Typography>
              </TableCell>

              <TableCell sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Mode of Shipment
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>Air</Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Invoice Due Date
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>Invalid date</Typography>
              </TableCell>
            </TableRow>

            {/* Row 4: Sales Representative (Right, spans both columns) */}
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{ border: "1px solid black", height: "50px", verticalAlign: "top" }}
              >
                <Typography fontWeight="bold" sx={{ fontSize: "0.75rem" }}>
                  Sales Representative
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>Nirav Shah</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Service Type */}
      <Box sx={{ mt: 1 }}>
        <TableContainer component={Paper} sx={{ border: "1px solid black" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem" }}>
                  Service Type - Description
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem", width: 100 }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem", width: 100 }}
                  align="center"
                >
                  Cost
                </TableCell>
                <TableCell
                  sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem", width: 120 }}
                  align="center"
                >
                  Total Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }}> </TableCell>
                  <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }} align="center">
                    {" "}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }} align="center">
                    {" "}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }} align="center">
                    {" "}
                 </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} colSpan={2} sx={{ border: "none" }} />
                <TableCell sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem" }}>
                  Gross Amount:
                </TableCell>
                <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }} align="right">
                  $ 0.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem" }}>
                  Paid on:
                </TableCell>
                <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }} align="right">
                  $ 0.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: "1px solid black", fontWeight: "bold", fontSize: "0.8rem" }}>
                  Balance:
                </TableCell>
                <TableCell sx={{ border: "1px solid black", fontSize: "0.8rem" }} align="right">
                  $ 0.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Payment Methods */}
      <PaymentMethods>
        <PaymentTerms sx={{ mt: -1 }}>
          <Typography fontWeight="bold" fontSize="0.8rem">
            PAYMENT TERMS:
          </Typography>
          <Typography fontSize="0.7rem">
            All charges, as above, must be paid by check or wire transfer within
            seven days from the receipt of our invoice for pickup of your
            shipment. Credit Card will be only accepted for payment under $500.00
            and credit card fees will be charged at 3% if payment is being made by
            Credit Card, if payment is not made by due date fees of $35.00 and
            interest of 14.69% per annum will be applied.
          </Typography>
        </PaymentTerms>
        <Typography fontWeight="bold" fontSize="0.8rem" mt="10px">
          Method of Payment
        </Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.7rem" }}>Zelle Payment</TableCell>
              <TableCell sx={{ fontSize: "0.7rem" }}>Bank (ACH) Payment</TableCell>
              <TableCell sx={{ fontSize: "0.7rem" }}>Credit Card Payment</TableCell>
              <TableCell sx={{ fontSize: "0.7rem" }}>Pay by Mail</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  Zelle payment is fast, safe and secure free bank to bank transfer
                  via your email or phone number.
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  ACH payment is safe, secure and free electronic bank-to-bank
                  payment authorized in USA.
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  On type and value of shipment, credit card fees may be applied on
                  the credit card payments.
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  Below our registered address to mail physical check for your
                  shipment.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  Zelle Email:{" "}
                  <a href="mailto:contact@SFLWorldwide.com">
                    contact@SFLWorldwide.com
                  </a>
                  <br />
                  Zelse Name: SFL Worldwide LLC
                  <br />
                  <Typography color="red" fontSize="0.7rem">
                    Please mention tracking number in memo field
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  <a href="https://www.sflworldwide.com/pay">
                    www.sflworldwide.com/pay
                  </a>
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  <a href="https://www.sflworldwide.com/pay">
                    www.sflworldwide.com/pay
                  </a>
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>
                  SFL Worldwide LLC
                  <br />
                  3364 Garden Brook Drive
                  <br />
                  Farmers Branch, TX 75063
                </TableCell>
              </TableRow>
            </TableBody>
        </Table>
      </PaymentMethods>

      {/* Footer */}
      <Box
        sx={{
          border: "1px solid black",
          padding: 1,
          marginTop: 2,
          fontSize: "0.7rem", // Reduced from 14px (~0.875rem)
        }}
      >
        <Typography fontSize="0.7rem">
          Subject To Texas - United States Jurisdiction
        </Typography>
        <Typography fontSize="0.7rem">
          <Link href="mailto:contact@SFLWorldwide.com" underline="hover">
            contact@SFLWorldwide.com
          </Link>{" "}
          |{" "}
          <Link href="https://www.SFLWorldwide.com" target="_blank" underline="hover">
            www.SFLWorldwide.com
          </Link>{" "}
          | SFL WORLDWIDE LLC | FMC Licence No.: <strong>025184</strong>
        </Typography>
      </Box>
    </InvoiceContainer>
  );
};

export default Invoice;