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

import StepButton from "../stepButton";

import { regex } from "../../utils";

function ProfileStep(props) {
  const { container, flexColumn, button } = stylesHook();

  const { username, fn, ln } = State.errors;

  return (
    <div {...props}>
      <div className={`${container} ${flexColumn}`}>
        <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
          Perfil
        </Typography>
      </div>
      <form
        onSubmit={e => {
          e && e.preventDefault();
          State.sendNames();
        }}
        style={{ width: "94%", margin: "0 auto" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RichInput
              onChange={({ value }) => {
                State.setNames("username", value);
              }}
              fullWidth
              label="Usuário"
              prefix="@"
              error={!!username}
            />
            <FormControl
              error
              style={{ display: username ? "initial" : "none" }}
            >
              <FormHelperText>{username}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <RichInput
              onChange={({ value }) => {
                State.setNames("fn", value);
              }}
              fullWidth
              label="Nome"
              error={!!fn}
              inputProps={{
                style: { textTransform: "capitalize" }
              }}
            />
            <FormControl error style={{ display: fn ? "initial" : "none" }}>
              <FormHelperText>{fn}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <RichInput
              onChange={({ value }) => {
                State.setNames("ln", value);
              }}
              fullWidth
              label="Sobrenome"
              error={!!ln}
              inputProps={{
                style: { textTransform: "capitalize" }
              }}
            />
            <FormControl error style={{ display: ln ? "initial" : "none" }}>
              <FormHelperText>{ln}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <StepButton loading={State.loading}>Próximo</StepButton>
      </form>
    </div>
  );
}

export default observer(ProfileStep);
