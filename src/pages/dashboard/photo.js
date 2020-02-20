import { Container } from "@material-ui/core";

import AppState from "../../stores";
import { Page, PhotoEditor } from "../../components";
import { stylesHook } from "../../style/dashboard";

export default function Photo() {
  const classes = stylesHook();
  return (
    <Page auth={true} redirect="/login">
      <Container maxWidth="md">
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
