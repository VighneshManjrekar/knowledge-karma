import { AppInitialProps } from "next/app";
import Footer from "./Footer";
import Header from "./Header";
import { ReactNode } from "react";




export default function Layout({ children }:{ children: ReactNode}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}