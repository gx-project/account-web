import { FormControl, FormHelperText } from "@material-ui/core";

import { RichInput, StepButton } from "../";

export default function Identifier({ next, error, loading, ...props }) {
  return (
    <form onSubmit={next} style={{ width: "100%" }}>
      <RichInput
        fullWidth
        margin="normal"
        label="Celular ou nome de usuário"
        name="phone"
        error={!!error}
        style={{ marginBottom: "3px" }}
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
  );
}
