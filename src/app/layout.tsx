import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlinho OS",
  description: "Web-based OS for Software Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
