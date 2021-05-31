import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import LoginForm from "./components/Login/LoginForm";
import Home from "./components/Home/Home";
import theme from "./helpers/theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={LoginForm} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
