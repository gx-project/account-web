import { Typography, ExpansionPanelDetails } from "@material-ui/core";
import CreatePanel from "./createPanel";

function AccountPanel(props) {
  return (
    <CreatePanel title="Pagamento" id="payment-panel-head" {...props}>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </CreatePanel>
  );
}

export default AccountPanel;
