import { observer } from "mobx-react";

import {
  Typography,
  Grid,
  TextField,
  ExpansionPanelActions,
  Button,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { AccountState } from "../../../stores/dashboard";

export default observer(function Profile() {
  const { data, errors } = AccountState;

  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Perfil
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          AccountState.update();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              fullWidth
              id="firstName"
              label="Nome"
              defaultValue={data.fn}
              onChange={({ target: { value } }) => {
                AccountState.setUpdate("profile", { fn: value });
                // updateData.profile.fn = value;
              }}
              inputProps={{
                style: { textTransform: "capitalize" }
              }}
            />
            <FormControl
              error
              style={{ display: errors.profile.fn ? "initial" : "none" }}
            >
              <FormHelperText>{errors.profile.fn}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Sobrenome"
              name="lastName"
              autoComplete="lname"
              defaultValue={data.ln}
              onChange={({ target: { value } }) => {
                AccountState.setUpdate("profile", { ln: value });
                // updateData.profile.ln = value;
              }}
              inputProps={{
                style: { textTransform: "capitalize" }
              }}
            />
            <FormControl
              error
              style={{ display: errors.profile.ln ? "initial" : "none" }}
            >
              <FormHelperText>{errors.profile.ln}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <ExpansionPanelActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
          >
            Alterar
          </Button>
        </ExpansionPanelActions>
      </form>
    </>
  );
});
