import React from "react";
import { Container, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box } from "@mui/material";
import { pink } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import { IconBox } from "../../styles/scheduleshipmentStyle";

const ShipmentDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>
            <IconBox>
              <DirectionsBoatIcon sx={{ fontSize: 23, color: "white" }} />
            </IconBox>
            My Shipment
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: pink[500], color: "white", px: 3, py: 1 }}
              endIcon={<SearchIcon />}
            >
              Search Shipment Status
            </Button>
          </Box>
          <Typography
            variant="body1"
            sx={{ backgroundColor: pink[500], color: "white", textAlign: "center", padding: 1, mt: 2 }}
          >
            MY SHIPMENT
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f8f8f8" }}>
                <TableRow>
                  {[
                    "Date",
                    "Tracking",
                    "Sender",
                    "City",
                    "State",
                    "Receiver",
                    "City",
                    "State",
                    "Type",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <TableCell key={heading} sx={{ fontWeight: "bold" }}>
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No rows found
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
            <Button disabled variant="outlined">Previous</Button>
            <Typography>Total rows: 0 of 1</Typography>
            <Select defaultValue={10}>
              <MenuItem value={10}>10 rows</MenuItem>
              <MenuItem value={20}>20 rows</MenuItem>
            </Select>
            <Button disabled variant="outlined">Next</Button>
          </Box>
        </CardContent>
      </Card>
      <Typography align="center" sx={{ mt: 2, fontSize: "12px", color: "gray" }}>
        All Rights Reserved. Site Powered by <span style={{ color: pink[500] }}>SFL Worldwide</span>
      </Typography>
    </Container>
  );
};

export default ShipmentDashboard;