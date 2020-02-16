import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";

import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import { RichInput } from "./";

import StepButton from "./stepButton";

function NumberStep({
  next,
  error,
  loading,
  Top = null,
  Bottom = null,
  ...props
}) {
  return (
    <div {...props}>
      {Top}
      <form onSubmit={next}>
        <RichInput
          autoFocus
          fullWidth
          isNumericString
          margin="normal"
          label="Celular"
          name="phone"
          error={!!error}
          style={{ marginBottom: "3px" }}
          format="(##) #####-####"
          type="tel"
          {...props}
        />
        <FormControl error style={{ display: error ? "initial" : "none" }}>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
        <StepButton onClick={next} loading={loading} />
      </form>
      {Bottom}
    </div>
  );
}

export default observer(NumberStep);
