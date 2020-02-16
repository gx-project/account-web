import { observer } from "mobx-react";

import NumberFormat from "react-number-format";
import {
  Typography,
  Grid,
  TextField,
  ExpansionPanelActions,
  Button,
  Paper,
  Divider,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { AccountState } from "../../stores/dashboard";
import { RichInput } from "..";
import { stylesHook } from "../../style/dashboard";
import CreatePanel from "./createPanel";

function AccountPanel(props) {
  const classes = stylesHook();

  const { data, updateData, errors } = AccountState;

  return (
    <CreatePanel title="Conta" id="account-panel-head" {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.accountPaper}>
            <Typography variant="caption" display="block" gutterBottom>
              Usuário
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {data.username}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              CPF
            </Typography>
            <Typography variant="subtitle2">
              <NumberFormat
                format="###.###.###-##"
                displayType="text"
                value={data.cpf}
              />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.expansionPanelContent}>
        <Typography variant="h6" display="block" gutterBottom>
          Perfil
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            AccountState.update("profile");
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
                  updateData.profile.fn = value;
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
                  updateData.profile.ln = value;
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
        <Divider className={classes.divider} />
        <Typography variant="h6" display="block" gutterBottom>
          Contato
        </Typography>
        {data.phones.map((phone, idx) => (
          <RichInput
            fullWidth
            key={idx}
            isNumericString
            label="Celular"
            name="phone"
            format="(##) #####-####"
            type="tel"
            defaultValue={phone}
          />
        ))}
      </div>
    </CreatePanel>
  );
}

export default observer(AccountPanel);
