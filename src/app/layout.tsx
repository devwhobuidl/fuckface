import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$fuckface | the classic insult turned into a meme",
  description: "Official home of $fuckface on Solana. CA: HQM27BReU9a4hKusbd5GEdw1cLbbVvRzKu36RMripump — fuck the haters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter">
        {children}
      </body>
    </html>
  );
}
