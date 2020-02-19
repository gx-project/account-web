import { observer } from "mobx-react";
import { Typography, FormControl, FormHelperText } from "@material-ui/core";

import State from "../../stores/register";
import { PasswordInput, StepButton } from "../";
import Form from "./form";

function PasswordStep() {
  const { password: error } = State.errors;
  return (
    <>
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
      <Form
        onSubmit={e => {
          e && e.preventDefault();
          State.finish();
        }}
      >
        <PasswordInput
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StepButton loading={State.loading} style={{ alignSelf: "flex-end" }}>
            confirmar
          </StepButton>
        </div>
      </Form>
    </>
  );
}

export default observer(PasswordStep);
