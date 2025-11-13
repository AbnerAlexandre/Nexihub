import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="w-screen min-h-screen"
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
