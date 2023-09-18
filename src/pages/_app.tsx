import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps, props: any) {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </CookiesProvider>
  );
}
