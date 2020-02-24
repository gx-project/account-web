import { useState } from "react";
import { observer } from "mobx-react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import {
  MoreVert as MoreIcon,
  ExitToApp as ExitToAppIcon,
  Notifications as NotificationsIcon,
  Brightness7 as DayIcon,
  Brightness4 as NightIcon
} from "@material-ui/icons";

import { App, Dashboard } from "../../stores";
import AppBarComponent from "../appBar";

function DashboardAppBar({ theme }) {
  const [anchorEl, setAnchorEl] = useState(null);

  function logout(e) {
    e.preventDefault();

    Dashboard.logout();
    setAnchorEl(null);
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
    <AppBarComponent>
      <IconButton aria-label="abrir notificações">
        <NotificationsIcon />
      </IconButton>
      <IconButton aria-label="encerrar sessão" onClick={handleMenuClick}>
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
    </AppBarComponent>
  );
}

export default withTheme(observer(DashboardAppBar));
