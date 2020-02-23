import { Box, Typography, Link } from "@material-ui/core";

export function Small(props) {
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
}
