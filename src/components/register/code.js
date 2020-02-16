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

function CodeStep() {
  const { code: error } = State.errors;
  return (
    <>
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
      <Form
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
      </Form>
    </>
  );
}

export default observer(CodeStep);
