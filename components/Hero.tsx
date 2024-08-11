"use client";
import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <BackgroundGradientAnimation></BackgroundGradientAnimation>
      {/* <LampDemo /> */}
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-lg">
          <h1 className="mb-5 text-5xl font-bold text-clip bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-500">
            Who we are?
          </h1>
          <TextGenerateEffect
            words="A digital platform for small and medium-scale farmers, utilizing blockchain for secure data storage, AI for crop disease detection and weather-based farming suggestions, and an e-commerce platform for direct farmer-to-consumer transactions. It also offers real-time financial advice through a mobile app to help farmers make informed decisions."
            className="mb-5 text-clip bg-clip-text dark bg-gradient-to-r from-primary to-accent-500"
          />

          {/* {token == undefined ? (
            <button className="btn btn-secondary">
              <Link href="/sign-up">
                <p>Login</p>
              </Link>
            </button>
          ) : ( */}
            <button className="btn btn-secondary">
              <Link href="/ai-help">
                <p>Explore Our Ai</p>
              </Link>
            </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
