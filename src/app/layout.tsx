import ThemeRegistry from "@/app/components/ThemeProvider";
import { Header } from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
         <Header />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
