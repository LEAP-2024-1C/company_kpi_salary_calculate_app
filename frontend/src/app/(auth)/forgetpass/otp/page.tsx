"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Otp = () => {
  const router = useRouter();
  const [countDown, setCountDown] = useState(60);
  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [countDown]);

  const handleResendOtp = () => {
    setCountDown(30);
  };
  const handleConfirmOtp = (value: string) => {
    setOtpValue(value);
    if (value.length === 4) {
      router.push("/forgetpass/newpass");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 bg-gray-100">
      <h1>Баталгаажуулах</h1>
      <p>“mujo@nest.edu.mn” хаягт илгээсэн баталгаажуулах кодыг оруулна уу</p>
      <InputOTP maxLength={4} value={otpValue} onChange={handleConfirmOtp}>
        <InputOTPGroup className="bg-white">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        className="cursor-pointer text-muted-foreground mt-12 underline text-sm font-medium"
        onClick={handleResendOtp}
        variant="link"
      >
        Дахин илгээх ({countDown})
      </Button>
    </div>
  );
};

export default Otp;
