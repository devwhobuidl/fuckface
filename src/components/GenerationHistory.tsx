"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Share2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface HistoryItem {
  id: string;
  timestamp: string;
  original: string;
  generated: string;
  customText?: string;
}

export function GenerationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem("fuckface_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadHistory();
    // Listen for custom event from maker
    window.addEventListener("fuckface_history_updated", loadHistory);
    return () => window.removeEventListener("fuckface_history_updated", loadHistory);
  }, []);

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your entire fuckface history? This cannot be undone.")) {
      localStorage.removeItem("fuckface_history");
      setHistory([]);
    }
  };

  const shareToX = (item: HistoryItem) => {
    const text = "Check out my new $fuckface 🖕😭\\n\\nMade free on the official fuckface maker.\\nCA: HQm27BReU9a4hKusbd5GEdw1cLbbVVrZku36RMripump";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    // Optionally, if we had a persistent URL for the image, we could attach it.
    // Since it's a blob/data URL, Twitter intent API can't append an image directly.
    // The user will have to download it and upload it manually, or we use a custom server.
  };

  const triggerDownload = (dataUrl: string, timestamp: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `fuckface_${timestamp.replace(/\\W+/g, "_")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) {
    return (
      <div className="w-full text-center py-20 border border-gray-800 rounded-2xl bg-black mt-8">
         <span className="text-6xl mb-4 block opacity-50">🖕😭</span>
         <h3 className="font-meme text-3xl text-gray-400 mb-2 tracking-widest">NO HISTORY</h3>
         <p className="text-gray-500 font-mono">No fuckfaces yet — go make some! 🖕😭</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-12 bg-black border border-gray-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-3xl font-meme text-white tracking-widest">
           HALL OF SHAME (HISTORY)
        </h2>
        <Button 
          variant="outline" 
          onClick={clearHistory}
          className="border-red-900 text-red-500 hover:bg-red-900/30 font-mono text-sm"
        >
          <Trash2 className="w-4 h-4 mr-2" /> CLEAR ALL
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {history.map((item) => (
          <div key={item.id} className="bg-gray-900/50 rounded-xl border border-gray-800 p-4 transition-all hover:border-blood/50 group">
            <div className="flex justify-between items-center mb-3">
               <span className="font-mono text-xs text-gray-500">{item.timestamp}</span>
               {item.customText && (
                 <span className="font-meme tracking-widest text-toxic text-sm opacity-80 decoration-slice">"{item.customText}"</span>
               )}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-black border border-gray-800">
                <span className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-0.5 rounded text-[10px] text-gray-300 font-mono">ORIGINAL</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.original} alt="Original" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-black border border-blood/50 shadow-[0_0_15px_rgba(227,6,19,0.1)] group-hover:shadow-[0_0_20px_rgba(227,6,19,0.3)] transition-all">
                <span className="absolute top-2 left-2 z-10 bg-blood px-2 py-0.5 rounded text-[10px] text-white font-mono font-bold">FUCKFACE</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.generated} alt="Generated Fuckface" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex gap-2">
               <Button 
                 onClick={() => triggerDownload(item.generated, item.timestamp)}
                 className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-mono text-xs py-5 rounded-lg"
               >
                 <Download className="w-4 h-4 mr-2" /> DOWNLOAD
               </Button>
               <Button 
                 onClick={() => shareToX(item)}
                 className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-mono text-xs py-5 rounded-lg"
               >
                 <Share2 className="w-4 h-4 mr-2" /> TWEET IT
               </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
