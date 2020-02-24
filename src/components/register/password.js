import { observer } from "mobx-react";
import { Typography, FormControl, FormHelperText } from "@material-ui/core";

import { Register } from "../../stores";
import PasswordInput from "../passwordInput";
import StepButton from "../stepButton";
import Form from "./form";

function PasswordStep() {
  const { password: error } = Register.errors;
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
          Register.finish();
        }}
      >
        <PasswordInput
          margin="normal"
          fullWidth
          id="pw"
          label="Senha"
          onChange={({ target: { value } }) => {
            Register.setPassword(value);
          }}
          error={!!error}
        />
        <FormControl error style={{ display: error ? "initial" : "none" }}>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StepButton
            loading={Register.loading}
            style={{ alignSelf: "flex-end" }}
          >
            confirmar
          </StepButton>
        </div>
      </Form>
    </>
  );
}

export default observer(PasswordStep);
