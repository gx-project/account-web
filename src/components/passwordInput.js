import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
