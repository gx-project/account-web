import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import NumberFormat from "react-number-format";
import Grid from "@material-ui/core/Grid";

import { stylesHook, BottomContent } from "../../style/login";
import RichInput from "../richInput";

import State from "../../stores/register";

import { regex } from "../../utils";

import PasswordInput from "../passwordInput";
import StepButton from "../stepButton";

function PasswordStep(props) {
  const { container, flexColumn, button } = stylesHook();
  const { password: error } = State.errors;
  return (
    <div {...props}>
      <div className={`${container} ${flexColumn}`}>
        <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
          Senha
        </Typography>
        <Typography
          style={{ marginBottom: "3%", width: "100%" }}
          component="h3"
          variant="subtitle1"
        >
          <strong>Agora só falta uma senha para proteger sua conta.</strong>
          <br />
          Precisa ter no mínimo 6 caracteres.
        </Typography>
      </div>
      <form
        onSubmit={e => {
          e && e.preventDefault();
          State.finish();
        }}
      >
        <PasswordInput
          autoFocus
          margin="normal"
          fullWidth
          id="pw"
          label="Senha"
          onChange={({ target: { value } }) => {
            State.setPassword(value);
          }}
          error={!!error}
        />
        <FormControl error style={{ display: error ? "initial" : "none" }}>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <StepButton loading={State.loading}>confirmar</StepButton>
      </form>
    </div>
  );
}

export default observer(PasswordStep);
