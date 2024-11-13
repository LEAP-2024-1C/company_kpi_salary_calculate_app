import React from "react";
import Header from "@/components/header/header";

const HistoryLayout = ({
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

export default HistoryLayout;
