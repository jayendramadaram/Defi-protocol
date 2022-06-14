import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// import { Web3ReactProvider } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";
import { wrapper } from "../redux/store";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
