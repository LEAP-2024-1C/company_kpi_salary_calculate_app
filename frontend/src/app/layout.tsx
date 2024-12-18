import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import UserProvider from "@/context/user-provider";
import { ProductProvider } from "@/context/product-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "@/context/cart-provider";
import Footer from "@/components/footer/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <CartProvider>
          <UserProvider>
            <ProductProvider>
              <div className=" flex flex-col items-center bg-teal-700 ">
                {children}
                <ToastContainer />
              </div>
              <Footer />
            </ProductProvider>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
