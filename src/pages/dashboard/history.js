import Router from "next/router";
import Container from "@material-ui/core/Container";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { stylesHook } from "../../style/dashboard";

export default function History() {
  const classes = stylesHook();

  return (
    <div className={classes.historyRoot}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="voltar"
              onClick={() => {
                // Router.push("/dashboard");
                window.history.back();
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" className={classes.historyRoot}>
              Histórico
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
