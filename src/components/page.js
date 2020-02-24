import { Component } from "react";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { Box, Typography, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

import { App, Dashboard } from "../stores";
import LoadingPage from "../components/loadingPage";

class PageWrapper extends Component {
  state = {
    render: false
  };

  async componentDidMount() {
    if (!Dashboard.initialized) {
      await Dashboard.init();
    }

    switch (this.props.auth) {
      case true:
        if (!Dashboard.token) return Router.push(this.props.redirect || "/");
        break;
      case false:
        if (Dashboard.token) return Router.push(this.props.redirect || "/");
        break;
    }
    this.setState({ render: true });
  }

  render() {
    const { render } = this.state;
    const { children, loader, auth, redirect, classes, ...props } = this.props;
    return render ? (
      <>
        <div className={classes.root} style={{ paddingTop: 64 }} {...props}>
          {children}
          <Snackbar
            open={App.message.open}
            autoHideDuration={App.message.duration}
            onClose={(e, reason) => App.handleCloseMessage(e, reason)}
          >
            <Alert
              onClose={(e, reason) => App.handleCloseMessage(e, reason)}
              severity={App.message.type}
              variant={App.message.variant}
            >
              {App.message.content}
            </Alert>
          </Snackbar>
          <Box mt={2} className={classes.footer} component="footer">
            <Typography variant="body2" color="textSecondary" align="center">
              <Link color="inherit" href="#">
                Fundação Guru
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </div>
      </>
    ) : (
      loader || <LoadingPage />
    );
  }
}

export default withStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh"
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto"
  }
}))(PageWrapper);
