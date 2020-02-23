import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  MoreVert as MoreIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ExitToApp as ExitToAppIcon,
  Notifications as NotificationsIcon,
  Brightness7 as DayIcon,
  Brightness4 as NightIcon
} from "@material-ui/icons";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Menu,
  MenuItem
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

import App, { Dashboard } from "../stores";

function AppBarComponent({ theme, homeLink = "/", append = null }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const showBackButton =
    router.route === "/dashboard/history" ||
    router.route === "/dashboard/photo";

  function logout(e) {
    e.preventDefault();

    Dashboard.logout();
  }

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    App.toggleTheme();
  };

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
          {append}
          {Dashboard.token ? (
            <>
              <IconButton aria-label="abrir notificações">
                <NotificationsIcon />
              </IconButton>
              <IconButton
                aria-label="encerrar sessão"
                onClick={handleMenuClick}
              >
                <MoreIcon />
              </IconButton>
              <Menu
                id="appbar-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={toggleTheme}>
                  {App.theme === "dark" ? <NightIcon /> : <DayIcon />}
                  <div style={{ paddingLeft: theme.spacing(2) }}>
                    Tema: {App.theme === "dark" ? "Escuro" : "Claro"}
                  </div>
                </MenuItem>
                <MenuItem aria-label="encerrar sessão" onClick={logout}>
                  <ExitToAppIcon />
                  <div style={{ paddingLeft: theme.spacing(2) }}>Sair</div>
                </MenuItem>
              </Menu>
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
}

export default withTheme(observer(AppBarComponent));
