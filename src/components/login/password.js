import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import PasswordInput from "../passwordInput";

import LoginState from "../../stores/login";
import StepButton from "../stepButton";
import { stylesHook, BottomContent } from "../../style/login";

function next(e) {
  e && e.preventDefault();
  if (LoginState.password.length > 5) {
    LoginState.sendCredential();
  }
}

function NumberStep() {
  const { container, flexColumn } = stylesHook();

  const error = !!LoginState.error;

  return (
    <>
      <div className={`${container} ${flexColumn}`}>
        <Avatar
          style={{ width: "80px", height: "80px", margin: "0 auto" }}
          src={LoginState.user.photo}
        />
        <Typography
          style={{ marginTop: "3%", textTransform: "capitalize" }}
          component="h3"
          variant="subtitle1"
        >
          {LoginState.user.fn}
        </Typography>
      </div>
      <form onSubmit={next}>
        <PasswordInput
          autoFocus
          margin="normal"
          fullWidth
          id="pw"
          label="Senha"
          error={error}
          onChange={({ target: { value } }) => {
            LoginState.setPassword(value);
          }}
        />
        <FormControl error style={{ display: error ? "initial" : "none" }}>
          <FormHelperText>{LoginState.error}</FormHelperText>
        </FormControl>
        <StepButton onClick={next} loading={LoginState.loading}>
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
