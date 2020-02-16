import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";

import AppState from "../../store";

import { stylesHook } from "../../style/dashboard";

export default function AccountPanel(props) {
  const classes = stylesHook();

  return (
    <ExpansionPanel {...props}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        id="payment-panel-head"
      >
        <Typography className={classes.heading}>Pagamento</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
