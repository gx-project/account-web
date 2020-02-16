import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import NumberFormat from "react-number-format";

import { stylesHook, BottomContent } from "../../style/login";

import State from "../../stores/register";

import StepButton from "../stepButton";

function CPFStep(props) {
  const { container, flexColumn, button } = stylesHook();

  return (
    <div {...props}>
      <div className={`${container} ${flexColumn}`}>
        <Typography style={{ margin: "5% 0 3% 0" }} component="h1" variant="h5">
          CPF
        </Typography>
        <Typography
          style={{ marginBottom: "3%", width: "100%", fontWeight: "bold" }}
          component="h3"
          variant="subtitle1"
        >
          Para aumentar a segurança da plataforma solicitamos e verificamos
          sempre o CPF dos usuários, com o fim de evitar os mal-intencionados.
        </Typography>
      </div>
      <form
        onSubmit={e => {
          e && e.preventDefault();
          State.sendCPF();
        }}
      >
        <NumberFormat
          onValueChange={({ value }) => {
            State.setCPF(value);
          }}
          isNumericString
          format="### . ### . ### - ##"
          customInput={TextField}
          error={!!State.errors.cpf}
          label="CPF"
          fullWidth
          style={{
            marginBottom: "10px"
          }}
        />
        <FormControl
          error
          style={{ display: State.errors.cpf ? "initial" : "none" }}
        >
          <FormHelperText>{State.errors.cpf}</FormHelperText>
        </FormControl>

        <NumberFormat
          onValueChange={values => State.setBirth(values)}
          isNumericString
          format="##/##/####"
          customInput={TextField}
          error={!!State.errors.birth}
          label="Nascimento"
          fullWidth
        />
        <FormControl
          error
          style={{ display: State.errors.birth ? "initial" : "none" }}
        >
          <FormHelperText>{State.errors.birth}</FormHelperText>
        </FormControl>

        <StepButton loading={State.loading}>verificar</StepButton>
      </form>
    </div>
  );
}

export default observer(CPFStep);
