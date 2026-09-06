import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import styles from "./AgentsSection.module.scss";
import agentsData from "@/data/agents.json";

export default function AgentsSection() {
  return (
    <section className={styles.section}>
      <div className="tf-container">
        <SectionHeading
          subtitle="Our Agents"
          title={
            <>
              Meet the People Behind <br />
              Every Perfect Match
            </>
          }
          align="center"
        />

        <div className={styles.grid}>
          {agentsData.map((agent, i) => (
            <AnimateOnScroll key={agent.id} direction="2" delay={i * 0.1}>
              <Link href={`/contact#${agent.id}`} className={styles.agentCard}>
                <div className={styles.agentImg}>
                  <Image src={agent.image} alt={agent.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div className={styles.agentInfo}>
                  <div className={styles.name}>{agent.name}</div>
                  <div className={styles.role}>{agent.role}</div>
                  <div className={styles.meta}>
                    <span>
                      <strong>{agent.listings}</strong>
                      Listings
                    </span>
                    <span>
                      <strong>{agent.sold}</strong>
                      Sold
                    </span>
                    <span>
                      <strong>{agent.city}</strong>
                      Base
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
