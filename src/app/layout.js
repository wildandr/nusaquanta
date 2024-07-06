import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@partials/Header";
import config from "@config/config.json";
import Footer from "@partials/Footer";
import SmoothScrolling from "@components/smooth-scroll/SmoothScrolling";

const metadata = config.metadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,200..900;1,200..900&display=swap"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.meta_description} />
        <meta name="keywords" content={metadata.meta_keywords} />
        <meta name="author" content={metadata.meta_author} />
        <title>{metadata.meta_title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <SmoothScrolling>{children}</SmoothScrolling>

        <Footer />
      </body>
    </html>
  );
}
