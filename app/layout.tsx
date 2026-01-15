import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy Says - The Oracle of Rejection",
  description: "Ask Andy anything. The answer is always no.",
  openGraph: {
    title: "Andy Says - The Oracle of Rejection",
    description: "Ask Andy anything. The answer is always no.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
