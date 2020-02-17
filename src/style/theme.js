import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#0da2ff"
    },
    secondary: {
      main: "#0094ff"
    },
    background: { default: "#000" },
    type: "dark"
  },
  shape: {
    borderRadius: 3
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      containedPrimary: {
        // Some CSS
        backgroundColor: "transparent !important",
        background:
          "linear-gradient(0deg, lime 1%, #00FFDD 3%,#00a1ff 6%, #0072ff 10%, #0059ff 20%)",
        // "linear-gradient(0deg, lime 1%, #00FFDD 4%,#00a1ff 9%, #0059ff 14%, #002386 36%)",
        // "linear-gradient(5deg, lime, #00FFDD 7%,#00a1ff 11%, #0059ff 14%, #002386 29%, #00081d00 49%, #00326f 90%, #00f3ff 94%, lime 95%)",
        // "linear-gradient(99deg, #00FFDD 2%,#00a1ff 10%, #0059ff 26%, #002386, #00021d)",
        textShadow: "0 1px 2px #000",
        border: 0,
        color: "white"
      }
    },
    MuiExpansionPanel: {
      root: {
        backgroundColor: "#0a0a0a"
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "#0a0a0a"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        background:
          "linear-gradient(180deg, #00fff3 1px, #0059ff 2px, #000000 8px)",
        color: "#fff"
      }
    },
    MuiToolbar: {
      root: {
        background:
          "linear-gradient(180deg, #00fff3 1px, #0059ff 2px, #000000 8px)"
      }
    }
  }
});
