// app/layout.tsx
import "../css/main.css";
import { ReactNode } from "react";
import StoreProvider from "./_stores/StoreProvider";

export const metadata = {
  title: "Football Analysis Dashboard",
  description: "AI-powered football insights",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-slate-800 dark:text-slate-100 antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
