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

function CodeStep({ loading, error, title, to, onSubmit, onChange }) {
  // const { code: error } = State.errors;

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
          {isValidEmail(to) ? (
            to
          ) : (
            <NumberFormat
              displayType="text"
              isNumericString
              format="(##) #####-####"
              value={to}
              // value={State.nbr}
              style={{ fontSize: "1.3rem" }}
            />
          )}
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
        <StepNextButton loading={loading}>confirmar</StepNextButton>
      </Form>
    </>
  );
}

export default observer(CodeStep);
