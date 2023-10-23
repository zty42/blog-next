import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <script src="/noflash.js" async />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
