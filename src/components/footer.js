import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const Small = props => {
  return (
    <Box mt={2} {...props}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="#">
          Fundação Guru
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
