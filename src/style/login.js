import { makeStyles } from "@material-ui/core/styles";

export const styles = theme => ({
  logo: {
    margin: "-50% 0 5px 0"
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    paddingTop: 70
  },
  flexColumn: {},
  flexRow: {
    flexDirection: "row"
  },
  content: {
    maxWidth: "100%",
    minWidth: "280px"
  },
  button: {
    margin: "10px 0"
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "0 auto"
  }
});

export const stylesHook = makeStyles(styles);
