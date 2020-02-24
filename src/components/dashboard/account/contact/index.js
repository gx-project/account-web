import { Typography } from "@material-ui/core";

import List from "./list";
import Add from "./add";

function Contact() {
  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Contato
      </Typography>
      <List />
      <Add />
    </>
  );
}

export default Contact;
