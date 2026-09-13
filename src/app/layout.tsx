import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buat My Fav Nailong 💛",
  description: "Pesan spesial dan tulus buat My Fav Nailong ✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦖</text></svg>" />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 text-slate-800 selection:bg-amber-300 selection:text-amber-950">
        {children}
      </body>
    </html>
  );
}
