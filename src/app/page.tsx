"use client";
import checkIsMobileDevice from "../utils/isMobileDevice";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import NotMobile from "./components/NotMobile/NotMobile";

export default function Home() {
  if (checkIsMobileDevice()) {
    return (
      <main>
        <HomeScreen />
      </main>
    );
  } else {
    return (
      <main>
        <NotMobile />
      </main>
    );
  }
}
