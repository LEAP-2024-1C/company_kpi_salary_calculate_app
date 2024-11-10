import React from "react";
import Header from "@/components/header/header";

const DetailPageLayout = ({
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

export default DetailPageLayout;
