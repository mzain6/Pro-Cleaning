import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { MobileCallBar, PageTransition } from "./components/Extras.jsx";
import { LinkButton } from "./components/ui.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Reviews from "./pages/Reviews.jsx";
import Contact from "./pages/Contact.jsx";

function NotFound() {
  return (
    <section className="notfound container">
      <h1 className="display display--xl">
        Whoa, <span className="em">wrong turn.</span>
      </h1>
      <p className="lead">That page doesn't exist, but the rest of the house is spotless.</p>
      <LinkButton to="/">Back to home</LinkButton>
    </section>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main>
        {/* "instant" matters: the page has CSS smooth-scroll, which would otherwise animate this jump */}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route
              path="/services"
              element={<PageTransition title="Services"><Services /></PageTransition>}
            />
            <Route
              path="/about"
              element={<PageTransition title="About"><About /></PageTransition>}
            />
            <Route
              path="/reviews"
              element={<PageTransition title="Reviews"><Reviews /></PageTransition>}
            />
            <Route
              path="/contact"
              element={<PageTransition title="Contact"><Contact /></PageTransition>}
            />
            <Route
              path="*"
              element={<PageTransition title="Not found"><NotFound /></PageTransition>}
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
