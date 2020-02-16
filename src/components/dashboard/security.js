import { observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";

import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { AccountState } from "../../stores/dashboard";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import PasswordInput from "../passwordInput";
import { stylesHook } from "../../style/dashboard";

function SecutiryPanel(props) {
  const classes = stylesHook();

  const { password } = AccountState.errors;

  return (
    <ExpansionPanel {...props}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        id="secutiry-panel-head"
      >
        <Typography className={classes.heading}>Segurança</Typography>
      </ExpansionPanelSummary>
      <div className={classes.expansionPanelContent}>
        <List>
          <ListItem>
            <ListItemText
              id="switch-auth-two-factors"
              primary="Autenticação em 2 fatores"
              style={{ marginLeft: "-18px" }}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={AccountState.data.twoFactors}
                onChange={({ target: { checked: twoFactors } }) => {
                  AccountState.updateData.authMode = { twoFactors };
                  AccountState.update("authMode");
                }}
                /* checked={checked.indexOf("wifi") !== -1} */
                inputProps={{ "aria-labelledby": "switch-auth-two-factors" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider className={classes.divider} />
        <form
          onSubmit={e => {
            e.preventDefault();
            AccountState.update("password");
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
                  AccountState.updateData.password.current = e.target.value;
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
                  AccountState.updateData.password.want = e.target.value;
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
      </div>
    </ExpansionPanel>
  );
}
export default observer(SecutiryPanel);
