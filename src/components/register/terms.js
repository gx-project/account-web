import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import NumberFormat from "react-number-format";

import { stylesHook, BottomContent } from "../../style/login";

import State from "../../stores/register";

import StepButton from "../stepButton";

function next(e) {
  e && e.preventDefault();

  State.sendCode();
}

function Terms() {
  const { container, flexColumn, button } = stylesHook();
  const { code: error } = State.errors;
  return (
    <>
      <div className={`${container} ${flexColumn}`}>
        <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
          Termos de uso
        </Typography>
        <Typography
          style={{ marginTop: "3%", width: "100%", fontWeight: "bold" }}
          component="h3"
          variant="subtitle1"
        ></Typography>
      </div>
      <Typography
        style={{
          marginTop: "3%",
          width: "100%",
          maxHeight: "200px",
          overflowX: "scroll"
        }}
        component="h3"
        variant="subtitle1"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        condimentum sed arcu in laoreet. Nam iaculis semper dignissim. Nullam a
        massa turpis. Aliquam fermentum metus consequat, mattis augue at,
        sagittis mauris. In egestas euismod dui, et cursus mi maximus vitae.
        Maecenas sem est, fermentum in lorem ac, viverra volutpat massa. Quisque
        sodales condimentum ligula non viverra. Fusce eget est tristique, auctor
        quam quis, convallis sapien. Donec vulputate mauris non libero commodo,
        vel ultricies neque imperdiet. Praesent placerat consectetur lorem id
        semper. Etiam euismod urna sit amet sapien laoreet ultrices.
      </Typography>
      <StepButton
        onClick={e => {
          e.preventDefault();
          State.acceptTerms();
        }}
        loading={State.loading}
      >
        Aceito
      </StepButton>
    </>
  );
}

export default observer(Terms);
