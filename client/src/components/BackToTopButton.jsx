import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    let hideTimeout;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);

      if (scrollTop > 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // Detect scrolling
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 300);

      // Reset auto-hide timer (3 sec after stop scrolling)
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Mobile tooltip stays visible for 2s
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1000,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Tooltip */}
      <span
        style={{
          marginBottom: "0.5rem",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "0.35rem 0.7rem",
          borderRadius: "0.5rem",
          fontSize: "0.8rem",
          whiteSpace: "nowrap",
          opacity: showTooltip ? 1 : 0,
          transform: showTooltip ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: "none",
        }}
      >
        Back to Top
      </span>

      {/* Button with progress ring */}
      <div
        style={{
          position: "relative",
          width: "3.5rem",
          height: "3.5rem",
        }}
      >
        {/* Progress ring */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
            animation: isScrolling ? "glow 0.6s infinite" : "none",
          }}
          width="100%"
          height="100%"
          viewBox="0 0 36 36"
        >
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(99,102,241,0.3)"
            strokeWidth="2.5"
          />
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="2.5"
            strokeDasharray="100, 100"
            strokeDashoffset={100 - scrollProgress}
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6eb0f7ff" />
              <stop offset="100%" stopColor="#b3d8ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Actual button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            backgroundImage: "linear-gradient(135deg, #0b7df8ff, #6eb0f7ff)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow:
              "0 4px 10px rgba(0, 0, 0, 0.25), 0 0 12px rgba(99, 102, 241, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.2s ease-in-out",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: isScrolling ? "pop 0.6s infinite" : "none",
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={22} />
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pop {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(99,102,241,0.5));
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(99,102,241,0.9));
          }
        }
      `}</style>
    </div>
  );
};

export default BackToTopButton;
