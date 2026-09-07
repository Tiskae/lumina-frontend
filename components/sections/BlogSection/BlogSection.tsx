import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import styles from "./BlogSection.module.scss";
import blogData from "@/data/blog.json";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogSection() {
  const posts = blogData.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className="tf-container">
        <div className={styles.header}>
          <SectionHeading
            className={styles.heading}
            subtitle="Latest News"
            title={
              <>
                Insights from <br />
                Nigeria&apos;s Property Experts
              </>
            }
          />
          <Link href="/blog" className="tf-btn btn-border btn-px-28">
            <span>View All Posts</span>
            <i className="icon icon-ArowRight" />
            <span className="bg-effect" />
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <AnimateOnScroll key={post.id} direction="2" delay={i * 0.1}>
              <article className={styles.blogCard}>
                <Link href={`/blog/${post.slug}`} className={styles.thumb}>
                  <Image src={post.image} alt={post.title} width={400} height={200} />
                </Link>

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>{formatDate(post.date)}</span>
                    <span className={styles.readTime}>{post.readTime} min read</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className={styles.title}>
                    {post.title}
                  </Link>

                  <p className={styles.excerpt}>{post.excerpt}</p>

                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read Article <i className="icon icon-ArowRight" />
                  </Link>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
