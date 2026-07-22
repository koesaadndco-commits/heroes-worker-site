"use client";
import { useMemo, useState } from "react";
import { works, categories, type Work, type WorkCategory } from "@/lib/works";

export default function WorksGallery() {
  const [cat, setCat] = useState<WorkCategory | "all">("all");
  const [active, setActive] = useState<Work | null>(null);

  const shown = useMemo(
    () => (cat === "all" ? works : works.filter((w) => w.category === cat)),
    [cat]
  );

  return (
    <>
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c.key}
            className={`filter${cat === c.key ? " active" : ""}`}
            onClick={() => setCat(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="gallery">
        {shown.map((w) => (
          <div className="item" key={w.title} onClick={() => setActive(w)}>
            <div className="thumb">
              {w.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.image} alt={w.title} />
              ) : (
                "施工写真をここに"
              )}
              <span className="badge">{w.badge}</span>
            </div>
            <div className="body">
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty-note">該当する事例がありません。</div>
      )}

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <button
            className="lb-close"
            aria-label="閉じる"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lb-stage">
              {active.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.image} alt={active.title} />
              ) : (
                "写真は準備中です"
              )}
            </div>
            <div className="lb-cap">
              <div className="t">{active.title}</div>
              <div className="d">{active.desc}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
