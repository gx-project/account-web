import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";

import { stylesHook } from "../../style/dashboard";

export default function createDashboardPanel({
  id,
  title,
  children,
  ...props
}) {
  const { heading } = stylesHook();

  return (
    <ExpansionPanel {...props}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id={id}>
        <Typography className={heading}>{title}</Typography>
      </ExpansionPanelSummary>
      {children || null}
    </ExpansionPanel>
  );
}
