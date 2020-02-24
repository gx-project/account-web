import { observer } from "mobx-react";

import NumberFormat from "react-number-format";
import {
  TextField,
  Typography,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { Register } from "../../stores";
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
          Register.sendCPF();
        }}
      >
        <NumberFormat
          onValueChange={({ value }) => {
            Register.setCPF(value);
          }}
          isNumericString
          format="### . ### . ### - ##"
          customInput={TextField}
          error={!!Register.errors.cpf}
          label="CPF"
          fullWidth
          style={{
            marginBottom: "10px"
          }}
          mask="_"
        />
        <FormControl
          error
          style={{ display: Register.errors.cpf ? "initial" : "none" }}
        >
          <FormHelperText>{Register.errors.cpf}</FormHelperText>
        </FormControl>
        <NumberFormat
          onValueChange={values => Register.setBirth(values)}
          isNumericString
          format="##/##/####"
          customInput={TextField}
          error={!!Register.errors.birth}
          label="Nascimento"
          mask="_"
          fullWidth
        />
        <FormControl
          error
          style={{ display: Register.errors.birth ? "initial" : "none" }}
        >
          <FormHelperText>{Register.errors.birth}</FormHelperText>
        </FormControl>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StepButton
            loading={Register.loading}
            style={{ alignSelf: "flex-end" }}
          >
            verificar
          </StepButton>
        </div>
      </Form>
    </>
  );
}

export default observer(CPFStep);
