import axios from "axios";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Cache from "@/util/cache";

export const metadata: Metadata = {
  title: "Visitor's App",
  description: "Created by Clane Inc.",
};
const sfpro = localFont({
  variable: "--font-sfpro",
  src: [
    {
      path: "../../public/assets/fonts/Lexend-Light.ttf",
      weight: "400",
      style: "light",
    },
    {
      path: "../../public/assets/fonts/Lexend-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Lexend-SemiBold.ttf",
      weight: "600",
      style: "medium",
    },
    {
      path: "../../public/assets/fonts/Lexend-Bold.ttf",
      weight: "700",
      style: "semibold",
    },
    {
      path: "../../public/assets/fonts/Lexend-ExtraBold.ttf",
      weight: "800",
      style: "bold",
    },
  ],
});

NProgress.configure({ showSpinner: true });
// //Binding events.
// Router.events.on("routeChangeStart", () => {
//   NProgress.set(0.4);
//   NProgress.start();
// });
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${sfpro.variable} font-sfpro`}
      >
        {children}
      </body>
    </html>
  );
}
