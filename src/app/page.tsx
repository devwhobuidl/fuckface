"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ticker } from "@/components/Ticker";
import { MemeGallery } from "@/components/MemeGallery";
import { FuckfaceMaker } from "@/components/FuckfaceMaker";
import { GenerationHistory } from "@/components/GenerationHistory";

const CA = "HQM27BReU9a4hKusbd5GEdw1cLbbVvRzKu36RMripump";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [memberCount, setMemberCount] = useState(13);

  useEffect(() => {
    // Animate member counter from 13 up to 72 for a bit of life
    const target = 72;
    let current = 13;
    const interval = setInterval(() => {
      if (current < target) {
        current += Math.floor(Math.random() * 3) + 1;
        if (current > target) current = target;
        setMemberCount(current);
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white overflow-x-hidden pt-12 md:pt-24">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blood/20 rounded-full blur-[120px] -z-10"></div>
        
        {/* Hero image for massive Wojak */}
        <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] mb-8 flex items-center justify-center rounded-2xl border-2 border-blood bg-black shadow-[0_0_50px_rgba(227,6,19,0.4)] overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-10"></div>
           
           <Image 
              src="/memes/media__1776626577998.png" 
              alt="FUCKFACE Wojak"
              fill
              className="object-contain z-0 p-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-500"
           />
           
           <div className="absolute left-2 top-1/2 -translate-y-1/2 font-meme text-blood text-4xl -rotate-90 origin-center drop-shadow-[0_0_10px_rgba(255,0,0,1)] z-20">FUCK</div>
           <div className="absolute right-2 top-1/2 -translate-y-1/2 font-meme text-toxic text-4xl rotate-90 origin-center drop-shadow-[0_0_10px_rgba(0,255,0,1)] z-20">FACE</div>
        </div>

        <h1 className="text-7xl md:text-9xl font-meme text-white tracking-widest drop-shadow-[0_4px_4px_rgba(227,6,19,0.8)] mb-2">
          FUCKFACE
        </h1>
        <p className="text-xl md:text-3xl text-gray-400 font-bold mb-12">
          "The classic insult turned into a meme"
        </p>

        {/* CA Box */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 bg-black border border-border p-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] max-w-full">
          <span className="font-mono text-sm md:text-base text-toxic truncate px-2 select-all max-w-[250px] sm:max-w-[400px]">
            {CA}
          </span>
          <Button 
            onClick={copyToClipboard}
            className="bg-white text-black hover:bg-gray-200 font-bold px-6 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "COPIED" : "COPY CA"}
          </Button>
        </div>

        {/* BUY Button */}
        <a 
          href="https://pump.fun/coin/HQm27BReU9a4hKusbd5GEdw1cLbbVVrZku36RMripump" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-blood hover:bg-red-700 text-white font-meme text-3xl md:text-5xl py-8 md:py-10 px-12 md:px-20 rounded-full shadow-[0_0_40px_rgba(227,6,19,0.8)] hover:shadow-[0_0_60px_rgba(227,6,19,1)] transition-all hover:scale-105 animate-pulse min-w-[280px]">
            BUY $fuckface
          </Button>
        </a>
      </section>

      {/* 2. TICKER */}
      <Ticker />

      {/* 3. TOKEN INFO */}
      <section className="w-full max-w-5xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-meme mb-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          TOKENOMICS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-border bg-black/50 p-8 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-5xl mb-4">💰</span>
            <h3 className="font-meme text-2xl mb-2 text-gray-400">SUPPLY</h3>
            <p className="text-3xl font-bold font-mono text-white">1,000,000,000</p>
          </div>
          <div className="border border-border bg-black/50 p-8 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-5xl mb-4">✂️</span>
            <h3 className="font-meme text-2xl mb-2 text-gray-400">TAX</h3>
            <p className="text-3xl font-bold font-mono text-white">0 / 0</p>
          </div>
          <div className="border border-toxic/40 bg-black/50 p-8 rounded-2xl flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(0,255,0,0.1)]">
            <span className="text-5xl mb-4">🔒</span>
            <h3 className="font-meme text-2xl mb-2 text-gray-400">LIQUIDITY</h3>
            <p className="text-3xl font-bold font-mono text-toxic">LOCKED</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 bg-toxic/10 border border-toxic text-toxic px-6 py-4 rounded-full font-bold shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <Check className="w-6 h-6" />
          <span className="text-lg md:text-xl">All supply locked live on pump!</span>
        </div>
      </section>

      {/* 4. MEME GALLERY */}
      <MemeGallery />

      {/* 5. FUCKFACE MAKER & HISTORY */}
      <section className="w-full max-w-5xl mx-auto px-4 py-24 relative z-10" id="maker">
        <FuckfaceMaker />
        <GenerationHistory />
      </section>

      {/* 6. COMMUNITY HUB */}
      <section className="w-full max-w-4xl mx-auto px-4 py-24">
        <div className="border border-blood/50 bg-black/80 p-8 md:p-12 rounded-3xl relative overflow-hidden text-center shadow-[0_0_50px_rgba(227,6,19,0.15)]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blood via-toxic to-blood"></div>
          
          <h2 className="text-4xl md:text-6xl font-meme mb-4 text-white">JOIN THE MOB</h2>
          <p className="text-xl text-gray-400 mb-8">We are growing. We are crying. We are giving the middle finger.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 relative z-10">
            <a href="https://x.com/i/communities/2029868045405954384" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
              <Button className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold text-lg py-6 px-8 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                <span className="text-2xl h-6 leading-[24px]">𝕏</span> COMMUNITY
              </Button>
            </a>
            <a href="#" className="w-full md:w-auto">
              <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-lg py-6 px-8 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                <Send className="w-6 h-6" /> TELEGRAM
              </Button>
            </a>
            <a href="https://pump.fun/coin/HQm27BReU9a4hKusbd5GEdw1cLbbVVrZku36RMripump" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
              <Button className="w-full bg-toxic text-black hover:bg-green-400 font-bold text-lg py-6 px-8 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,0,0.4)]">
                PUMP.FUN <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 text-2xl md:text-4xl font-meme bg-black border border-border inline-block px-8 py-4 rounded-2xl mx-auto">
            <span className="text-toxic">{memberCount}</span>
            <span className="text-white">MEMBERS AND GROWING 🖕</span>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="w-full border-t border-border bg-black py-12 px-4 text-center">
        <h3 className="font-meme text-3xl mb-4 text-white hover:text-blood transition-colors cursor-default">FUCKFACE</h3>
        <p className="text-gray-500 mb-2 font-bold tracking-wide">
          BUILT FOR THE FUCKFACE DEGENS 🖕
        </p>
        <p className="text-gray-600 text-xs max-w-2xl mx-auto mt-6">
          $fuckface is a meme coin created for entertainment purposes only and has no intrinsic value or expectation of financial return. The coin is completely useless and strictly for degens. Send it.
        </p>
      </footer>
    </main>
  );
}
