import { observer } from "mobx-react";
import { FormControl, FormHelperText } from "@material-ui/core";

import { RichInput, StepButton } from "..";

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
      <form onSubmit={next} style={{ width: "100%" }}>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StepButton
            onClick={next}
            loading={loading}
            style={{ alignSelf: "flex-end" }}
          />
        </div>
      </form>
    </>
  );
}

export default observer(NumberStep);
