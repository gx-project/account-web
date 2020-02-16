import { observer } from "mobx-react";
import {
  Typography,
  FormControl,
  FormHelperText,
  Grid
} from "@material-ui/core";

import State from "../../stores/register";
import { RichInput, StepButton } from "../";
import Form from "./form";

function ProfileStep() {
  const { username, fn, ln } = State.errors;
  return (
    <>
      <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
        Perfil
      </Typography>
      <Form
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
      </Form>
    </>
  );
}

export default observer(ProfileStep);
