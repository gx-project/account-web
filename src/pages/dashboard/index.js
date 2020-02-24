import { observer } from "mobx-react";
import Link from "next/link";
import { Container, Paper } from "@material-ui/core";

import { Dashboard } from "../../stores";
import { stylesHook } from "../../style/dashboard";

import AppBar from "../../components/dashboard/appBar";
import Page from "../../components/page";

import { Account, Security, Payment } from "../../components/dashboard";

function DashboardIndex() {
  const classes = stylesHook();
  const handleChange = panel => (e, expanded) => {
    Dashboard.setPanel(expanded ? panel : false);
  };

  return (
    <Page auth={true} redirect="/login">
      <AppBar />
      <Container maxWidth="sm">
        <Account
          expanded={Dashboard.panel === "account"}
          onChange={handleChange("account")}
        />
        <Security
          expanded={Dashboard.panel === "secutiry"}
          onChange={handleChange("secutiry")}
        />
        <Payment
          expanded={Dashboard.panel === "payment"}
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
