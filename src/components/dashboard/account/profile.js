import { observer } from "mobx-react";
import Router from "next/router";

import { withTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Badge,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { Account } from "../../../stores";

import { stylesHook, EditIcon } from "../../../style/dashboard";

function Profile({ theme }) {
  const classes = stylesHook();
  const { data, errors } = Account;

  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Perfil
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          Account.update();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Badge
              className={classes.avatarContainer}
              color="secondary"
              onClick={() => Router.push("/dashboard/photo")}
              badgeContent={<EditIcon style={{ background: "transparent" }} />}
            >
              <Avatar
                className={classes.avatar}
                style={{ height: "130px", width: "130px" }}
                src={Account.data.photo}
              />
            </Badge>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              fullWidth
              id="firstName"
              label="Nome"
              defaultValue={data.fn}
              onChange={({ target: { value } }) => {
                Account.setUpdate("profile", { fn: value });
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
                Account.setUpdate("profile", { ln: value });
                // updateData.profile.ln = value;
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
        <div
          style={{
            display: "flex",
            padding: theme.spacing(2, 0),
            flexDirection: "column"
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            style={{ alignSelf: "flex-end" }}
          >
            Alterar
          </Button>
        </div>
      </form>
    </>
  );
}

export default withTheme(observer(Profile));
