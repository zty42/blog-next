import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WRS7XX17K4" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-WRS7XX17K4');
        `}
        </Script>
      </Head>
      <body>
        <script src="/noflash.js" async />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
