import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RegisterProvider } from "./views/RegisterContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterProvider>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </RegisterProvider>
  </StrictMode>,
)
