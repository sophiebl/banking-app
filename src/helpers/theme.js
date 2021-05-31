import { createMuiTheme } from "@material-ui/core/styles";

const getDefaultThemeType = () => {
  if (process.browser) {
    const userTheme = localStorage.getItem("journalbook_theme");
    if (userTheme !== null) {
      return userTheme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

export const defaultThemeType = getDefaultThemeType();
const isLight = (type) => type !== "dark";

export const secondaryBackgroundColor = () =>
  defaultThemeType !== "dark" ? "#ffe5e3" : "#ef5350";

export const themeObjectForType = (type) => ({
  palette: {
    type,
    primary: isLight(type)
      ? { main: "#7B61FF", light: "#FFF", dark: "#4558DD" }
      : { main: "#9670FF", light: "#ab8cff", dark: "#694eb2" },
    secondary: { main: "#00CEA7", light: "#f75b81", dark: "#ab2344" },
  },
  typography: {
    h1: {
      fontSize: 80,
      fontWeight: 500,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
    },
    h4: {
      fontWeight: 300,
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
      color: "#979797",
    },
    h6: {
      fontSize: 16,
      fontWeight: 500,
      color: "#FFF",
    },
    body1: {
      fontWeight: 500,
    },
  },
  button: {
    textTransform: "lowercase",
  },
  props: {
    MuiPaper: {
      square: true,
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        borderRadius: 16,
      },
    },
  },
});

export const themeObject = themeObjectForType(defaultThemeType);
export const themeForType = (type) => createMuiTheme(themeObjectForType(type));

const theme = createMuiTheme(themeObject);
export default theme;
