import NumberFormat from "react-number-format";
import { Typography, Grid, Paper } from "@material-ui/core";
import { AccountState } from "../../../stores/dashboard";
import { stylesHook } from "../../../style/dashboard";

export default function StaticData() {
  const { accountPaper } = stylesHook();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} className={accountPaper}>
          <Typography variant="caption" display="block" gutterBottom>
            Usuário
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {AccountState.data.username}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            CPF
          </Typography>
          <Typography variant="subtitle2">
            <NumberFormat
              format="###.###.###-##"
              displayType="text"
              value={AccountState.data.cpf}
            />
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
