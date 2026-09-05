import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import blogData from "@/data/blog.json";

export const metadata = {
  title: "Latest News | Lumina Real Estate",
  description:
    "Property market insights, investment guides, and expert advice from Lumina's team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <PageLayout currentPath="/blog">
      <PageBanner
        title="Latest News & Insights"
        subtitle="Expert perspectives on Nigeria's luxury property market."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <section style={{ padding: "80px 0" }}>
        <div className="tf-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 30,
            }}
          >
            {blogData.map((post) => (
              <article
                key={post.id}
                style={{
                  background: "var(--White)",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid var(--Line)",
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ display: "block", height: 220, position: "relative", overflow: "hidden" }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Link>

                <div style={{ padding: "24px" }}>
                  <div style={{ marginBottom: 12 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "4px 12px",
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
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: "block",
                      fontSize: 18,
                      fontWeight: 600,
                      lineHeight: "26px",
                      color: "var(--Text-primary)",
                      marginBottom: 10,
                    }}
                  >
                    {post.title}
                  </Link>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: "22px",
                      color: "var(--Text-secondary)",
                      marginBottom: 16,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 13,
                      color: "var(--Text-muted)",
                    }}
                  >
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
