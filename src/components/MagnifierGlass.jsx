import React, { useRef, useEffect, useState } from "react";

export default function MagnifierGlass({ zoom = 2, size = 160 }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const lensRef = useRef();

  useEffect(() => {
    function handleMove(e) {
      setShow(true);
      setPos({ x: e.clientX, y: e.clientY });
    }
    function handleLeave() {
      setShow(false);
    }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  // The lens is a fixed div with a scaled iframe overlay of the page
  // This is a hack, but works for portfolio/static sites
  return show ? (
    <div
      ref={lensRef}
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid rgba(255,255,255,0.5)",
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)",
        zIndex: 9999,
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -(pos.x * zoom - size / 2),
          top: -(pos.y * zoom - size / 2),
          width: `100vw`,
          height: `100vh`,
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        {/*
          This clones the entire page visually, but disables pointer events.
          If you want to magnify only a specific area, you can wrap your main content in a ref and render it here.
        */}
        {document.body && (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
            }}
            dangerouslySetInnerHTML={{ __html: document.body.innerHTML }}
          />
        )}
      </div>
    </div>
  ) : null;
}