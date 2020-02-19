import { Link as RouterLink } from "next/router";
import {
  Typography,
  FormControl,
  FormHelperText,
  Button
} from "@material-ui/core";

import { RichInput, StepButton } from "../";
import Bottom from "./bottom";

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
          style={{ alignSelf: "flex-end" }}
          disabled={loading}
        />
      </div>
      <Bottom>
        <Typography variant="subtitle2">Não tem conta?</Typography>
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          href="/register"
        >
          Criar conta
        </Button>
      </Bottom>
    </form>
  );
}
