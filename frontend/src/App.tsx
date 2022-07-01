import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Main } from "./Main";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container
          disableGutters
          sx={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Main />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
