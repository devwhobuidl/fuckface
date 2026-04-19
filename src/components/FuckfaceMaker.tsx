"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Lock } from "lucide-react";
import { Button } from "./ui/button";

export function FuckfaceMaker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [denoise, setDenoise] = useState(0.85);
  const [customText, setCustomText] = useState("");
  const [preset, setPreset] = useState("classic");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and convert to base64
  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 512;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setSelectedImage(dataUrl);
        setGeneratedImage(null); // Clear previous result when new image uploaded
      };
      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  const saveHistory = (original: string, generated: string, text: string) => {
    try {
      const existingStr = localStorage.getItem("fuckface_history");
      const history = existingStr ? JSON.parse(existingStr) : [];
      
      const now = new Date();
      const timestamp = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " • " + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      const newItem = {
        id: crypto.randomUUID(),
        timestamp,
        original,
        generated,
        customText: text
      };

      const newHistory = [newItem, ...history].slice(0, 20); // Keep last 20
      localStorage.setItem("fuckface_history", JSON.stringify(newHistory));
      
      // Dispatch custom event so history component re-renders
      window.dispatchEvent(new Event("fuckface_history_updated"));
    } catch(err) {
      console.error("Failed to save history", err);
    }
  };

  const generateMeme = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/fuckface/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          customText: customText,
          preset: preset,
          intensity: denoise
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
         setIsRateLimited(true);
      }

      if (!res.ok) {
        console.error("Backend error:", data);
        alert(data.error || "Hugging Face credits low or model booting up — try again in a few seconds.");
        return;
      }

      if (data.success && data.image) {
        setGeneratedImage(data.image);
        saveHistory(selectedImage, data.image, customText || "FUCKFACE");
      }
    } catch (err) {
      console.error("Meme generation failed", err);
      alert("Uh oh! Generation failed. Make sure the Hugging Face API key is set.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full bg-black border border-blood rounded-2xl p-6  mt-20">
      <h2 className="text-4xl font-meme text-blood mb-2 flex flex-col md:flex-row md:items-center gap-3">
        FUCKFACE MAKER <span className="rotate-12 hidden md:inline-block">🖕😭</span>
      </h2>
      <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed">
        Powered by Hugging Face • Free tier (limited daily uses) • Token required for the site owner only
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <div 
            className="w-full aspect-square border-2 border-dashed border-gray-700 bg-gray-900/50 rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors hover:border-blood/50 cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedImage} alt="Upload" className="w-full h-full object-contain z-10" />
            ) : (
              <div className="text-center z-10 text-gray-500 group-hover:text-toxic transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-3 opacity-50 block" />
                <p className="font-meme text-xl tracking-widest">DRAG IT</p>
                <p className="text-sm mt-1">or click to upload</p>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleChange} 
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 font-bold mb-1 block">Denoise/Chaos Level</label>
              <input 
                type="range" 
                min="0.5" 
                max="0.95" 
                step="0.05"
                value={denoise}
                onChange={(e) => setDenoise(parseFloat(e.target.value))}
                className="w-full accent-blood"
              />
              <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
                <span>MILD</span>
                <span>DEGEN</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 font-bold mb-2 block">Preset Style</label>
              <div className="flex gap-2 mb-4">
                 <Button 
                   onClick={() => setPreset("classic")}
                   className={`flex-1 text-xs py-1 h-8 rounded-lg font-mono ${preset === "classic" ? "bg-blood text-white border-blood" : "bg-black border-gray-700 text-gray-400"} border`}
                 >
                   CLASSIC
                 </Button>
                 <Button 
                   onClick={() => setPreset("sbf")}
                   className={`flex-1 text-xs py-1 h-8 rounded-lg font-mono ${preset === "sbf" ? "bg-blood text-white border-blood" : "bg-black border-gray-700 text-gray-400"} border`}
                 >
                   SBF MODE
                 </Button>
                 <Button 
                   onClick={() => setPreset("sonic")}
                   className={`flex-1 text-xs py-1 h-8 rounded-lg font-mono ${preset === "sonic" ? "bg-blood text-white border-blood" : "bg-black border-gray-700 text-gray-400"} border`}
                 >
                   SONIC
                 </Button>
              </div>

              <label className="text-sm text-gray-400 font-bold mb-1 block">Custom Text (Optional)</label>
              <input 
                type="text" 
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. YOUR MOM"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 font-meme text-white focus:outline-none focus:border-blood transition-colors"
                maxLength={20}
              />
            </div>
            
            <Button 
              disabled={!selectedImage || isProcessing || isRateLimited}
              onClick={generateMeme}
              className="w-full bg-blood text-white hover:bg-red-700 font-meme tracking-widest text-xl py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(227,6,19,0.3)] hover:shadow-[0_0_30px_rgba(227,6,19,0.6)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isRateLimited ? (
                <span className="flex items-center gap-2 text-sm md:text-xl">
                  <Lock className="w-5 h-5 text-gray-400" /> DAILY QUOTA REACHED
                </span>
              ) : isProcessing ? (
                <span className="flex flex-col items-center gap-1 leading-none py-1">
                  <span className="animate-spin text-2xl">🖕😭</span> 
                  <span className="text-sm">MAKING IT A CERTIFIED FUCKFACE...</span>
                </span>
              ) : (
                "MAKE IT FUCKFACE"
              )}
            </Button>
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full aspect-square border border-gray-800 bg-black rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {generatedImage ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={generatedImage} alt="Fuckface Result" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="flex gap-3 mt-4">
                <Button 
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = generatedImage;
                    link.download = `fuckface-${Date.now()}.png`;
                    link.click();
                  }}
                  className="flex-1 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> DOWNLOAD
                </Button>
                <Button 
                  onClick={() => {
                    const text = encodeURIComponent("Just made this absolute $fuckface masterpiece. 🖕😭🖕\n\nGenerated on fuckface.vip\n\n#fuckface #solana @fuckfacecoin");
                    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
                  }}
                  className="flex-1 bg-[#1DA1F2] hover:bg-[#1a91da] text-white flex items-center justify-center gap-2"
                >
                  SHARE TO X
                </Button>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="text-center animate-pulse z-10 relative bg-black/60 p-6 rounded-xl border border-blood/20 backdrop-blur-sm">
               <div className="relative w-32 h-32 mx-auto mb-4">
                  <span className="text-8xl block animate-spin [animation-duration:2s]">🖕</span>
                  <span className="text-4xl absolute -bottom-2 -right-2 animate-bounce">😭</span>
               </div>
               <p className="font-meme tracking-widest text-blood glow text-xl">BULLYING PIXELS VIRTUALLY...</p>
               <p className="text-xs text-gray-500 font-mono mt-2 italic">FLUX is cooking your degen soul</p>
            </div>
          ) : selectedImage ? (
             <div className="text-center opacity-50">
               <span className="text-4xl block mb-4 animate-bounce">👇</span>
               <p className="font-meme tracking-widest text-toxic drop-shadow-md">READY FOR SLAUGHTER</p>
               <p className="text-xs text-gray-600 mt-2">Hit the big red button, pussy.</p>
             </div>
          ) : (
            <div className="text-center opacity-30">
               <span className="text-6xl block mb-4">😭</span>
               <p className="font-meme tracking-widest text-2xl">AWAITING VICTIM</p>
               <p className="text-xs mt-2">Upload something to mock</p>
            </div>
          )}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
}
