import { observer } from "mobx-react";
import { FormControl, FormHelperText } from "@material-ui/core";

import { RichInput, StepButton } from "./";

function NumberStep({
  next,
  error,
  loading,
  Top = null,
  Bottom = null,
  ...props
}) {
  return (
    <>
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
    </>
  );
}

export default observer(NumberStep);
