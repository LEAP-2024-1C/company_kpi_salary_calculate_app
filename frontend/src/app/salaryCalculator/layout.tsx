import React from "react";
import Header from "@/components/header/header";

const SalaryLayout = ({
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

export default SalaryLayout;
