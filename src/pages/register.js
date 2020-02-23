import { useEffect } from "react";
import { observer } from "mobx-react";
import Head from "next/head";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import NumberFormat from "react-number-format";
import { Container, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import State from "../stores/register";
import { Page, PhotoEditor, Register, CodeStep } from "../components";
import { stylesHook } from "../style/login";

const { Terms, Number, CPF, Profile, Password } = Register;

function Step({ children }) {
  const { container } = stylesHook();

  return <div className={container}>{children}</div>;
}

function RegisterPage({ theme }) {
  const { container } = stylesHook();

  useEffect(() => () => State.clear(), []);

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
            <Step>
              <Number
                error={State.errors.number}
                onChange={({ value }) => State.setNumber(value)}
                next={e => {
                  e.preventDefault && e.preventDefault();
                  State.requestCode();
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
                    value={State.nbr}
                    // value={State.nbr}
                    style={{ fontSize: "1.3rem" }}
                  />
                }
                error={State.errors.code}
                onChange={value => (State.code = value)}
                onSubmit={() => State.sendCode()}
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
