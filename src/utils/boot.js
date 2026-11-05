const KEY = "whoa-splash-seen";

/**
 * The loading scene plays once per browser session (a new tab or a fresh visit),
 * not on every refresh or page change. Add ?splash to any URL to force it.
 * Keep this logic in sync with the inline script in index.html.
 */
export function shouldShowSplash() {
  try {
    if (/[?&]splash\b/.test(window.location.search)) return true;
    return !sessionStorage.getItem(KEY);
  } catch {
    return true; // storage blocked: just show it
  }
}

export function markSplashSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage blocked: ignore */
  }
}

/** Requests the site's web-font faces explicitly (document.fonts.ready alone resolves instantly). */
export function loadFonts() {
  if (!document.fonts) return Promise.resolve();
  return Promise.all([
    document.fonts.load('500 1rem "Fraunces"'),
    document.fonts.load('italic 400 1rem "Fraunces"'),
    document.fonts.load('400 1rem "Hanken Grotesk"'),
    document.fonts.load('600 1rem "Hanken Grotesk"'),
  ]).catch(() => {});
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
