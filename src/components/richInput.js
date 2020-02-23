import NumberFormat from "react-number-format";
import { TextField, InputAdornment } from "@material-ui/core";

function RichInput({ onChange, prefix, format, ...props }) {
  if (!format) {
    return (
      <TextField
        {...props}
        onChange={({ target: { value } }) => {
          onChange && onChange({ value });
        }}
        InputProps={{
          ...(prefix
            ? {
                startAdornment: (
                  <InputAdornment position="start">{prefix}</InputAdornment>
                )
              }
            : {}),
          ...(props.InputProps || {})
        }}
      />
    );
  }

  return (
    <NumberFormat
      {...props}
      onValueChange={values => {
        onChange && onChange(values);
      }}
      format={format}
      customInput={TextField}
      InputProps={{
        ...(prefix
          ? {
              startAdornment: (
                <InputAdornment position="start">{prefix}</InputAdornment>
              )
            }
          : {}),
        ...(props.InputProps || {})
      }}
    />
  );
}

export default RichInput;
