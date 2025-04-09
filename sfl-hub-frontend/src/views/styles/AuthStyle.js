// ResetPasswordStyles.js
import { styled } from "@mui/material/styles";
import { Box, Paper, Button } from "@mui/material";

export const BackgroundContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: "url('/login-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  textAlign: "center",
  position: "relative",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  borderTop: "5px solid #d9040c",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#d9040c",
  boxShadow: "1px 1px 3px red",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#b9030a",
  },
}));
