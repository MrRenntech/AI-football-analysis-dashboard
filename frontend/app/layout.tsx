import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Header */}
                <header className="fixed w-full top-0 z-50 bg-audi-black text-audi-white border-b-4 border-audi-red px-12 py-5 flex items-center justify-between shadow-md">
                    <div className="text-2xl font-bold tracking-[0.2em] uppercase font-audi">
                        Audi Analytics <span className="text-audi-red">/</span> Football
                    </div>
                    <div className="text-xs uppercase tracking-widest text-audi-grey-300">
                        Vorsprung durch Technik
                    </div>
                </header>

                {/* Main */}
                <main className="pt-32 px-12 min-h-screen bg-audi-white text-audi-black font-audi">
                    {children}
                </main>
            </body>
        </html>
    );
}
