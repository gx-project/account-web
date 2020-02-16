import { observer } from "mobx-react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";

import Page from "../../components/page";
import { stylesHook } from "../../style/dashboard";

export default observer(function HistoryPage() {
  const classes = stylesHook();
  return (
    <Page auth={true} redirect="/login">
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
    </Page>
  );
});
