import { CircularProgress, Button } from "@material-ui/core";
import { stylesHook } from "../style/login";

export default function StepButton({ children, loading, ...props }) {
  const { button } = stylesHook();
  return (
    <Button
      className={button}
      type="submit"
      variant="contained"
      disableElevation
      // disabled={loading}
      color="primary"
      {...props}
    >
      {loading ? (
        <>
          {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
          <CircularProgress size={24} color="inherit" />
          {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
        </>
      ) : (
        children || "próximo"
      )}
    </Button>
  );
}
