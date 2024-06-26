"use client";
import dynamic from "next/dynamic";
import React from "react";
const Game = dynamic(() => import("../components/Game/Game"), { ssr: false });

const page = () => {
    return <Game />;
};

export default page;
