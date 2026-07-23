import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `ブログ | ${site.name}`,
  description:
    "Heroes Worker の施工事例・お知らせ・溶接コラムを発信するブログです。",
};

export default function BlogIndex() {
  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Blog</span>
            <h2>ブログ</h2>
            <p>施工事例・お知らせ・溶接コラムを発信しています。</p>
          </Reveal>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="wrap">
          <Reveal className="blog-list">
            {posts.map((p) => (
              <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
                <div className="blog-card-meta">
                  <span className="blog-cat">{p.category}</span>
                  <time className="blog-date">{p.date}</time>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="blog-more">続きを読む →</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
