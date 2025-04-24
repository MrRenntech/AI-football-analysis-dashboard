"use client";

import React, { useState } from "react";
import { mdiChevronDown, mdiChevronUp, mdiEmail } from "@mdi/js";
import Icon from "../_components/Icon";

const faqs = [
  {
    question: "How do I upload a football match video?",
    answer:
      "Go to the Upload tab from the sidebar, choose your video file (MP4, AVI), and click Upload Match. Once it's processed, results will be available in the dashboard.",
  },
  {
    question: "What formats are supported for uploads?",
    answer: "We currently support MP4, AVI, and MOV video formats.",
  },
  {
    question: "How long does analysis take?",
    answer:
      "Analysis can take a few minutes depending on video length and server load. Check back under the Dashboard tab for updates.",
  },
  {
    question: "Can I manually tag players or teams?",
    answer:
      "Yes! Use the manual correction section in the dashboard after uploading to assign player names and team associations.",
  },
  {
    question: "Where can I download analysis reports?",
    answer:
      "Once a match is processed, you'll see a Download button under that match in the dashboard for CSV or JSON reports.",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        🧠 Help & FAQ
      </h1>

      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 dark:border-slate-700 rounded-lg">
            <button
              onClick={() => toggleIndex(index)}
              className="flex justify-between items-center w-full px-4 py-3 font-semibold text-left text-violet-700 dark:text-violet-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              <span>{faq.question}</span>
              <Icon path={activeIndex === index ? mdiChevronUp : mdiChevronDown} size={1} />
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-700 dark:text-gray-300 transition">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-10 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Still need help?
        </p>
        <a
          href="mailto:support@footballanalysis.ai"
          className="inline-flex items-center px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition"
        >
          <Icon path={mdiEmail} size={1} className="mr-2" />
          Contact Support
        </a>
      </div>
    </div>
  );
}
