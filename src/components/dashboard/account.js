import { observer } from "mobx-react";

import NumberFormat from "react-number-format";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { AccountState } from "../../stores/dashboard";

import { RichInput } from "..";

import { stylesHook } from "../../style/dashboard";

function AccountPanel(props) {
  const classes = stylesHook();

  const { data, updateData, errors } = AccountState;

  return (
    <ExpansionPanel {...props}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        id="account-panel-head"
      >
        <Typography className={classes.heading}>Conta</Typography>
      </ExpansionPanelSummary>
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
        <RichInput
          fullWidth
          isNumericString
          label="Celular"
          name="phone"
          format="(##) #####-####"
          type="tel"
          defaultValue={data.nbr}
        />
      </div>
    </ExpansionPanel>
  );
}

export default observer(AccountPanel);
