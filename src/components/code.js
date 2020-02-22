import { observer } from "mobx-react";

import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import NumberFormat from "react-number-format";
import {
  TextField,
  Typography,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import StepNextButton from "./stepButton";
import Form from "./register/form";

function CodeStep({ error, title, to, onSubmit, onChange }) {
  return (
    <>
      {title && (
        <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
          {title}
        </Typography>
      )}
      {to && (
        <Typography
          style={{ marginTop: "3%", width: "100%", fontWeight: "bold" }}
          component="h3"
          variant="subtitle1"
        >
          {"Enviamos um código para: "}
          <br />
          {to}
        </Typography>
      )}
      <Form
        onSubmit={e => {
          e && e.preventDefault();
          onSubmit && onSubmit();
          // State.sendCode();
        }}
      >
        <NumberFormat
          onValueChange={({ value }) => {
            // State.code = value;
            onChange && onChange(value);
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StepNextButton style={{ alignSelf: "flex-end" }}>
            confirmar
          </StepNextButton>
        </div>
      </Form>
    </>
  );
}

export default observer(CodeStep);
