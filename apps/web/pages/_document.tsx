import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full flex flex-col">
        <Head />
        <body className="flex-1 flex flex-col">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
