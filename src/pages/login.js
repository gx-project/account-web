import { Component, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import SwipeableViews from "react-swipeable-views";

import { Dashboard, Login } from "../stores";

import { LoadingPage, NumberStep, Footer } from "../components";
import { Password } from "../components/login";

import { styles, BottomContent } from "../style/login";

@observer
class LoginIndex extends Component {
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
          <title>Entrar | Conta Guru</title>
        </Head>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
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

                <Typography
                  style={{ margin: "5% 0" }}
                  component="h1"
                  variant="h5"
                >
                  Conta
                </Typography>
                <SwipeableViews index={Login.step} disabled={true}>
                  <NumberStep
                    index={0}
                    error={Login.error}
                    next={e => {
                      e.preventDefault && e.preventDefault();
                      if (Login.number.length === 11 && !Login.error) {
                        Login.checkNumber();
                      }
                      return false;
                    }}
                    onChange={({ value }) => Login.setNumber(value)}
                    Bottom={
                      <BottomContent style={{ marginTop: "20%" }}>
                        <Link href="/register" variant="body2">
                          Criar conta
                        </Link>
                      </BottomContent>
                    }
                  />
                  <Password index={1} />
                </SwipeableViews>
              </div>
              <Footer.Small />
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginIndex);
/*
const Index = observer(() => {
  const { container, flexColumn, flexRow, content } = styles();
});

Index.getInitialProps = ({ req }) => {};

export default Index;
*/
