
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-white overflow-hidden px-4 py-12">
      {/* Animated geometric shapes */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <motion.div
          className="absolute bg-violet-500 rounded-full opacity-20"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          style={{ width: 200, height: 200, top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute bg-green-400 rounded-lg opacity-10"
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
          style={{ width: 150, height: 150, bottom: "15%", right: "10%" }}
        />
        <motion.div
          className="absolute bg-blue-300 rounded-full opacity-10"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          style={{ width: 100, height: 100, top: "60%", left: "30%" }}
        />
      </div>

      {/* Hero section */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ⚽ Football Analysis AI
        </motion.h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Empowering teams with intelligent match insights using computer vision,
          AI tracking, and beautiful analytics.
        </p>
      </div>

      {/* Logo pulse */}
      <motion.div
        className="mx-auto mb-12 w-32 h-32 relative"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Image
          src="/logo-football.png" // make sure this logo exists in public/
          alt="Football Logo"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        {[
          { title: "Player Tracking", desc: "Track every movement using YOLO & DeepSORT" },
          { title: "Ball Possession", desc: "Know who controls the ball every second" },
          { title: "Team Analytics", desc: "Compare teams by strategy, speed & passes" },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="mb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Built with Flask (Python), YOLOv8, React/Next.js, and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-6 flex-wrap text-sm mt-4">
          {["Flask", "YOLOv8", "DeepSORT", "Next.js", "Tailwind CSS", "Redux"].map((tech, i) => (
            <span
              key={i}
              className="bg-violet-100 dark:bg-violet-800 text-violet-700 dark:text-white px-4 py-2 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Contributors */}
      <div className="mb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Contributors</h2>
        <p className="text-gray-600 dark:text-gray-300">
        .
        </p>
        <div className="flex justify-center mt-4 gap-4 text-sm">
          <span className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded">Ayush Sharma</span>
          <span className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded">Kushagra Pandey</span>
          <span className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded">Gazal Yadav</span>
          <span className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded">Neeraj Kumar</span>
          <span className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded">Raghav Mathur</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/upload"
          className="inline-block px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition"
        >
          Start Uploading Your Match →
        </a>
      </div>
    </div>
  );
}
