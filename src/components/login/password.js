import { observer } from "mobx-react";
import { Link as RouterLink } from "next/router";
import {
  Avatar,
  Button,
  Typography,
  FormControl,
  Grid,
  FormHelperText,
  IconButton
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

import LoginState from "../../stores/login";
import StepButton from "../stepButton";
import PasswordInput from "../passwordInput";
import Bottom from "./bottom";

function NumberStep({ user, next, loading, error }) {
  return (
    <>
      {user && (
        <>
          <Avatar
            style={{ width: "80px", height: "80px", margin: "0 auto" }}
            src={user.photo}
          />
          <Typography
            style={{ marginTop: "3%", textTransform: "capitalize" }}
            component="h3"
            variant="subtitle1"
          >
            {user.fn}
          </Typography>
        </>
      )}
      <form onSubmit={next} style={{ width: "100%" }}>
        <PasswordInput
          margin="normal"
          fullWidth
          id="pw"
          label="Senha"
          error={!!error}
          onChange={({ target: { value } }) => {
            LoginState.password = value;
          }}
        />
        <FormControl error style={{ display: error ? "initial" : "none" }}>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <Grid container>
          <Grid item xs style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="voltar"
              onClick={e => LoginState.setStep(0)}
            >
              <ArrowBackIos />
            </IconButton>
          </Grid>
          <Grid item>
            <StepButton
              onClick={next}
              disabled={loading}
              style={{ alignSelf: "flex-end" }}
            >
              entrar
            </StepButton>
          </Grid>
        </Grid>
      </form>
      <Bottom>
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          href="/recover"
        >
          Esqueci minha senha
        </Button>
      </Bottom>
    </>
  );
}

export default observer(NumberStep);
