import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import NumberFormat from "react-number-format";

import { stylesHook, BottomContent } from "../../style/login";

import State from "../../stores/register";

import StepButton from "../stepButton";

function CodeStep(props) {
  const { container, flexColumn, button } = stylesHook();
  const { code: error } = State.errors;
  return (
    <div {...props}>
      <div className={`${container} ${flexColumn}`}>
        <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
          Código
        </Typography>
        <Typography
          style={{ marginTop: "3%", width: "100%", fontWeight: "bold" }}
          component="h3"
          variant="subtitle1"
        >
          {"Enviamos um código para: "}
          <br />
          <NumberFormat
            displayType="text"
            isNumericString
            format="(##) #####-####"
            value={State.nbr}
            style={{ fontSize: "1.3rem" }}
          />
        </Typography>
      </div>
      <form
        onSubmit={e => {
          e && e.preventDefault();

          State.sendCode();
        }}
      >
        <NumberFormat
          onValueChange={({ value }) => {
            State.code = value;
          }}
          isNumericString
          format="# - # - # - # - #"
          customInput={TextField}
          fullWidth
          label="Código"
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

export default observer(CodeStep);
