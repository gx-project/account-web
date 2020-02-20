import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ExitToApp as ExitToAppIcon,
  Notifications as NotificationsIcon
} from "@material-ui/icons";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

import App, { Dashboard } from "../stores";

export default withTheme(
  observer(function AppBarComponent({ theme, homeLink = "/", append = null }) {
    const router = useRouter();
    const showBackButton =
      router.route === "/dashboard/history" ||
      router.route === "/dashboard/photo";
    console.log(router.route);
    return (
      <AppBar>
        <Container maxWidth="sm" disableGutters>
          <Toolbar>
            {showBackButton && (
              <IconButton
                aria-label="encerrar sessão"
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
            {append}
            {Dashboard.token ? (
              <>
                <IconButton color="inherit" aria-label="abrir notificações">
                  <NotificationsIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="encerrar sessão">
                  <ExitToAppIcon />
                </IconButton>
              </>
            ) : router.route !== "/login" ? (
              <Link href="/login">
                <Button>Entrar</Button>
              </Link>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    );
  })
);
