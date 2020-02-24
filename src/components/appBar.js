import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowBackIos as ArrowBackIosIcon } from "@material-ui/icons";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

import { App } from "../stores";

function AppBarComponent({ theme, homeLink = "/", children }) {
  const router = useRouter();
  const showBackButton =
    router.route === "/dashboard/history" ||
    router.route === "/dashboard/photo";

  return (
    <AppBar>
      <Container maxWidth="sm" disableGutters>
        <Toolbar>
          {showBackButton && (
            <IconButton
              aria-label="voltar"
              onClick={e => window.history.back()}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <div style={{ flexGrow: 1 }} />
          <Link href={homeLink}>
            <img
              src={`${App.baseURL}/${
                theme && theme.palette.type === "dark"
                  ? "gx-logo-white.svg"
                  : "gx-logo-black.svg"
              }`}
              width="30px"
              height="30px"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            />
          </Link>
          {children ? (
            children
          ) : router.route !== "/login" ? (
            <Link href="/login">
              <Button>Entrar</Button>
            </Link>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default withTheme(observer(AppBarComponent));
