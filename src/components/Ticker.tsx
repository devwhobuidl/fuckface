"use client";

import React, { useEffect, useState } from "react";

export function Ticker() {
  const [stats, setStats] = useState({
    mcap: "LOADING...",
    liquidity: "LOCKED",
    holders: "GROWING...",
    volume: "LOADING...",
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.dexscreener.com/latest/dex/tokens/HQM27BReU9a4hKusbd5GEdw1cLbbVVrZku36RMripump");
        const data = await res.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          
          setStats((prev) => ({
            ...prev,
            mcap: pair.marketCap ? formatCurrency(pair.marketCap) : prev.mcap,
            volume: pair.volume?.h24 ? formatCurrency(pair.volume.h24) : prev.volume,
            liquidity: pair.liquidity?.usd ? formatCurrency(pair.liquidity.usd) : prev.liquidity,
          }));
        }
      } catch (e) {
        console.error("Failed to fetch dexscreener data", e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s
    return () => clearInterval(interval);
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
