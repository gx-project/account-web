import { Component } from "react";
import { observer } from "mobx-react";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { Box, Typography, Link } from "@material-ui/core";

import DashboardState from "../stores/dashboard";
import LoadingPage from "../components/loadingPage";

@observer
class PageWrapper extends Component {
  state = {
    render: false
  };

  async initDashboardStore() {
    if (DashboardState.loading) {
      await DashboardState.init();
    }
  }

  async componentDidMount() {
    await this.initDashboardStore();

    if (this.props.auth && !DashboardState.token) {
      return Router.push(this.props.redirect || "/");
    }

    if (this.props.auth === false && DashboardState.token) {
      return Router.push(this.props.redirect || "/");
    }

    this.setState({ render: true });
  }

  render() {
    const { render } = this.state;
    const { children, loader, auth, redirect, classes, ...props } = this.props;
    return render ? (
      <>
        <div className={classes.root} {...props}>
          {children}
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
