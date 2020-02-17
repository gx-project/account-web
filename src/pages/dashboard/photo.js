import { useState } from "react";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  Container,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";

import { Page, PhotoEditor } from "../../components";
import { stylesHook } from "../../style/dashboard";

export default function History() {
  const classes = stylesHook();
  const [[open, result], setAlert] = useState([false, false]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert([false, result]);
  };

  return (
    <Page auth={true} redirect="/login" className={classes.historyRoot}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="voltar"
              onClick={() => {
                Router.push("/dashboard");
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" className={classes.historyRoot}>
              Foto de perfil
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth="md"
        style={{ display: "flex", alignItems: "center", minHeight: "80%" }}
      >
        <PhotoEditor
          title={false}
          style={{ maxWidth: "400px", margin: "0 auto" }}
          onResult={result => {
            setAlert([true, result]);
          }}
          /* current={AppState.user.photo} */
        />
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          {result ? "Foto atualizada com sucesso" : "Tente novamente"}
        </Alert>
      </Snackbar>
    </Page>
  );
}
