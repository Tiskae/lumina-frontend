import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import ContactForm from "@/components/ContactForm/ContactForm";
import agentsData from "@/data/agents.json";
import styles from "./Contact.module.scss";

export const metadata = {
  title: "Contact Us | Lumina Real Estate",
  description:
    "Get in touch with Lumina Real Estate. Our consultants are ready to help you find your ideal luxury property in Lagos or Abuja.",
};

const OFFICES = [
  {
    city: "Lagos",
    address: "14 Bourdillon Road, Ikoyi, Lagos",
    phone: "0912 044 8767",
    email: "lagos@lumina.ng",
    hours: "Mon - Fri, 8:00 am - 6:00 pm",
    lat: 6.4481,
    lng: 3.4369,
  },
  {
    city: "Abuja",
    address: "Plot 22 Aguiyi Ironsi Street, Maitama, Abuja",
    phone: "0912 044 8767",
    email: "abuja@lumina.ng",
    hours: "Mon - Fri, 8:00 am - 5:30 pm",
    lat: 9.0764,
    lng: 7.4836,
  },
];

export default function ContactPage() {
  return (
    <PageLayout currentPath="/contact" isAbsolute>
      <PageBanner
        title="Contact Us"
        subtitle="Reach our team of luxury property consultants across Lagos and Abuja."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* ── Info + Form ───────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className="tf-container">
          <div className={styles.grid}>
            {/* Left — office info */}
            <div>
              <h2 className={styles.heading}>Let&apos;s Find Your Perfect Property</h2>
              <p className={styles.subtext}>
                Whether you are buying, selling, or renting, our consultants are here to guide you through every step.
                Reach us by phone, email, or visit one of our offices.
              </p>

              <div className={styles.officeList}>
                {OFFICES.map((office) => (
                  <div key={office.city} className={styles.officeCard}>
                    <div className={styles.officeCity}>{office.city} Office</div>
                    <div className={styles.officeDetails}>
                      {[
                        { icon: "icon-MapPin", text: office.address },
                        { icon: "icon-PhoneCall", text: office.phone },
                        { icon: "icon-Email", text: office.email },
                        { icon: "icon-Clock", text: office.hours },
                      ].map((row) => (
                        <div key={row.icon} className={styles.officeRow}>
                          <i className={`icon ${row.icon}`} />
                          <span>{row.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — contact form */}
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send Us a Message</h3>
              <p className={styles.formNote}>We typically respond within one business day.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Map strip (Lagos office) ──────────────────────────────────────── */}
      <div className={styles.mapStrip}>
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=3.4169,6.4281,3.4569,6.4681&layer=mapnik&marker=6.4481,3.4369`}
          title="Lumina Lagos Office"
          className={styles.mapFrame}
          loading="lazy"
        />
      </div>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className={styles.teamSection}>
        <div className="tf-container">
          <div className={styles.teamHeader}>
            <h2 className={styles.teamTitle}>Speak Directly with a Consultant</h2>
            <p className={styles.teamSub}>Our team is available Monday through Friday to answer any question.</p>
          </div>

          <div className={styles.teamGrid}>
            {agentsData.map((agent) => (
              <div key={agent.id} className={styles.agentCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={agent.image} alt={agent.name} className={styles.agentAvatar} />
                <div className={styles.agentName}>{agent.name}</div>
                <div className={styles.agentRole}>{agent.role}</div>
                <a href={`tel:${agent.phone}`} className={styles.agentPhone}>
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className={styles.agentEmail}>
                  {agent.email}
                </a>
                <div className={styles.agentBtns}>
                  <a href={`tel:${agent.phone}`} className="tf-btn btn-border">
                    <i className="icon icon-PhoneCall" />
                    <span>Call</span>
                    <span className="bg-effect" />
                  </a>
                  <a href={`mailto:${agent.email}`} className="tf-btn btn-border">
                    <i className="icon icon-Email" />
                    <span>Email</span>
                    <span className="bg-effect" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
