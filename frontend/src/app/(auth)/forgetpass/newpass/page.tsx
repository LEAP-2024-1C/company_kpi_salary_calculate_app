"use client";

import RecoverPass from "@/components/auth/recoverPass/recoverpass";
import React, { Suspense } from "react";

const ForgetPassPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecoverPass />
    </Suspense>
  );
};

export default ForgetPassPage;
