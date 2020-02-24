import { observer } from "mobx-react";
import NumberFormat from "react-number-format";
import { Info as InfoIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip
} from "@material-ui/core";

import { App, Account } from "../../../../stores";

function ContactList() {
  const { data } = Account;
  const list = [
    ...data.phones.map(phone => ["phone", phone]),
    ...data.emails.map(email => ["email", email])
  ];

  async function removeContactHandler(e, type, remove) {
    e.preventDefault();
    await Account.setUpdate("contact", { remove }, true);
  }

  return (
    <List>
      {list.map(([type, value], idx) => {
        const labelId = `contact-list-label-${value}`;
        const secondFactorCompare =
          type === "phone" ? `+${data.ncode}${value}` : value;
        return (
          <ListItem key={idx} role={undefined} dense style={{ paddingLeft: 0 }}>
            <ListItemText
              id={labelId}
              primary={
                <Typography variant="body1">
                  {type === "email" ? (
                    value
                  ) : (
                    <NumberFormat
                      format="(##) #####-####"
                      displayType="text"
                      value={value}
                    />
                  )}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              {data.authSecondFactor === secondFactorCompare ? (
                <Tooltip title="Usado na verificação de 2 fatores">
                  <IconButton
                    edge="end"
                    aria-label={`Usado na verificação de 2 fatores`}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                list.length > 1 && (
                  <IconButton
                    disabled={App.loading}
                    edge="end"
                    aria-label={`remover ${value}`}
                    onClick={e => removeContactHandler(e, type, value)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              )}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default observer(ContactList);
