"use client";
import { useEffect, useState } from "react";

type Spark = { left: string; bottom: string; delay: string; duration: string };

export default function Sparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    const arr: Spark[] = Array.from({ length: 22 }, (_, i) => ({
      left: `${8 + ((i * 4.1) % 84)}%`,
      bottom: `${10 + (i % 5) * 8}%`,
      delay: `${(i * 0.27) % 6}s`,
      duration: `${4 + (i % 4)}s`,
    }));
    setSparks(arr);
  }, []);
  return (
    <div aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: s.left,
            bottom: s.bottom,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
