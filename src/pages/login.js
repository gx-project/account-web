import Head from "next/head";
import { observer } from "mobx-react";
import SwipeableViews from "react-swipeable-views";

import { withTheme } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import { Login } from "../stores";
import {
  Page,
  Footer,
  CodeStep,
  Login as LoginComponents
} from "../components";
import { stylesHook } from "../style/login";

const Step = withTheme(function({ theme, ...props }) {
  const { container, flexColumn } = stylesHook();

  return (
    <div
      className={`${container} ${flexColumn}`}
      style={{
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }}
      {...props}
    />
  );
});

export default observer(function LoginPage() {
  const { container, flexColumn, flexRow, content } = stylesHook();
  return (
    <Page auth={false} redirect="/dashboard">
      <Head>
        <title>Entrar | Conta Guru</title>
      </Head>

      <Container
        component="main"
        maxWidth="sm"
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
            <img src="gx-logo-white.svg" width="50px" height="50px" />

            <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
              Entrar
            </Typography>
            <SwipeableViews
              index={Login.step}
              disabled={true}
              style={{ width: "100%" }}
            >
              <Step>
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
              </Step>
              <Step>
                <LoginComponents.Password
                  user={Login.user}
                  next={e => {
                    e.preventDefault && e.preventDefault();
                    Login.sendCredential();
                  }}
                  onChange={({ value }) => (Login.password = value)}
                />
              </Step>
              <Step>
                <CodeStep
                  loading={Login.loading}
                  error={Login.error}
                  onSubmit={() => Login.sendCode()}
                  onChange={value => (Login.code = value)}
                />
              </Step>
            </SwipeableViews>
          </div>
          <Footer.Small />
        </div>
      </Container>
    </Page>
  );
});
