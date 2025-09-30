import Header from "./components/Header";
import Providers from "./providers/Providers";
import ClientSessionProvider from "./providers/ClientSessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <Header />
          <Providers>{children}</Providers>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
