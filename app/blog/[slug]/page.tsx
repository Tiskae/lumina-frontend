import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import blogData from "@/data/blog.json";
import agentsData from "@/data/agents.json";

export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: `${post.title} | Lumina`, description: post.excerpt };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const author = agentsData.find((a) => a.id === post.author);

  return (
    <PageLayout currentPath="/blog">
      <PageBanner
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        style="style2"
      />

      <article style={{ padding: "80px 0" }}>
        <div className="tf-container" style={{ maxWidth: 820 }}>
          {/* Hero image */}
          <div
            style={{
              position: "relative",
              height: 460,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 40,
            }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Meta */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <span
              style={{
                padding: "4px 14px",
                borderRadius: 99,
                background: "var(--Bg-light)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--Primary)",
                textTransform: "uppercase",
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: 14, color: "var(--Text-muted)" }}>
              {formatDate(post.date)}
            </span>
            <span style={{ fontSize: 14, color: "var(--Text-muted)" }}>
              {post.readTime} min read
            </span>
          </div>

          {/* Excerpt / content */}
          <p
            style={{
              fontSize: 18,
              lineHeight: "30px",
              color: "var(--Text-secondary)",
              marginBottom: 32,
            }}
          >
            {post.excerpt}
          </p>

          <p style={{ fontSize: 16, lineHeight: "28px", color: "var(--Text-secondary)", marginBottom: 24 }}>
            {post.content}
          </p>

          {/* Author */}
          {author && (
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                padding: "28px",
                borderRadius: 16,
                border: "1px solid var(--Line)",
                marginTop: 48,
                background: "var(--Bg-light)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: "var(--Text-primary)", marginBottom: 4 }}>
                  {author.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--Primary)", marginBottom: 8 }}>
                  {author.role}
                </div>
                <p style={{ fontSize: 14, color: "var(--Text-secondary)", lineHeight: "22px" }}>
                  {author.bio}
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: 40 }}>
            <Link href="/blog" className="tf-btn btn-border">
              <i className="icon icon-CaretLeft" />
              <span>Back to Blog</span>
              <span className="bg-effect" />
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
