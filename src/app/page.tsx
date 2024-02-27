"use client"
import React, { useState, useEffect } from "react";
import checkIsMobileDevice from "../utils/isMobileDevice";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import NotMobile from "./components/NotMobile/NotMobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(checkIsMobileDevice());
  }, []);

  return <main>{isMobile ? <HomeScreen /> : <NotMobile />}</main>;
}
