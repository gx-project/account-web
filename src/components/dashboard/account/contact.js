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

import { AccountState } from "../../../stores/dashboard";

export default observer(function Contact() {
  const { data } = AccountState;

  const emails = data.emails || [];

  const list = [
    ...data.phones.map(phone => ["phone", phone]),
    ...emails.map(email => ["email", email])
  ];
  <NumberFormat
    format="###.###.###-##"
    displayType="text"
    value={AccountState.data.cpf}
  />;
  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Contato
      </Typography>
      <List>
        {list.map(([type, value], idx) => {
          const labelId = `contact-list-label-${value}`;

          return (
            <ListItem
              key={idx}
              role={undefined}
              dense
              style={{ paddingLeft: 0 }}
            >
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
                {data.authSecondFactor === value ? (
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
                    <IconButton edge="end" aria-label={`remover ${value}`}>
                      <DeleteIcon />
                    </IconButton>
                  )
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
});
