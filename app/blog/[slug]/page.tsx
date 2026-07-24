import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { posts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: `ブログ | ${site.name}` };
  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Header />

      <article className="blog-article">
        <div className="wrap wrap-narrow">
          <Reveal>
            <div className="blog-card-meta">
              <span className="blog-cat">{post.category}</span>
              <time className="blog-date">{post.date}</time>
            </div>
            <h1 className="blog-article-title">{post.title}</h1>
            <div className="blog-article-body">
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="blog-back">
              <Link href="/blog" className="btn btn-ghost">
                ← ブログ一覧へ戻る
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <Footer />
    </>
  );
}
