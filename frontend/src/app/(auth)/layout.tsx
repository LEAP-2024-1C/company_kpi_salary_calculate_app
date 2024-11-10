import React from "react";
import Header from "@/components/header/header";

const AuthPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthPageLayout;
