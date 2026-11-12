"use client";

interface InfiniteMarqueeProps {
  text: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  backgroundColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
}

export function InfiniteMarquee({
  text,
  speed = "normal",
  direction = "left",
  backgroundColor = "bg-gray-900",
  textColor = "text-white",
  size = "md",
}: InfiniteMarqueeProps) {
  const speedMap = {
    slow: "120s",
    normal: "60s",
    fast: "30s",
  };

  const sizeClasses = {
    sm: "text-sm py-2",
    md: "text-xl py-4",
    lg: "text-3xl py-6",
  };

  const animationDirection = direction === "right" ? "reverse" : "normal";
  const animationDuration = speedMap[speed];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee ${animationDuration} linear infinite;
          animation-direction: ${animationDirection};
          padding-right: 50px;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>

      <div className={`w-full ${backgroundColor} ${textColor} font-bold ${sizeClasses[size]} marquee-container`}>
        <div className="marquee-content">
          {text} • {text} • {text} • {text} • {text} •
        </div>
      </div>
    </>
  );
}
