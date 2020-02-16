import { Component } from "react";
import Head from "next/head";
import Router from "next/router";
import { observer } from "mobx-react";
import SwipeableViews from "react-swipeable-views";

import { withStyles } from "@material-ui/core/styles";
import { Container, Typography, Link } from "@material-ui/core";

import { Dashboard, Login } from "../stores";
import {
  Page,
  NumberStep,
  Footer,
  Login as LoginComponents
} from "../components";
import { stylesHook, BottomContent } from "../style/login";

export default observer(function LoginPage() {
  const { container, flexColumn, flexRow, content } = stylesHook();
  return (
    <Page auth={false} redirect="/dashboard">
      <Head>
        <title>Entrar | Conta Guru</title>
      </Head>

      <Container
        component="main"
        maxWidth="xl"
        className={`${container} ${flexRow}`}
        style={{
          height: "100%"
        }}
      >
        <div
          className={`${container} ${flexColumn}`}
          style={{
            width: "100%"
          }}
        >
          <div className={`${container} ${flexColumn} ${content}`}>
            <img src="gx-logo-black.svg" width="50px" height="50px" />

            <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
              Conta
            </Typography>
            <SwipeableViews index={Login.step} disabled={true}>
              <div className={`${container} ${flexColumn}`}>
                <LoginComponents.Identifier
                  autoFocus
                  loading={Login.loading}
                  error={Login.error}
                  next={e => {
                    e.preventDefault && e.preventDefault();
                    Login.sendId();
                  }}
                  onChange={({ value }) => (Login.id = value)}
                />
              </div>
              <div className={`${container} ${flexColumn}`}>
                <LoginComponents.Password
                  user={Login.user}
                  next={e => {
                    e.preventDefault && e.preventDefault();
                    Login.sendCredential();
                  }}
                  onChange={({ value }) => (Login.password = value)}
                />
              </div>
            </SwipeableViews>
          </div>
          <Footer.Small />
        </div>
      </Container>
    </Page>
  );
});
