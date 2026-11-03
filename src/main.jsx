import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import App from "./App.jsx";
import Splash from "./components/Splash.jsx";
import { loadFonts, markSplashSeen, shouldShowSplash, wait } from "./utils/boot.js";
import "./styles/index.css";

function Root({ splash }) {
  const [showSplash, setShowSplash] = useState(splash);
  const [appReady, setAppReady] = useState(!splash);

  // The site mounts *while* the curtain is lifting, so its entrance
  // animations play as the splash slides away.
  const reveal = () => {
    markSplashSeen();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setAppReady(true);
    setShowSplash(false);
  };

  return (
    <>
      {appReady && <App />}
      <AnimatePresence>{showSplash && <Splash key="splash" onReveal={reveal} />}</AnimatePresence>
    </>
  );
}

function mount(splash) {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        {/* honours the visitor's "reduce motion" OS setting */}
        <MotionConfig reducedMotion="user">
          <Root splash={splash} />
        </MotionConfig>
      </BrowserRouter>
    </React.StrictMode>
  );
}

if (shouldShowSplash()) {
  // The splash itself covers the font-loading wait.
  mount(true);
} else {
  // Returning visitor: no splash, but still wait (briefly) for the web fonts so the
  // headline reveal doesn't reflow mid-animation. Never wait more than 1.2s.
  Promise.race([loadFonts(), wait(1200)]).then(() => mount(false));
}
