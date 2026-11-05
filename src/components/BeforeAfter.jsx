import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import RoomScene from "./RoomScene.jsx";

/**
 * A grimy room that gets wiped clean. It plays once on load, then the visitor can
 * drag (or use the arrow keys) to wipe it themselves.
 *
 * The reveal is built from transforms only (a sliding mask plus a counter-sliding
 * scene inside it), so there's no clip-path or width animation to repaint.
 */
export default function BeforeAfter() {
  const reduce = useReducedMotion();
  const boxRef = useRef(null);
  const start = reduce ? 0.62 : 0.03;
  const pos = useMotionValue(start); // 0 = all grimy, 1 = all clean
  const [touched, setTouched] = useState(false);
  const run = useRef(null);
  const dragging = useRef(false);
  const handleRef = useRef(null);

  const slideX = useTransform(pos, (v) => `${(v - 1) * 100}%`);
  const counterX = useTransform(pos, (v) => `${(1 - v) * 100}%`);

  // Keep the slider's accessibility values current by writing to the DOM directly.
  // Putting this in React state would re-render both room illustrations on every frame.
  useMotionValueEvent(pos, "change", (v) => {
    const p = Math.round(v * 100);
    const el = handleRef.current;
    if (el && el.getAttribute("aria-valuenow") !== String(p)) {
      el.setAttribute("aria-valuenow", String(p));
      el.setAttribute("aria-valuetext", `${p}% clean`);
    }
  });

  useEffect(() => {
    if (reduce) return;
    run.current = animate(pos, 0.64, { duration: 2.2, delay: 1.1, ease: [0.45, 0, 0.2, 1] });
    return () => run.current?.stop();
  }, [pos, reduce]);

  const setFromPointer = (e) => {
    const r = boxRef.current.getBoundingClientRect();
    pos.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
  };

  const onPointerDown = (e) => {
    run.current?.stop();
    dragging.current = true;
    setTouched(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromPointer(e);
  };
  const onPointerMove = (e) => dragging.current && setFromPointer(e);
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e) => {
    const keys = { ArrowLeft: -0.05, ArrowRight: 0.05 };
    if (e.key in keys) {
      e.preventDefault();
      run.current?.stop();
      setTouched(true);
      pos.set(Math.min(1, Math.max(0, pos.get() + keys[e.key])));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      run.current?.stop();
      setTouched(true);
      pos.set(e.key === "Home" ? 0 : 1);
    }
  };

  return (
    <div
      ref={boxRef}
      className="ba"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="ba__layer">
        <RoomScene variant="dirty" />
      </div>

      <motion.div className="ba__slide" style={{ x: slideX }}>
        <div className="ba__mask">
          <motion.div className="ba__layer" style={{ x: counterX }}>
            <RoomScene variant="clean" />
          </motion.div>
        </div>
        <div
          ref={handleRef}
          className="ba__handle"
          role="slider"
          tabIndex={0}
          aria-label="Wipe the room clean: drag, or use the left and right arrow keys"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(start * 100)}
          aria-valuetext={`${Math.round(start * 100)}% clean`}
          onKeyDown={onKeyDown}
        >
          <span className="ba__knob" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </motion.div>

      <span className="ba__tag ba__tag--after">Whoa.</span>
      <span className="ba__tag ba__tag--before">Before</span>

      <motion.span
        className="ba__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: touched ? 0 : 1 }}
        transition={{ duration: 0.4, delay: touched ? 0 : 3.6, ease: "easeOut" }}
        aria-hidden="true"
      >
        Drag to wipe
      </motion.span>
    </div>
  );
}
