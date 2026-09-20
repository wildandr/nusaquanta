import "./globals.css";
import Header from "@partials/Header";
import config from "@config/config.json";
import Footer from "@partials/Footer";
import SmoothScrolling from "@components/smooth-scroll/SmoothScrolling";

const siteUrl = "https://nusaquanta.tech";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PT Nusa Quanta Indonesia — AI, Quantitative Analysis & Data Engineering",
    template: "%s | Nusa Quanta",
  },
  description:
    "Perusahaan software engineering Indonesia yang berfokus pada AI, analisis kuantitatif, dan data engineering. Lihat portofolio project kami.",
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
    locale: "id_ID",
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
  description: config.metadata.meta_description,
  knowsAbout: [
    "Artificial Intelligence",
    "Quantitative Analysis",
    "Data Engineering",
    "Software Development",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
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
