import { Component } from "react";
import { observer } from "mobx-react";
import Router from "next/router";

import DashboardState from "../stores/dashboard";
import LoadingPage from "../components/loadingPage";

@observer
export default class PageWrapper extends Component {
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

    if (!this.props.auth && DashboardState.token) {
      return Router.push(this.props.redirect || "/");
    }

    this.setState({ render: true });
  }

  render() {
    const { render } = this.state;
    const { children, loader, auth, redirect, ...props } = this.props;
    return render ? (
      <>
        <div id="gx-page-root" {...props}>
          {children}
        </div>
        <style jsx>{`
          #gx-page-root {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </>
    ) : (
      loader || <LoadingPage />
    );
  }
}
