import { Typography, ExpansionPanelDetails } from "@material-ui/core";
import { stylesHook } from "../../style/dashboard";
import CreatePanel from "./createPanel";

export default function AccountPanel(props) {
  const classes = stylesHook();

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
