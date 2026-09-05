import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import agentsData from "@/data/agents.json";

export const metadata = {
  title: "Our Agents | Lumina Real Estate",
  description:
    "Meet the luxury property specialists behind Lumina — serving Lagos and Abuja.",
};

export default function AgentsPage() {
  return (
    <PageLayout currentPath="/agents">
      <PageBanner
        title="Meet Our Consultants"
        subtitle="Experienced specialists dedicated to Nigeria's most prestigious property markets."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Agents" },
        ]}
      />

      <section style={{ padding: "80px 0" }}>
        <div className="tf-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 30,
            }}
          >
            {agentsData.map((agent) => (
              <div
                key={agent.id}
                style={{
                  border: "1px solid var(--Line)",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  gap: 0,
                }}
              >
                {/* Image */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 200,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "32px 28px", flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--Primary)",
                      marginBottom: 8,
                    }}
                  >
                    {agent.city}
                  </div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "var(--Text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    {agent.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--Text-secondary)",
                      marginBottom: 16,
                    }}
                  >
                    {agent.role}
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: "22px",
                      color: "var(--Text-secondary)",
                      marginBottom: 20,
                    }}
                  >
                    {agent.bio}
                  </p>

                  {/* Stats */}
                  <div
                    style={{
                      display: "flex",
                      gap: 24,
                      marginBottom: 20,
                      paddingBottom: 20,
                      borderBottom: "1px solid var(--Line)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--Text-primary)",
                        }}
                      >
                        {agent.listings}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--Text-muted)" }}>
                        Listings
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--Text-primary)",
                        }}
                      >
                        {agent.sold}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--Text-muted)" }}>
                        Sold
                      </div>
                    </div>
                  </div>

                  {/* Contacts */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href={`tel:${agent.phone}`}
                      className="tf-btn btn-border"
                      style={{ fontSize: 13 }}
                    >
                      <i className="icon icon-PhoneCall" />
                      <span>Call</span>
                      <span className="bg-effect" />
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="tf-btn btn-border"
                      style={{ fontSize: 13 }}
                    >
                      <i className="icon icon-Email" />
                      <span>Email</span>
                      <span className="bg-effect" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 80,
              padding: "60px",
              background: "var(--Bg-light)",
              borderRadius: 20,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "var(--Text-primary)",
                marginBottom: 12,
              }}
            >
              Looking to Join Our Team?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--Text-secondary)",
                marginBottom: 28,
                maxWidth: 520,
                margin: "0 auto 28px",
              }}
            >
              We are always looking for talented property professionals who share
              our commitment to luxury service and client excellence.
            </p>
            <Link href="/contact" className="tf-btn btn-bg-1">
              <span>Get in Touch</span>
              <span className="bg-effect" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
