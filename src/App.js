import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "./components/Layout";

import theme from "./helpers/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
