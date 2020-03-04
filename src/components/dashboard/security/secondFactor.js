import { useState } from "react";
import { observer } from "mobx-react";
import NumberFormat from "react-number-format";
import {
  DialogTitle,
  Dialog,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography
} from "@material-ui/core";
import { Mail as MailIcon, Phone as PhoneIcon } from "@material-ui/icons";

import { Account } from "../../../stores";
import { stylesHook } from "../../../style/dashboard";

function AuthSecondFactor() {
  const { formControl } = stylesHook();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { authSecondFactor, emails, phones, ncode } = Account.data;

  const activated = !!authSecondFactor;

  const handleChange = function(e, value) {
    Account.setUpdate(
      "auth",
      {
        authSecondFactor: value
      },
      true
    );
  };

  const contacts = [
    ...phones.map(phone => ["phone", `+${ncode}${phone}`]),
    ...emails.map(email => ["email", email])
  ];

  const switchHandler = () => {
    if (contacts.length > 1 && !activated) {
      return setDialogOpen(true);
    }
    Account.setUpdate(
      "auth",
      {
        authSecondFactor: !activated ? contacts[0][1] : false
      },
      true
    );
  };

  const onDialogClose = (e, reason) => {
    if (reason === "backdropClick") {
      setDialogOpen(false);
    }
  };

  const handleClose = authSecondFactor => {
    setDialogOpen(false);

    Account.setUpdate(
      "auth",
      {
        authSecondFactor
      },
      true
    );
  };

  const onSelectItem = value => {
    handleClose(value);
  };

  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Autenticação
      </Typography>
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
              checked={activated}
              onChange={switchHandler}
              inputProps={{ "aria-labelledby": "switch-auth-two-factors" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      {activated && (
        <FormControl component="fieldset" className={formControl}>
          <FormLabel component="legend">Destinatário</FormLabel>
          <RadioGroup
            aria-label="Destinatário"
            value={authSecondFactor}
            onChange={handleChange}
          >
            {contacts.map(([type, value], idx) => (
              <FormControlLabel
                key={idx}
                value={value}
                control={<Radio />}
                label={
                  type === "email" ? (
                    value
                  ) : (
                    <NumberFormat
                      format="(##) #####-####"
                      displayType="text"
                      value={value}
                    />
                  )
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      <Dialog
        aria-labelledby="choice-second-factor"
        open={dialogOpen}
        onClose={onDialogClose}
      >
        <DialogTitle id="choice-second-factor">Escolha o contato</DialogTitle>
        <List>
          {contacts.map(([type, value], idx) => {
            return (
              <ListItem key={idx} button onClick={() => onSelectItem(value)}>
                <ListItemIcon>
                  {type === "email" ? <MailIcon /> : <PhoneIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    type === "email" ? (
                      value
                    ) : (
                      <NumberFormat
                        format="(##) #####-####"
                        displayType="text"
                        value={value}
                      />
                    )
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </>
  );
}

export default observer(AuthSecondFactor);
