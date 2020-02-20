import { observer } from "mobx-react";
import Head from "next/head";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import { AppBar, Container, Typography } from "@material-ui/core";

import State from "../stores/register";
import { Page, PhotoEditor, Register, CodeStep } from "../components";
import { stylesHook } from "../style/login";

const { Terms, Number, CPF, Profile, Password } = Register;

function Step({ children }) {
  const { container } = stylesHook();

  return <div className={container}>{children}</div>;
}

export default observer(function RegisterPage() {
  const { container } = stylesHook();

  return (
    <Page auth={false} redirect="/dashboard">
      <Head>
        <title>Cadastro | Conta Guru</title>
      </Head>
      <Container component="main" maxWidth="sm" className={container}>
        {!State.termsAccept ? (
          <Terms />
        ) : (
          <SwipeableViews
            index={State.step}
            disabled={true}
            style={{ width: "100%" }}
          >
            <Step index={0}>
              <Number
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
    </Page>
  );
});
