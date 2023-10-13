import { ToastProvider } from "@/toast";
import "./globals.css";
import { NextAuthProvider } from "@/app/providers/sessionProvider";
import { Header } from "@/components/header";

export const metadata = {
  title: "Epoddit",
  description: "A reddit clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <html>
        <body>
          <NextAuthProvider>
            <Header />
            <main className="main">{children}</main>
          </NextAuthProvider>
        </body>
      </html>
    </ToastProvider>
  );
}
