import { makeStyles, withStyles } from "@material-ui/core/styles";

import CreateIcon from "@material-ui/icons/Create";

export const EditIcon = withStyles(theme => ({
  root: {
    width: 28,
    height: 28,
    background: "#383838",
    borderRadius: "50%",
    padding: "6px"
  }
}))(CreateIcon);

export const styles = theme => ({
  root: {
    maxWidth: "400px",
    alignItems: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    height: "140px"
  },
  avatarContainer: {
    width: "130px",
    height: "130px",
    left: "50%",
    transform: "translateX(-50%)"
  },
  avatar: {
    width: "130px",
    height: "130px",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    border: "5px solid #212121"
  },
  name: {
    textAlign: "center",
    textTransform: "capitalize"
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  expansionPanelContent: {
    padding: theme.spacing(4),
    paddingTop: 0
  },
  historyLink: {
    cursor: "pointer",
    marginTop: theme.spacing(2),
    padding: `12px ${theme.spacing(3)}px`,
    fontSize: theme.typography.body1.fontSize
  },
  historyRoot: {
    flexGrow: 1,
    height: "100%"
  },
  historyMenuButton: {
    marginRight: theme.spacing(2)
  },
  accountPaper: {
    margin: theme.spacing(2),
    marginTop: 0,
    padding: theme.spacing(2),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : theme.palette.grey[100]
  },
  divider: {
    marginTop: `${theme.spacing(2)}px !important`,
    marginBottom: `${theme.spacing(2)}px !important`
  }
});

export const stylesHook = makeStyles(styles);
