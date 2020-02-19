import { observer } from "mobx-react";

import NumberFormat from "react-number-format";
import {
  TextField,
  Typography,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import State from "../../stores/register";
import StepButton from "../stepButton";
import Form from "./form";

function CPFStep() {
  return (
    <>
      <Typography style={{ margin: "5% 0 3% 0" }} component="h1" variant="h5">
        CPF
      </Typography>
      <Typography
        style={{ marginBottom: "3%", width: "100%", fontWeight: "bold" }}
        component="h3"
        variant="subtitle1"
      >
        Para aumentar a segurança da plataforma solicitamos e verificamos sempre
        o CPF dos usuários, com o fim de evitar os mal-intencionados.
      </Typography>
      <Form
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
          mask="_"
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
          mask="_"
          fullWidth
        />
        <FormControl
          error
          style={{ display: State.errors.birth ? "initial" : "none" }}
        >
          <FormHelperText>{State.errors.birth}</FormHelperText>
        </FormControl>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StepButton loading={State.loading} style={{ alignSelf: "flex-end" }}>
            verificar
          </StepButton>
        </div>
      </Form>
    </>
  );
}

export default observer(CPFStep);
