import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  mainButton: {
    textTransform: "uppercase",
    fontWeight: "bold",
    padding: "8px 16px",
  },
  menuPaper: {
    width: 250,
    maxHeight: 400,
    borderRadius: 0,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
  },
  menuItem: {
    padding: "8px 16px",
  },
  searchButtonContainer: {
    position: "sticky",
    bottom: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: "8px 16px",
    borderTop: "1px solid #e0e0e0",
  },
  searchButton: {
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "100%",
  },
  tableHead: {
    backgroundColor: "#f8f8f8",
  },
  tableCell: {
    fontWeight: "bold",
  },
  footerTypography: {
    marginTop: 2,
    fontSize: "12px",
    color: "gray",
  },
  tableContainer: {
    marginTop: 2,
  },
  sflLink: {
    color: "red",
  },
  iconBox: {
    fontSize: 25,
    color: "white",
  },
  editIcon: {
    color: "#1976d2", // Blue color for the edit icon (customize as needed)
    fontSize: "20px", // Adjust size
    "&:hover": {
      color: "#115293", // Darker blue on hover
    },
  },
});