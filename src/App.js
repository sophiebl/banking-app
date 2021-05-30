import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "./components/Layout";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
