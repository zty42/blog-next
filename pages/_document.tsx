import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <script src="/noflash.js" async />
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "9b1f683a2c824bc8896d58d3e015a8e4"}'></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
