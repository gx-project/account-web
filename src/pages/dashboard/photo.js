import { Container, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

import AppState from "../../stores";
import { Page, PhotoEditor } from "../../components";

function PhotoPage({ theme }) {
  return (
    <Page auth={true} redirect="/login">
      <Container maxWidth="md">
        <Typography
          style={{ margin: theme.spacing(2, 0), textAlign: "center" }}
          component="h1"
          variant="h5"
        >
          Foto de perfil
        </Typography>
        <PhotoEditor
          style={{ maxWidth: "400px", margin: "0 auto" }}
          onResult={result => {
            AppState.setMessage({
              content: result ? "Foto atualizada" : "Tente novamente",
              type: result ? "success" : "error"
            });
          }}
        />
      </Container>
    </Page>
  );
}

export default withTheme(PhotoPage);
