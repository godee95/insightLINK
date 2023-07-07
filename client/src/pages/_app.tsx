import { RecoilRoot } from "recoil";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { Kanit, IBM_Plex_Sans_KR } from "next/font/google";
import Script from "next/script";
import { NextSeo } from "next-seo";
import Head from "next/head";
declare global {
  // Make it accessible globally on Kakao
  interface Window {
    Kakao: any;
  }
}

const kakaoInit = () => {
  // Run when the page loads
  if (!window.Kakao.isInitialized()) {
    // Add an if statement to run only when not declared
    window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
  }
};

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600"],
  style: ["normal"],
  subsets: ["latin", "latin-ext", "thai"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider enableColorScheme={true} attribute="class">
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          onLoad={kakaoInit}
        />
        <NextSeo title="insightLINK" description="Link your insight" />
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
        </Head>
        <main className={`${kanit.variable}`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
