// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Ваші метатеги та інші елементи head тут */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
