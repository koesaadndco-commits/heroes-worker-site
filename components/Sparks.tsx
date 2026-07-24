"use client";
import { useEffect, useState } from "react";

type Spark = {
  left: string;
  bottom: string;
  delay: string;
  duration: string;
  size: string;
};

export default function Sparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    const arr: Spark[] = Array.from({ length: 90 }, (_, i) => ({
      left: `${2 + ((i * 1.27) % 96)}%`,
      bottom: `${3 + (i % 8) * 7}%`,
      delay: `${(i * 0.11) % 6}s`,
      duration: `${3 + (i % 6) * 0.7}s`,
      size: `${3 + (i % 5) * 1.6}px`, // 3〜9.4px の大小
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
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
