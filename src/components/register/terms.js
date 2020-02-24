import { Typography } from "@material-ui/core";

import { Register } from "../../stores";
import StepButton from "../stepButton";

function Terms() {
  return (
    <>
      <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
        Termos de uso
      </Typography>
      <Typography
        style={{
          marginTop: "3%",
          width: "100%",
          maxHeight: "340px",
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
          Register.acceptTerms();
        }}
        loading={Register.loading}
      >
        Aceito
      </StepButton>
    </>
  );
}

export default Terms;
