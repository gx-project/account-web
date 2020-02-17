import { observer } from "mobx-react";
import Head from "next/head";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import { Container, Typography } from "@material-ui/core";

import State from "../stores/register";
import {
  Page,
  NumberStep,
  PhotoEditor,
  Register,
  Footer,
  CodeStep
} from "../components";
import { stylesHook } from "../style/login";

const { Terms, CPF, Profile, Password } = Register;

function makeStyle(step) {
  return {
    transition: "height .3s ease-in-out",
    height: State.step === step ? "auto" : "50px"
  };
}

function Step({ index, children }) {
  const { container, flexColumn } = stylesHook();

  return (
    <div className={`${container} ${flexColumn}`} style={makeStyle(index)}>
      {children}
    </div>
  );
}

export default observer(function RegisterPage() {
  const { container, flexColumn, flexRow, content } = stylesHook();

  return (
    <Page auth={false} redirect="/dashboard">
      <Head>
        <title>Cadastro | Conta Guru</title>
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
            <img src="gx-logo-black.svg" width="50px" height="50px" />
            <Container maxWidth="sm">
              {!State.termsAccept ? (
                <Terms />
              ) : (
                <SwipeableViews index={State.step} disabled={true}>
                  <Step index={0}>
                    <NumberStep
                      error={State.errors.number}
                      loading={State.loading}
                      onChange={({ value }) => State.setNumber(value)}
                      next={e => {
                        e.preventDefault && e.preventDefault();
                        State.requestCode();
                      }}
                      Top={
                        <Typography
                          style={{ margin: "5% 0", textAlign: "center" }}
                          component="h1"
                          variant="h5"
                        >
                          Ciar conta
                        </Typography>
                      }
                    />
                  </Step>
                  <Step index={1}>
                    <CodeStep
                      title="Código"
                      to={State.nbr}
                      error={State.errors.code}
                      loading={State.loading}
                      onChange={value => (State.code = value)}
                      onSubmit={() => State.sendCode()}
                    />
                  </Step>
                  <Step index={2} children={<CPF />} />
                  <Step index={3} children={<Profile />} />
                  <Step index={4} children={<Password />} />
                  <Step index={5}>
                    <PhotoEditor
                      onResult={result => {
                        result && Router.push("/obrigado");
                      }}
                    />
                  </Step>
                </SwipeableViews>
              )}
            </Container>
          </div>
          <Footer.Small />
        </div>
      </Container>
    </Page>
  );
});
