import "../style/base.css";
import React from "react";
import App from "next/app";
import Head from "next/head";

import { observer } from "mobx-react";
import storage from "localforage";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../style/theme";

if (typeof window !== "undefined") {
  storage.config({
    name: "GuruWebApp",
    version: 1.0,
    storeName: "Account"
  });
}

@observer
class GXAccountApp extends App {
  async componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Conta Guru</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default GXAccountApp;
