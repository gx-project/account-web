import { FormControl, FormHelperText } from "@material-ui/core";

import { RichInput, StepButton } from "../";

export default function Identifier({ next, error, loading, ...props }) {
  return (
    <form onSubmit={next} style={{ width: "100%" }}>
      <RichInput
        fullWidth
        margin="normal"
        label="Celular ou usuário"
        name="phone"
        error={!!error}
        style={{ marginBottom: "3px" }}
        {...props}
      />
      <FormControl error style={{ display: error ? "initial" : "none" }}>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
      <StepButton onClick={next} loading={loading} />
    </form>
  );
}
