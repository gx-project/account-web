import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function PasswordInput(props) {
  const [showPw, setPwVisibility] = useState(false);

  return (
    <TextField
      {...props}
      type={showPw ? "text" : "password"}
      InputProps={{
        // ...(props.InputProps || {} )
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setPwVisibility(!showPw)}
              edge="end"
              style={{ marginRight: "0" }}
            >
              {showPw ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
