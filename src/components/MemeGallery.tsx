"use client";

import React from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";

const memes = [
  {
    id: 1,
    title: "Original FUCKFACE",
    description: "The classic Wojak that started it all.",
    placeholderColor: "from-red-900/40 to-black",
  },
  {
    id: 2,
    title: "SBF Edition",
    description: "Sam Bankman-Fried in an FTX shirt.",
    placeholderColor: "from-green-900/40 to-black",
  },
  {
    id: 3,
    title: "Sonic Edition",
    description: "Sonic the Hedgehog crying fuckface version.",
    placeholderColor: "from-blue-900/40 to-black",
  },
];

export function MemeGallery() {
  const handleUploadClick = () => {
    alert("upload coming soon – community memes incoming!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-5xl md:text-7xl font-meme text-center mb-4 text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
        GALLERY OF TEARS
      </h2>
      <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
        The finest collection of degens crying while giving the bird.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-blood hover:shadow-[0_0_30px_rgba(227,6,19,0.3)] hover:-translate-y-2"
          >
            {/* Image Placeholder */}
            <div
              className={`aspect-square w-full bg-gradient-to-b ${meme.placeholderColor} flex flex-col items-center justify-center p-6 text-center border-b border-border relative`}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
              
              <span className="text-4xl mb-4">🖕😭🖕</span>
              <p className="font-meme text-xl text-white tracking-wide z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                [{meme.title.toUpperCase()} IMAGE HERE]
              </p>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <span className="font-meme text-blood text-2xl rotate-[-15deg] opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">FUCK</span>
                <span className="font-meme text-toxic text-2xl rotate-[15deg] opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">FACE</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4">
              <h3 className="font-meme text-2xl mb-2 text-white group-hover:text-toxic transition-colors">
                {meme.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {meme.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button
          onClick={handleUploadClick}
          className="bg-transparent border-2 border-toxic text-toxic hover:bg-toxic hover:text-black font-meme text-xl py-6 px-8 tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]"
        >
          <Upload className="mr-3 h-6 w-6" />
          SUBMIT YOUR OWN
        </Button>
      </div>
    </div>
  );
}
