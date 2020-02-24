import { useEffect } from "react";
import { observer } from "mobx-react";
import Head from "next/head";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import NumberFormat from "react-number-format";
import { Container, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { Register as RegisterStore } from "../stores";

import Page from "../components/page";
import PhotoEditor from "../components/photoEditor";
import CodeStep from "../components/code";
import { Terms, Number, CPF, Profile, Password } from "../components/register";

import { stylesHook } from "../style/login";

function Step({ children }) {
  const { container } = stylesHook();

  return <div className={container}>{children}</div>;
}

function RegisterPage({ theme }) {
  const { container } = stylesHook();

  useEffect(() => () => RegisterStore.clear(), []);

  return (
    <Page auth={false} redirect="/dashboard">
      <Head>
        <title>Cadastro | Conta Guru</title>
      </Head>
      <Container component="main" maxWidth="sm" className={container}>
        {!RegisterStore.termsAccept ? (
          <Terms />
        ) : (
          <SwipeableViews
            index={RegisterStore.step}
            disabled={true}
            style={{ width: "100%" }}
          >
            <Step>
              <Number
                error={RegisterStore.errors.number}
                onChange={({ value }) => RegisterStore.setNumber(value)}
                next={e => {
                  e.preventDefault && e.preventDefault();
                  RegisterStore.requestCode();
                }}
                Top={
                  <Typography
                    style={{
                      margin: theme.spacing(2, 0),
                      textAlign: "center"
                    }}
                    component="h1"
                    variant="h5"
                  >
                    Ciar conta
                  </Typography>
                }
              />
            </Step>
            <Step>
              <CodeStep
                title="Código"
                to={
                  <NumberFormat
                    displayType="text"
                    isNumericString
                    format="(##) #####-####"
                    value={RegisterStore.nbr}
                    // value={State.nbr}
                    style={{ fontSize: "1.3rem" }}
                  />
                }
                error={RegisterStore.errors.code}
                onChange={value => (RegisterStore.code = value)}
                onSubmit={() => RegisterStore.sendCode()}
              />
            </Step>
            <Step children={<CPF />} />
            <Step children={<Profile />} />
            <Step children={<Password />} />
            <Step>
              <Typography
                style={{ margin: theme.spacing(2, 0), textAlign: "center" }}
                component="h1"
                variant="h5"
              >
                Escolha uma foto de perfil
              </Typography>
              <PhotoEditor
                onResult={result => {
                  if (result) {
                    Router.push("/obrigado");
                  }
                }}
              />
            </Step>
          </SwipeableViews>
        )}
      </Container>
    </Page>
  );
}

export default withTheme(observer(RegisterPage));
