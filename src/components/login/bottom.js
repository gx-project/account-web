import Grid from "@material-ui/core/Grid";
import { withTheme } from "@material-ui/core/styles";

function LoginBottom({ children, style, theme }) {
  return (
    <Grid
      container
      style={{
        ...style,
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(2)
      }}
    >
      <Grid item>{children}</Grid>
    </Grid>
  );
}

export default withTheme(LoginBottom);
