import { Container, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

import { App } from "../../stores";
import AppBar from "../../components/dashboard/appBar";
import Page from "../../components/page";
import PhotoEditor from "../../components/photoEditor";

function PhotoPage({ theme }) {
  return (
    <Page auth={true} redirect="/login">
      <AppBar />
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
            App.setMessage({
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
