import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import propertiesData from "@/data/properties.json";
import agentsData from "@/data/agents.json";
import type { Property } from "@/components/PropertyCard/PropertyCard";

export async function generateStaticParams() {
  return propertiesData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const property = propertiesData.find((p) => p.slug === params.slug);
  if (!property) return {};
  return {
    title: `${property.title} | Lumina`,
    description: property.description,
  };
}

export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = propertiesData.find((p) => p.slug === params.slug) as
    | Property
    | undefined;
  if (!property) notFound();

  const agent = agentsData.find((a) => a.id === property.agent as unknown as string);

  return (
    <PageLayout currentPath={`/properties/${params.slug}`}>
      {/* Gallery hero */}
      <section style={{ background: "var(--Bg-light)", paddingTop: 80 }}>
        <div className="tf-container">
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              fontSize: 14,
              color: "var(--Text-secondary)",
              marginBottom: 24,
            }}
          >
            <Link href="/" style={{ color: "var(--Text-secondary)" }}>Home</Link>
            <span>/</span>
            <Link href="/listings" style={{ color: "var(--Text-secondary)" }}>Listings</Link>
            <span>/</span>
            <span style={{ color: "var(--Primary)", fontWeight: 600 }}>{property.title}</span>
          </nav>

          {/* Main image */}
          <div
            style={{
              position: "relative",
              height: 520,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <Image
              src={property.image}
              alt={property.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: "flex", gap: 12, marginBottom: 48 }}>
            {property.gallery?.slice(1).map((img, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  flex: 1,
                  height: 140,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={img}
                  alt={`${property.title} ${i + 2}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail body */}
      <section style={{ padding: "60px 0 100px" }}>
        <div className="tf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 60 }}>
            {/* Left column */}
            <div>
              {/* Title + price */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <span
                    style={{
                      padding: "4px 14px",
                      borderRadius: 99,
                      background: "var(--Bg-light)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "var(--Text-primary)",
                    }}
                  >
                    {property.status === "for-sale" ? "For Sale" : "For Rent"}
                  </span>
                  <span
                    style={{
                      padding: "4px 14px",
                      borderRadius: 99,
                      background: "var(--Bg-light)",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "var(--Text-secondary)",
                    }}
                  >
                    {property.type}
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    lineHeight: "48px",
                    color: "var(--Text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {property.title}
                </h1>

                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
                  <i className="icon icon-MapPin" style={{ fontSize: 20, color: "var(--Primary)" }} />
                  <span style={{ fontSize: 15, color: "var(--Text-secondary)" }}>{property.address}</span>
                </div>

                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "var(--Primary)",
                  }}
                >
                  {property.price}
                </div>
              </div>

              {/* Specs */}
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  padding: "24px",
                  background: "var(--Bg-light)",
                  borderRadius: 12,
                  marginBottom: 32,
                  flexWrap: "wrap",
                }}
              >
                {[
                  { icon: "icon-Bed", value: property.beds, label: "Bedrooms" },
                  { icon: "icon-Bathtub", value: property.baths, label: "Bathrooms" },
                  { icon: "icon-Crop", value: `${property.sqft.toLocaleString()} sqft`, label: "Area" },
                  { icon: "icon-HashStraight", value: property.garages, label: "Garages" },
                ].map((spec) => (
                  <div key={spec.label} style={{ textAlign: "center", flex: 1 }}>
                    <i
                      className={`icon ${spec.icon}`}
                      style={{ fontSize: 28, color: "var(--Primary)", display: "block", marginBottom: 8 }}
                    />
                    <div style={{ fontSize: 20, fontWeight: 700, color: "var(--Text-primary)", marginBottom: 4 }}>
                      {spec.value}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--Text-secondary)" }}>{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--Text-primary)", marginBottom: 16 }}>
                  About This Property
                </h3>
                <p style={{ fontSize: 16, lineHeight: "28px", color: "var(--Text-secondary)" }}>
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--Text-primary)", marginBottom: 16 }}>
                  Amenities
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {property.amenities?.map((amenity) => (
                    <span
                      key={amenity}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1px solid var(--Line)",
                        fontSize: 14,
                        color: "var(--Text-primary)",
                      }}
                    >
                      <i className="icon icon-CheckCircle" style={{ color: "var(--Primary)", fontSize: 18 }} />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div>
              {/* Agent card */}
              {agent && (
                <div
                  style={{
                    border: "1px solid var(--Line)",
                    borderRadius: 16,
                    padding: 28,
                    position: "sticky",
                    top: 100,
                  }}
                >
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--Text-primary)",
                      marginBottom: 20,
                    }}
                  >
                    Contact Agent
                  </h4>

                  <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 16, color: "var(--Text-primary)" }}>
                        {agent.name}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--Primary)" }}>{agent.role}</div>
                    </div>
                  </div>

                  {/* Contact form */}
                  <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                      type="text"
                      placeholder="Your full name"
                      style={{
                        padding: "11px 16px",
                        border: "1px solid var(--Line)",
                        borderRadius: 8,
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      style={{
                        padding: "11px 16px",
                        border: "1px solid var(--Line)",
                        borderRadius: 8,
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      style={{
                        padding: "11px 16px",
                        border: "1px solid var(--Line)",
                        borderRadius: 8,
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                    <textarea
                      rows={4}
                      placeholder="I am interested in this property..."
                      style={{
                        padding: "11px 16px",
                        border: "1px solid var(--Line)",
                        borderRadius: 8,
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                    <button type="submit" className="tf-btn btn-bg-1 w-full">
                      <span>Send Enquiry</span>
                      <span className="bg-effect" />
                    </button>
                  </form>

                  <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                    <a
                      href={`tel:${agent.phone}`}
                      className="tf-btn btn-border"
                      style={{ flex: 1 }}
                    >
                      <i className="icon icon-PhoneCall" />
                      <span>Call</span>
                      <span className="bg-effect" />
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="tf-btn btn-border"
                      style={{ flex: 1 }}
                    >
                      <i className="icon icon-Email" />
                      <span>Email</span>
                      <span className="bg-effect" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
