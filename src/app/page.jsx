"use client";

import LandingPage from "./(pages)/home/page";
import UpcomingEvents from './components/UpcomingEvents'
import OldEvents from './components/OldEvents'
import React from "react";

const Home = () => {
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff9d] font-[Orbitron] container">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent z-0" />
      <div className="relative container z-10">
        <LandingPage />
        <UpcomingEvents />
        <OldEvents />
      </div>
    </div>
  );
};

export default Home;
