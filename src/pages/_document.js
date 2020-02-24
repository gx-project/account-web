import React from "react";
import NextDocument, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { dark, light } from "../style/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="theme-color" content={dark.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <style>
            {`
            html,
            body,
            #__next {
              width: 100%;
              height: 100%;
            }`}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript style={{ height: "100%" }} />
        </body>
      </html>
    );
  }
}

Document.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
