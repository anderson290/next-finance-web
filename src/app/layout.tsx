
import { Header } from "@/components/Header";
import "./globals.css";
import { Metadata } from "next";

// global metatags
export const metadata: Metadata = {
  title: 'Home - Next JS default project',
  description: 'Next js project',
  openGraph: {
    title: 'Open graph title',
    description: 'Open graph desc',
    images: []
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <Header />

        {children}
      </body>
    </html>
  );
}
