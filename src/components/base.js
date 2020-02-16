import "../style/base.css";

import {
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
  Box
} from "@chakra-ui/core";
import Head from "next/head";
import theme from "../style/theme";

// rSdgV_S133_QLwdDlV_mkVOU

export default function Base({ children, ...props }) {
  return (
    <>
      <Head>
        <title>Guru</title>
        <meta
          name="google-signin-client_id"
          content="190699413732-uh8kuc21fbq29415bg6lih81u769mf8m.apps.googleusercontent.com"
        ></meta>
        <script
          src="https://apis.google.com/js/platform.js?hl=pt"
          async
          defer
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        <CSSReset />

        <Box width="100%" height="100%" {...props}>
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
}
