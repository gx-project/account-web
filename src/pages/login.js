import Head from "next/head";
import { observer } from "mobx-react";
import SwipeableViews from "react-swipeable-views";

import { withTheme } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import App, { Login } from "../stores";
import { Page, CodeStep, Login as LoginComponents } from "../components";
import { stylesHook } from "../style/login";

const Step = withTheme(function({ theme, ...props }) {
  const { container, flexColumn } = stylesHook();

  return <div className={`${container} ${flexColumn}`} {...props} />;
});

function LoginPage() {
  const { container } = stylesHook();
  return (
    <Page auth={false} redirect="/dashboard">
      <Head>
        <title>Entrar | Conta Guru</title>
      </Head>
      <Container component="main" maxWidth="sm" className={container}>
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
              loading={App.loading}
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
              loading={App.loading}
              next={e => {
                e.preventDefault && e.preventDefault();
                Login.sendCredential();
              }}
              onChange={({ value }) => (Login.password = value)}
            />
          </Step>
          <Step>
            <CodeStep
              to={Login.codeTarget}
              error={Login.error}
              onSubmit={() => Login.sendCode()}
              onChange={value => (Login.code = value)}
            />
          </Step>
        </SwipeableViews>
      </Container>
    </Page>
  );
}

export default observer(LoginPage);
