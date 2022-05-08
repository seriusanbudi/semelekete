import "styles/globals.css";
import "styles/tailwind.css";
import "react-tippy/dist/tippy.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@szhsin/react-menu/dist/theme-dark.css";

import Head from "next/head";

import { ThemeProvider } from "styled-components";
import { theme } from "theme";

import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://xodp6o3sxi1e.usemoralis.com:2053/server"
      appId="FdShv5ZXXsbQLWtd6VCqBeKDqkTp7CyEUOKiXcKg"
    >
      <Head>
        <title>Your best app name</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme["default-theme"]}>
        <Component {...pageProps} />
      </ThemeProvider>
    </MoralisProvider>
  );
}

export default MyApp;
