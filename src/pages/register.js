import { Component } from "react";

import { observer } from "mobx-react";

import Head from "next/head";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import {
  NumberStep,
  LoadingPage,
  PhotoEditor,
  Register,
  Footer
} from "../components";

import State from "../stores/register";
import { Dashboard } from "../stores";

import { styleBuilder } from "../style/login";

const { Terms, Code, CPF, Profile, Password } = Register;

function makeStyle(step) {
  return {
    transition: "height .3s ease-in-out",
    height: State.step === step ? "auto" : "50px"
  };
}

@observer
class RegisterPage extends Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    if (await Dashboard.hasToken()) {
      return Router.push("/dashboard");
    }

    this.setState({ loading: false });
  }
  render() {
    const { container, flexColumn, flexRow, content } = this.props.classes;

    return (
      <>
        <Head>
          <title>Cadastro | Conta Guru</title>
        </Head>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
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
                    <TermsStep />
                  ) : (
                    <SwipeableViews index={State.step} disabled={true}>
                      <NumberStep
                        style={makeStyle(0)}
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
                      <Code style={makeStyle(1)} />
                      <CPF style={makeStyle(2)} />
                      <Profile style={makeStyle(3)} />
                      <Password style={makeStyle(4)} />
                      <PhotoEditor
                        style={makeStyle(5)}
                        onSuccess={() => {
                          Router.push("/obrigado");
                        }}
                      />
                    </SwipeableViews>
                  )}
                </Container>
              </div>
              <Footer.Small />
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default withStyles(styleBuilder, { withTheme: true })(RegisterPage);
