import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import blogData from "@/data/blog.json";
import styles from "./Blog.module.scss";

export const metadata = {
  title: "Latest News | Lumina Real Estate",
  description: "Property market insights, investment guides, and expert advice from Lumina's team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const featured = blogData.find((p) => p.featured);
  const rest = blogData.filter((p) => p.id !== featured?.id);

  return (
    <PageLayout currentPath="/blog" isAbsolute>
      <PageBanner
        title="Latest News & Insights"
        subtitle="Expert perspectives on Nigeria's luxury property market."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className={styles.section}>
        <div className="tf-container">
          {/* Featured post */}
          {featured && (
            <AnimateOnScroll direction="1">
            <article className={styles.featured}>
              <Link href={`/blog/${featured.slug}`} className={styles.featuredImg}>
                <Image src={featured.image} alt={featured.title} fill style={{ objectFit: "cover" }} priority />
              </Link>

              <div className={styles.featuredBody}>
                <span className={styles.featuredLabel}>Featured</span>
                <Link href={`/blog/${featured.slug}`} className={styles.featuredTitle}>
                  {featured.title}
                </Link>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.catChip}>{featured.category}</span>
                  <span className={styles.dot} />
                  <span>{formatDate(featured.date)}</span>
                  <span className={styles.dot} />
                  <span>{featured.readTime} min read</span>
                </div>
              </div>
            </article>
            </AnimateOnScroll>
          )}

          {/* All other posts */}
          <AnimateOnScroll direction="1">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeading}>More Articles</h2>
          </div>
          </AnimateOnScroll>

          <div className={styles.grid}>
            {rest.map((post, i) => (
              <AnimateOnScroll key={post.id} direction="2" delay={i * 0.1}>
              <article className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.cardImgWrap}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.cardCat}>
                    <span className={styles.catChip}>{post.category}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className={styles.cardTitle}>
                    {post.title}
                  </Link>

                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <span>{formatDate(post.date)}</span>
                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                      Read more <i className="icon icon-CaretRight" />
                    </Link>
                  </div>
                </div>
              </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
