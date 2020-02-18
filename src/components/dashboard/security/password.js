import { observer } from "mobx-react";
import {
  Typography,
  Grid,
  ExpansionPanelActions,
  Button,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { AccountState } from "../../../stores/dashboard";
import PasswordInput from "../../passwordInput";

export default observer(function Password() {
  const { password } = AccountState.errors;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        AccountState.update();
      }}
    >
      <Typography variant="h6" display="block" gutterBottom>
        Alterar senha
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PasswordInput
            fullWidth
            label="Senha atual"
            onChange={e => {
              AccountState.setUpdate("password", { current: e.target.value });
            }}
            error={!!password.current}
          />
          <FormControl
            error
            style={{ display: password.current ? "initial" : "none" }}
          >
            <FormHelperText>{password.current}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordInput
            fullWidth
            label="Nova senha"
            onChange={e => {
              AccountState.setUpdate("password", { want: e.target.value });
            }}
            error={!!password.want}
          />
          <FormControl
            error
            style={{ display: password.want ? "initial" : "none" }}
          >
            <FormHelperText>{password.want}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <ExpansionPanelActions>
        <Button variant="contained" size="small" color="primary" type="submit">
          Alterar
        </Button>
      </ExpansionPanelActions>
    </form>
  );
});
