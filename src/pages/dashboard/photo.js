import Router from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";

import AppState from "../../stores";
import { Page, PhotoEditor } from "../../components";
import { stylesHook } from "../../style/dashboard";

export default function Photo() {
  const classes = stylesHook();
  return (
    <Page auth={true} redirect="/login">
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
            <Typography variant="h6">Foto de perfil</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md">
        <PhotoEditor
          style={{ maxWidth: "400px", margin: "0 auto" }}
          onResult={result => {
            AppState.setMessage({
              content: result ? "Foto atualizada" : "Tente novamente",
              type: result ? "success" : "error"
            });
          }}
        />
      </Container>
    </Page>
  );
}
