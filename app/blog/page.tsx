import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `ヒーローズ ブログ | ${site.name}`,
  description:
    "Heroes Worker の施工事例・お知らせ・溶接コラムを発信するヒーローズ ブログです。",
};

export default function BlogIndex() {
  return (
    <>
      <Header />

      <section className="blog-hero">
        <div className="wrap">
          <h1 className="sr-only">ヒーローズ ブログ</h1>
          <Reveal className="blog-hero-banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog-hero.jpg"
              alt="ヒーローズ ブログ — 施工事例・お知らせ・溶接日常コラムを発信しています"
            />
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
