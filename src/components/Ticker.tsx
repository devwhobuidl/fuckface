"use client";

import React, { useEffect, useState } from "react";

export function Ticker() {
  const [stats, setStats] = useState({
    mcap: "$6.9M",
    liquidity: "$420K",
    holders: "69,420",
    volume: "$1.2M",
  });

  useEffect(() => {
    // Attempt to load from localStorage if admin updated it
    const storedStats = localStorage.getItem("fuckface_stats");
    if (storedStats) {
      try {
        setStats(JSON.parse(storedStats));
      } catch (e) {
        console.error("Failed to parse stored stats", e);
      }
    }

    // Also listen for storage event in case it's updated in another tab or exactly now
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "fuckface_stats" && e.newValue) {
        setStats(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const items = [
    `MARKET CAP: ${stats.mcap}`,
    `LIQUIDITY: ${stats.liquidity}`,
    `HOLDERS: ${stats.holders}`,
    `24H VOL: ${stats.volume}`,
    `SUPPLY: 1,000,000,000`,
    `TAX: 0/0`,
  ];

  return (
    <div className="w-full bg-toxic text-black font-meme text-2xl py-2 overflow-hidden flex whitespace-nowrap border-y-2 border-toxic/50 shadow-[0_0_15px_rgba(0,255,0,0.5)]">
      <div className="animate-marquee flex items-center min-w-full">
        {/* We output items multiple times for seamless scrolling */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-16 px-8 whitespace-nowrap">
            {items.map((item, idx) => (
              <span key={idx} className="tracking-widest">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
