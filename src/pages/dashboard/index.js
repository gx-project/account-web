import { observer } from "mobx-react";
import Link from "next/link";
import { Container, Paper } from "@material-ui/core";

import State from "../../stores/dashboard";
import { stylesHook } from "../../style/dashboard";
import { Page } from "../../components";
import { Account, Security, Payment } from "../../components/dashboard";

function DashboardIndex() {
  const classes = stylesHook();
  const handleChange = panel => (e, expanded) => {
    State.setPanel(expanded ? panel : false);
  };

  return (
    <Page auth={true} redirect="/login">
      <Container maxWidth="sm">
        <Account
          expanded={State.panel === "account"}
          onChange={handleChange("account")}
        />
        <Security
          expanded={State.panel === "secutiry"}
          onChange={handleChange("secutiry")}
        />
        <Payment
          expanded={State.panel === "payment"}
          onChange={handleChange("payment")}
        />
        <Link href="/dashboard/history">
          <Paper className={classes.historyLink}>Histórico</Paper>
        </Link>
      </Container>
    </Page>
  );
}

export default observer(DashboardIndex);
