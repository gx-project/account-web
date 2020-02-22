import { observer } from "mobx-react";
import NumberFormat from "react-number-format";
import {
  Switch,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

import { AccountState } from "../../../stores/dashboard";
import { stylesHook } from "../../../style/dashboard";

export default observer(function AuthSecondFactor() {
  const { formControl } = stylesHook();
  const { authSecondFactor, emails, phones, ncode } = AccountState.data;

  const activated = !!authSecondFactor;

  const handleChange = function(e, value) {
    AccountState.setUpdate(
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

  const switchHandler = () =>
    AccountState.setUpdate(
      "auth",
      {
        authSecondFactor: !activated ? contacts[0][1] : false
      },
      true
    );

  return (
    <>
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
    </>
  );
});
