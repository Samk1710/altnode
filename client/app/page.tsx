"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/functions/NavBar";
import { useEffect, useState } from "react";
import SparklesText from "@/components/ui/sparkles-text";
import Particles from "@/components/ui/particles";
import AnimatedBackground from "@/components/functions/AnimatedBackground";
import WordPullUp from "@/components/ui/word-pull-up";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import Link from "next/link";

export default function LandingPage() {
  const [color, setColor] = useState("#ffffff");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only renders client-side interactive elements after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}

        refresh
      />



      <main className="container mx-auto px-4 py-20 relative z-10 mt-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="whitespace-pre-wrap bg-gradient-to-r from-[#F0F8FF] via-[#87CEEB] via-[#9370DB] to-[#FFB6C1] bg-clip-text text-center text-[7rem] font-bold leading-none text-transparent animate-gradient-fast dark:from-[#F0F8FF] dark:via-[#87CEEB] dark:via-[#9370DB] dark:to-[#FFB6C1] dark:via-[#F0F8FF] mb-2"
        >
          {/* <div className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-[#F0F8FF] via-[#9370DB] to-[#FFB6C1] bg-clip-text text-center text-8xl font-semibold leading-none text-transparent animate-gradient-fast">
            {isMounted && (
              <SparklesText text="" />
            )}
            <span>Al<i>t</i>node</span>

          </div> */}
          <h1 className="whitespace-pre-wrap bg-gradient-to-r dark:from-[#F0F8FF] dark:via-[#87CEEB] dark:via-[#9370DB] dark:to-[#FFB6C1] dark:via-[#F0F8FF] bg-clip-text text-transparent text-center text-3xl md:text-7xl lg:text-9xl font-bold relative z-20 leading-none animate-gradient-fast">
            Al<i>t</i>node
          </h1>

        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-center mb-4 text-gray-300"
        >
          {isMounted && (
            <WordPullUp>
              Revolutionizing AI with decentralized innovation
            </WordPullUp>
          )}
        </motion.div>
        <div className="flex justify-center">
          <Link href={'/nfts'}>

            <InteractiveHoverButton />
          </Link>
        </div>
      </main>
      {isMounted && <AnimatedBackground />}
    </div>
  );
}
