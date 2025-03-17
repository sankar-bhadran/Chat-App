import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import ApolloProviderWrapper from "@/components/Apollowrapper/ApolloProviderWrapper"; // If placed in components
import { Provider } from "react-redux";
import store from "../store/index";
import PrivateRoute from "./PrivateRoute";
export const metadata: Metadata = {
  title: "ChatAI - Modern AI Chat Application",
  description: "A modern chat application with AI-enhanced features",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import StoreProvider from "./storeProvider";
