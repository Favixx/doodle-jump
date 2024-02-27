"use client";
import React, { useState, useEffect } from "react";
import checkIsMobileDevice from "../utils/isMobileDevice";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import NotMobile from "./components/NotMobile/NotMobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const isUsingMobile = () => {
      setIsMobile(checkIsMobileDevice());
    };

    isUsingMobile();

    window.addEventListener("resize", isUsingMobile);

    return () => {
      window.removeEventListener("resize", isUsingMobile);
    };
  }, []);

  return <main>{isMobile ? <HomeScreen /> : <NotMobile />}</main>;
}
