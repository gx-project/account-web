import { observer } from "mobx-react";
import {
  Avatar,
  Link,
  Typography,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import LoginState from "../../stores/login";
import { StepButton, PasswordInput } from "../";
import { BottomContent } from "../../style/login";

function next(e) {
  e && e.preventDefault();
  if (LoginState.password.length > 5) {
    LoginState.sendCredential();
  }
}

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
        <StepButton onClick={next} loading={loading}>
          entrar
        </StepButton>
      </form>
      <BottomContent>
        <Link href="#" variant="body2">
          Esqueci minha senha
        </Link>
      </BottomContent>
    </>
  );
}

export default observer(NumberStep);
