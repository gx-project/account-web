import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { observer } from "mobx-react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppState from "../stores/app";
import { dark, light } from "../style/theme";

const themes = { dark, light };

Router.events.on("routeChangeStart", () => AppState.setLoading(true));
Router.events.on("routeChangeComplete", () => AppState.setLoading(false));

@observer
class GXAccountApp extends App {
  static getInitialProps({ req }) {
    if (req) {
      const protocol = req.headers["x-forwarded-proto"];
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      AppState.baseURL = `${protocol}://${host}`;
      return {};
    }

    if (typeof window !== "undefined")
      AppState.baseURL = window.location.origin;

    return {};
  }

  constructor() {
    super();
    if (typeof window !== "undefined") {
      AppState.init();
    }
  }

  async componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Contas — Guru - Escolha bem o seu.</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta name="description" content="Conta Guru, de todos para todos." />
        </Head>
        <ThemeProvider theme={themes[AppState.theme]}>
          <CssBaseline />
          <Component {...pageProps} style={{ paddingTop: 64 }} />
          <div
            className={`gx-line-container${AppState.loading ? " loading" : ""}`}
          >
            <div className="gx-line" />
          </div>
          <style jsx>{`
            .gx-line-container {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 3px;
              transition: 0.3s transform;
              transform: translateY(1px);
            }
            .gx-line {
              width: 200%;
              height: 3px;
              background: linear-gradient(
                90deg,
                #00fff3,
                #007eff,
                #00fff3,
                #007eff,
                #00fff3,
                #007eff
              );
              animation: gxline 0.7s ease infinite alternate;
              animation-play-state: paused;
            }

            .gx-line-container.loading {
              transform: translateY(0);
            }

            .gx-line-container.loading .gx-line {
              animation-play-state: running;
              box-shadow: 0 0 5px 2px #0088e9, 0 0 19px 3px #0051e9;
            }

            @keyframes gxline {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </ThemeProvider>
      </>
    );
  }
}

export default GXAccountApp;
