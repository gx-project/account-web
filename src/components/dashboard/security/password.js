import { observer } from "mobx-react";
import { withTheme } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { AccountState } from "../../../stores/dashboard";
import PasswordInput from "../../passwordInput";

function Password({ theme }) {
  const { password } = AccountState.errors;

  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Alterar senha
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          AccountState.update();
        }}
      >
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

        <div
          style={{
            display: "flex",
            padding: theme.spacing(2, 0),
            flexDirection: "column"
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            style={{ alignSelf: "flex-end" }}
          >
            Alterar
          </Button>
        </div>
      </form>
    </>
  );
}

export default withTheme(observer(Password));
