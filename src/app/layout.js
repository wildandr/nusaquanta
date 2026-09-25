import "./globals.css";
import Header from "@partials/Header";
import Footer from "@partials/Footer";
import SmoothScrolling from "@components/smooth-scroll/SmoothScrolling";

const siteUrl = "https://nusaquanta.tech";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nusa Quanta — Digital Product Studio",
    template: "%s | Nusa Quanta",
  },
  description:
    "Nusa Quanta is a digital product studio bringing strategy, design, engineering, and data together to build useful experiences.",
  keywords: [
    "Nusa Quanta",
    "software engineering Indonesia",
    "AI Indonesia",
    "data engineering",
    "quantitative analysis",
    "machine learning",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nusa Quanta",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Structured data untuk Google (Organization)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PT Nusa Quanta Indonesia",
  url: siteUrl,
  email: "hello@nusaquanta.tech",
  description:
    "A digital product studio bringing strategy, design, engineering, and data together.",
  knowsAbout: [
    "Artificial Intelligence",
    "Quantitative Analysis",
    "Data Engineering",
    "Software Development",
  ],
};

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
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black">
        <Header />
        <SmoothScrolling>{children}</SmoothScrolling>
        <Footer />
      </body>
    </html>
  );
}
