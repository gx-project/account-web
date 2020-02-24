import { useState } from "react";
import { observer } from "mobx-react";

import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import NumberFormat from "react-number-format";
import SwipeableViews from "react-swipeable-views";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";

import { App, Account } from "../../../../stores";

function AddContact() {
  const [step, setStep] = useState(0);
  const [addOpen, setAddOpen] = useState(false);
  const [add, setValue] = useState("");
  const [code, setCode] = useState("");
  const {
    errors: {
      contact: { add: error }
    }
  } = Account;

  async function addContactHandler(e) {
    e.preventDefault();

    const result = await Account.setUpdate("contact", { add }, true);

    if (result) {
      setStep(1);
    }
  }

  async function confirmContactHandler(e) {
    e.preventDefault();
    setStep(1);

    const result = await Account.setUpdate("contact", { add, code }, true);

    if (result) {
      App.setMessage({ content: "Contato adicionado" });
      setAddOpen(false);
      setTimeout(() => setStep(0), 600);
      setValue("");
      setCode("");
    }
  }

  function handleClickOpen() {
    setAddOpen(true);
  }

  function handleAddClose(e, reason) {
    // if (step === 1 && reason === "backdropClick") return;
    setAddOpen(false);
    setTimeout(() => setStep(0), 600);
    setValue("");
    setCode("");
    Account.updateData.contact = {};
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="primary"
          type="submit"
          style={{ alignSelf: "flex-end" }}
          onClick={handleClickOpen}
        >
          Adicionar
        </Button>
      </div>
      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        aria-labelledby="form-dialog-title"
      >
        <SwipeableViews index={step} disabled={true} style={{ width: "100%" }}>
          <>
            <DialogTitle id="form-dialog-title">Adicionar contato</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Celular ou email"
                onChange={({ target: { value } }) => setValue(value)}
                error={!!error}
                fullWidth
              />
              {
                <FormControl
                  error
                  style={{ display: error ? "initial" : "none" }}
                >
                  <FormHelperText>{error}</FormHelperText>
                </FormControl>
              }
            </DialogContent>
            <DialogActions>
              <Button
                disabled={App.loading}
                onClick={handleAddClose}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                disabled={App.loading}
                onClick={addContactHandler}
                color="primary"
              >
                Adicionar
              </Button>
            </DialogActions>
          </>
          <>
            <DialogTitle id="form-dialog-title">Confirmar contato</DialogTitle>
            <DialogContent style={{ paddingTop: 0 }}>
              <DialogContentText>
                Enviamos um código para{" "}
                {isValidEmail(add) ? (
                  add
                ) : (
                  <strong>
                    <NumberFormat
                      format="## ##### ####"
                      displayType="text"
                      value={add}
                    />
                  </strong>
                )}
              </DialogContentText>
              <NumberFormat
                fullWidth
                onValueChange={({ value }) => {
                  setCode(value);
                }}
                isNumericString
                format="# - # - # - # - #"
                customInput={TextField}
                label="Código"
                error={!!error}
                value={code}
              />
              <DialogActions>
                <Button
                  disabled={App.loading}
                  onClick={handleAddClose}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button
                  disabled={App.loading}
                  onClick={confirmContactHandler}
                  color="primary"
                >
                  Confirmar
                </Button>
              </DialogActions>
            </DialogContent>
          </>
        </SwipeableViews>
      </Dialog>
    </>
  );
}

export default observer(AddContact);
