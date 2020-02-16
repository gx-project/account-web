import { observer } from "mobx-react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import Router from "next/router";

import State, { AccountState } from "../../stores/dashboard";

import { stylesHook, EditIcon } from "../../style/dashboard";

import { LoadingPage, Footer } from "../../components";
import { Account, Security, Payment } from "../../components/dashboard";

function DashboardIndex() {
  const classes = stylesHook();
  const handleChange = panel => (e, expanded) => {
    State.setPanel(expanded ? panel : false);
  };

  return State.loading ? (
    <LoadingPage />
  ) : (
    <>
      <AppBar position="static" style={{ marginBottom: "15px" }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.content} variant="h5">
            <Typography variant="h5" className={classes.name} noWrap>
              {AccountState.data.fn}
            </Typography>
            <Badge
              className={classes.avatarContainer}
              overlap="circle"
              badgeContent={
                <EditIcon onClick={() => Router.push("/dashboard/photo")} />
              }
            >
              <Avatar
                className={classes.avatar}
                style={{ height: "130px", width: "130px" }}
                src={AccountState.data.photo}
              />
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
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
        <Footer.Small style={{ margin: "10% 0" }} />
      </Container>
    </>
  );
}

export default observer(DashboardIndex);
