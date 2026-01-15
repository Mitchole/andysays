"use client";

import { useState, useEffect, useCallback } from "react";
import buttonTexts from "@/data/buttonTexts.json";
import loadingStatuses from "@/data/loadingStatuses.json";
import { Spinner } from "@/components/ui/spinner";

type AppState = "idle" | "loading" | "result";

export default function AndySays() {
  const [state, setState] = useState<AppState>("idle");
  const [buttonText, setButtonText] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [reason, setReason] = useState("");

  // Set random button text on mount and after reset
  useEffect(() => {
    if (state === "idle") {
      setButtonText(buttonTexts[Math.floor(Math.random() * buttonTexts.length)]);
    }
  }, [state]);

  // Get a random unused status
  const getRandomStatus = useCallback((usedIndices: Set<number>): string => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * loadingStatuses.length);
    } while (usedIndices.has(idx) && usedIndices.size < loadingStatuses.length);
    usedIndices.add(idx);
    return loadingStatuses[idx];
  }, []);

  const handleClick = async () => {
    setState("loading");

    const usedIndices = new Set<number>();

    // Show 2-3 loading statuses for 5 seconds each (10-15 seconds total)
    const numStatuses = Math.random() < 0.5 ? 2 : 3;

    for (let i = 0; i < numStatuses; i++) {
      const status = getRandomStatus(usedIndices);
      setLoadingText(status + "...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Now fetch from the API
    try {
      const response = await fetch("https://naas.isalman.dev/no");
      const data = await response.json();
      setReason(data.reason);
    } catch {
      setReason("Because I said so. That's why.");
    }

    setState("result");
  };

  const handleReset = () => {
    setState("idle");
    setReason("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12 text-center">
        <h1
          className="text-6xl md:text-8xl font-black tracking-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            background:
              "linear-gradient(135deg, #b45309 0%, #dc2626 50%, #9a3412 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 30px rgba(180, 83, 9, 0.2)",
          }}
        >
          Andy Says
        </h1>
        <p
          className="mt-4 text-amber-800/60 text-lg tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The Oracle of Rejection
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl">
        {state === "idle" && (
          <button onClick={handleClick} className="w-full group relative overflow-hidden">
            <div className="relative px-12 py-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl shadow-orange-500/30 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-orange-500/50 group-active:scale-[0.98]">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span
                className="relative text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {buttonText}
              </span>
            </div>
          </button>
        )}

        {state === "loading" && (
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-12 py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
              <Spinner className="size-10 text-orange-500" />
              <span
                className="text-2xl font-semibold text-amber-800"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {loadingText}
              </span>
            </div>
          </div>
        )}

        {state === "result" && (
          <div className="text-center">
            {/* Explosive NO */}
            <div
              className="relative mb-8"
              style={{
                animation: "explode 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <div
                className="text-[12rem] md:text-[16rem] font-black leading-none select-none"
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  background: "linear-gradient(180deg, #dc2626 0%, #7f1d1d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 10px 30px rgba(220, 38, 38, 0.5))",
                  letterSpacing: "-0.05em",
                }}
              >
                NO
              </div>

              {/* Explosion particles */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-600 rounded-full"
                    style={{
                      animation: `particle${i % 4} 0.8s ease-out forwards`,
                      animationDelay: `${i * 0.05}s`,
                      opacity: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Reason */}
            <div
              className="mb-12 px-8 py-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100"
              style={{
                animation: "fadeUp 0.5s ease-out 0.3s both",
              }}
            >
              <p
                className="text-xl md:text-2xl text-amber-900 font-medium italic"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                &quot;{reason}&quot;
              </p>
            </div>

            {/* Try again button */}
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "'Inter', sans-serif",
                animation: "fadeUp 0.5s ease-out 0.5s both",
              }}
            >
              Ask Again (spoiler: still no)
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-16 text-amber-700/50 text-sm">
        Powered by{" "}
        <a
          href="https://naas.isalman.dev/no"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-700 transition-colors"
        >
          No-as-a-Service
        </a>
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes explode {
          0% {
            transform: scale(0) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes particle0 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + 100px), calc(-50% - 120px)) scale(1);
            opacity: 0;
          }
        }

        @keyframes particle1 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% - 120px), calc(-50% - 80px)) scale(1);
            opacity: 0;
          }
        }

        @keyframes particle2 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + 140px), calc(-50% + 60px)) scale(1);
            opacity: 0;
          }
        }

        @keyframes particle3 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% - 80px), calc(-50% + 100px)) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
