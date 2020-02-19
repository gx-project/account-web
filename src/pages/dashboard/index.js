import { observer } from "mobx-react";
import Link from "next/link";
import Router from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Container,
  Paper
} from "@material-ui/core";

import State, { AccountState } from "../../stores/dashboard";
import { stylesHook, EditIcon } from "../../style/dashboard";
import { Page } from "../../components";
import { Account, Security, Payment } from "../../components/dashboard";

function DashboardIndex() {
  const classes = stylesHook();
  const handleChange = panel => (e, expanded) => {
    State.setPanel(expanded ? panel : false);
  };

  return (
    <Page auth={true} redirect="/login">
      <AppBar>
        <img
          src="gx-logo-white.svg"
          width="30px"
          height="30px"
          style={{ margin: "20px auto" }}
        />
      </AppBar>
      <div className={classes.content}>
        <div className={classes.profile}>
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
      </div>
    </Page>
  );
}

export default observer(DashboardIndex);
