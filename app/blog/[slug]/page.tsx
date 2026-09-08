import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import blogData from "@/data/blog.json";
import agentsData from "@/data/agents.json";
import styles from "./BlogPost.module.scss";

export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
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

// Category counts for sidebar
function getCategoryCounts() {
  const counts: Record<string, number> = {};
  blogData.forEach((p) => {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const author = agentsData.find((a) => a.id === post.author);
  const related = blogData.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const fallbackRelated = blogData.filter((p) => p.id !== post.id).slice(0, 3);
  const sidebarPosts = related.length >= 2 ? related : fallbackRelated;
  const categories = getCategoryCounts();

  // body is an array of { type, text } blocks
  const body = (post as typeof post & { body?: { type: string; text: string }[] }).body ?? [];

  return (
    <PageLayout currentPath="/blog" isAbsolute>
      <PageBanner
        title={post.title}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]}
        style="style2"
        smallerHeading
        hasBg
        bgURL={post.image}
      />

      <div className={styles.wrapper}>
        <div className="tf-container">
          <div className={styles.layout}>
            {/* ── Article ───────────────────────────────────────────────── */}
            <article className={styles.article}>
              {/* Hero image */}
              {/* <div className={styles.heroImg}>
                <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} priority />
              </div> */}

              {/* Meta row */}
              <div className={styles.meta}>
                <span className={styles.catChip}>{post.category}</span>
                <span className={styles.dot} />
                <span className={styles.metaItem}>
                  <i className="icon icon-CalendarBlank" />
                  {formatDate(post.date)}
                </span>
                <span className={styles.dot} />
                <span className={styles.metaItem}>
                  <i className="icon icon-Clock" />
                  {post.readTime} min read
                </span>
              </div>

              {/* Lead paragraph (excerpt) */}
              <p className={styles.leadPara}>{post.excerpt}</p>

              {/* Article body */}
              <div className={styles.body}>
                {body.map((block, i) => {
                  if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
                  return <p key={i}>{block.text}</p>;
                })}
              </div>

              {/* Author card */}
              {author && (
                <div className={styles.authorCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={author.image} alt={author.name} className={styles.authorAvatar} />
                  <div>
                    <div className={styles.authorName}>{author.name}</div>
                    <div className={styles.authorRole}>{author.role}</div>
                    <p className={styles.authorBio}>{author.bio}</p>
                  </div>
                </div>
              )}

              <div className={styles.backBtn}>
                <Link href="/blog" className="tf-btn btn-border">
                  <i className="icon icon-CaretLeft" />
                  <span>Back to Blog</span>
                  <span className="bg-effect" />
                </Link>
              </div>
            </article>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className={styles.sidebar}>
              {/* Related posts */}
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Related Articles</h3>
                <div className={styles.relatedList}>
                  {sidebarPosts.map((p) => (
                    <div key={p.id} className={styles.relatedItem}>
                      <Link href={`/blog/${p.slug}`} className={styles.relatedThumb}>
                        <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} />
                      </Link>
                      <div className={styles.relatedInfo}>
                        <Link href={`/blog/${p.slug}`} className={styles.relatedTitle}>
                          {p.title}
                        </Link>
                        <span className={styles.relatedDate}>{formatDate(p.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Categories</h3>
                <div className={styles.catList}>
                  {categories.map(([cat, count]) => (
                    <div key={cat} className={styles.catItem}>
                      <span>{cat}</span>
                      <span className={styles.catCount}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
