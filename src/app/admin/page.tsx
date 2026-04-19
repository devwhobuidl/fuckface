"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [stats, setStats] = useState({
    mcap: "$6.9M",
    liquidity: "$420K",
    holders: "69,420",
    volume: "$1.2M",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("admin_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    
    const storedStats = localStorage.getItem("fuckface_stats");
    if (storedStats) {
      try {
        setStats(JSON.parse(storedStats));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "degen") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      alert("Wrong password fuckface");
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("fuckface_stats", JSON.stringify(stats));
    
    // dispatch storage event so Ticker can hear it in the same window (optional, but robust)
    window.dispatchEvent(new Event('storage'));
    
    setMessage("Stats updated across this browser locally! 🖕");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStats({
      ...stats,
      [e.target.name]: e.target.value
    });
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-[#111] border border-blood p-8 rounded-2xl shadow-[0_0_30px_rgba(227,6,19,0.3)]">
          <h1 className="text-4xl font-meme mb-6 text-center text-blood">MODS ONLY</h1>
          <Input 
            type="password" 
            placeholder="Enter password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 bg-black border-border focus-visible:ring-blood"
          />
          <Button type="submit" className="w-full bg-blood hover:bg-red-700 font-meme text-xl tracking-widest">
            LOGIN
          </Button>
          <p className="text-center text-gray-500 mt-4 text-sm font-mono">hint: degen</p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#111] border border-toxic p-8 rounded-2xl shadow-[0_0_30px_rgba(0,255,0,0.2)]">
        <h1 className="text-4xl font-meme mb-2 text-center text-toxic">UPDATE STATS</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Updates ticker data via localStorage. Only affects your current browser session.
        </p>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Market Cap</label>
            <Input 
              name="mcap"
              value={stats.mcap}
              onChange={handleChange}
              className="bg-black border-border focus-visible:ring-toxic"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Liquidity</label>
            <Input 
              name="liquidity"
              value={stats.liquidity}
              onChange={handleChange}
              className="bg-black border-border focus-visible:ring-toxic"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Holders</label>
            <Input 
              name="holders"
              value={stats.holders}
              onChange={handleChange}
              className="bg-black border-border focus-visible:ring-toxic"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">24H Volume</label>
            <Input 
              name="volume"
              value={stats.volume}
              onChange={handleChange}
              className="bg-black border-border focus-visible:ring-toxic"
            />
          </div>

          <Button type="submit" className="w-full bg-toxic text-black hover:bg-green-400 font-meme text-xl tracking-widest">
            PUBLISH TO TICKER
          </Button>

          {message && (
            <p className="text-center text-toxic font-bold mt-4 animate-pulse">
              {message}
            </p>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              sessionStorage.removeItem("admin_auth");
              setIsAuthenticated(false);
            }} 
            className="bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-white"
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </main>
  );
}
