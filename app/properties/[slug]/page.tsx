import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import PropertyGallery from "@/components/PropertyGallery/PropertyGallery";
import FinancingCalculator from "@/components/FinancingCalculator/FinancingCalculator";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import AgentContactForm from "@/components/AgentContactForm/AgentContactForm";
import propertiesData from "@/data/properties.json";
import agentsData from "@/data/agents.json";
import type { Property } from "@/components/PropertyCard/PropertyCard";
import styles from "./PropertyDetail.module.scss";

export async function generateStaticParams() {
  return propertiesData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const property = propertiesData.find((p) => p.slug === params.slug);
  if (!property) return {};
  return {
    title: `${property.title} | Lumina`,
    description: property.description,
  };
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = propertiesData.find((p) => p.slug === params.slug) as Property | undefined;
  if (!property) notFound();

  const agent = agentsData.find((a) => a.id === (property.agent as unknown as string));
  const images = (property.gallery?.length ? property.gallery : [property.image]) as string[];
  const paragraphs = property.description?.split("\n\n") ?? [];

  // Related: same type first, then same city, exclude self — pick 3
  const related = (propertiesData as Property[])
    .filter((p) => p.id !== property.id)
    .sort((a, b) => {
      const aScore = (a.type === property.type ? 2 : 0) + (a.city === property.city ? 1 : 0);
      const bScore = (b.type === property.type ? 2 : 0) + (b.city === property.city ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <PageLayout currentPath={`/properties/${params.slug}`} isAbsolute>
      {/* ── Gallery Hero ─────────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className="tf-container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <i className="icon icon-CaretRight" />
            <Link href="/properties">Properties</Link>
            <i className="icon icon-CaretRight" />
            <span>{property.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Gallery */}
            <div className={styles.heroGallery}>
              <PropertyGallery images={images} title={property.title} />
            </div>

            {/* Key info panel */}
            <div className={styles.heroInfo}>
              <div className={styles.tagRow}>
                <span className={styles.statusTag}>{property.status === "for-sale" ? "For Sale" : "For Rent"}</span>
                <span className={styles.typeTag}>{property.type}</span>
              </div>

              <h1 className={styles.heroTitle}>{property.title}</h1>

              <div className={styles.addressRow}>
                <i className="icon icon-MapPin" />
                <span>{property.address}</span>
              </div>

              <div className={styles.heroPriceDivider} />
              <div className={styles.heroPrice}>{property.price}</div>

              <div className={styles.heroQuickStats}>
                <div className={styles.heroStat}>
                  <i className="icon icon-Bed" />
                  <span>{property.beds} Beds</span>
                </div>
                <div className={styles.heroStat}>
                  <i className="icon icon-Bathtub" />
                  <span>{property.baths} Baths</span>
                </div>
                <div className={styles.heroStat}>
                  <i className="icon icon-Crop" />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detail Body ──────────────────────────────────────────────────── */}
      <section className={styles.bodySection}>
        <div className="tf-container">
          <div className={styles.bodyGrid}>
            {/* ── Left Column ──────────────────────────────────────────────── */}
            <div className={styles.leftCol}>
              {/* Specs bar */}
              <div className={styles.specsBar}>
                {[
                  { icon: "icon-Bed", value: property.beds, label: "Bedrooms" },
                  { icon: "icon-Bathtub", value: property.baths, label: "Bathrooms" },
                  { icon: "icon-Crop", value: `${property.sqft.toLocaleString()} sqft`, label: "Area" },
                  {
                    icon: "icon-Warehouse",
                    value: `${property.garages ?? 0} ${property.garages && property?.garages > 1 ? "cars" : "car"}`,
                    label: "Garages",
                  },
                  { icon: "icon-CalendarBlank", value: property.yearBuilt, label: "Year Built" },
                  {
                    icon: "icon-HouseLine",
                    value: property.type.charAt(0).toUpperCase() + property.type.slice(1),
                    label: "Property Type",
                  },
                ].map((spec) => (
                  <div key={spec.label} className={styles.specItem}>
                    <i className={`icon ${spec.icon}`} />
                    <div className={styles.specValue}>{spec.value}</div>
                    <div className={styles.specLabel}>{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* ── Description ──────────────────────────────────────────── */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>About This Property</h3>
                <div className={styles.descriptionBody}>
                  {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* ── Additional Details ────────────────────────────────────── */}
              {property.details && property.details.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Additional Details</h3>
                  <div className={styles.detailsTable}>
                    {property.details.map((d, i) => (
                      <div key={d.label} className={`${styles.detailRow} ${i % 2 === 0 ? styles.detailRowAlt : ""}`}>
                        <span className={styles.detailLabel}>{d.label}</span>
                        <span className={styles.detailValue}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Property Utilities ────────────────────────────────────── */}
              {property.utilities && property.utilities.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Property Utilities</h3>
                  <div className={styles.utilitiesGrid}>
                    {property.utilities.map((util) => (
                      <div key={util} className={styles.utilityItem}>
                        <i className="icon icon-CheckCircle" />
                        <span>{util}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Amenities ────────────────────────────────────────────── */}
              {property.amenities && property.amenities.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Amenities</h3>
                  <div className={styles.amenitiesGrid}>
                    {property.amenities.map((a) => (
                      <span key={a} className={styles.amenityChip}>
                        <i className="icon icon-CheckCircle" />
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Property on Map ───────────────────────────────────────── */}
              {property.latitude && property.longitude && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Property on Map</h3>
                  <div className={styles.mapWrap}>
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01},${property.latitude - 0.008},${property.longitude + 0.01},${property.latitude + 0.008}&layer=mapnik&marker=${property.latitude},${property.longitude}`}
                      title={`Map of ${property.title}`}
                      className={styles.mapFrame}
                      loading="lazy"
                    />
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}#map=16/${property.latitude}/${property.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapLink}
                    >
                      <i className="icon icon-ArrowSquareOut" />
                      View larger map
                    </a>
                  </div>
                </div>
              )}

              {/* ── Financing Calculator ──────────────────────────────────── */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Financing Calculator</h3>
                <FinancingCalculator defaultPrice={property.priceRaw ?? 0} />
              </div>

              {/* ── What's Nearby ─────────────────────────────────────────── */}
              {property.nearby && property.nearby.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>What&rsquo;s Nearby</h3>
                  <div className={styles.nearbyGrid}>
                    {property.nearby.map((n) => (
                      <div key={n.place} className={styles.nearbyItem}>
                        <i className="icon icon-MapPin" />
                        <div className={styles.nearbyInfo}>
                          <span className={styles.nearbyPlace}>{n.place}</span>
                          <span className={styles.nearbyDist}>{n.distance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right Sidebar ─────────────────────────────────────────────── */}
            <div className={styles.rightCol}>
              {/* Agent card */}
              {agent && (
                <div className={styles.agentCard}>
                  <h4 className={styles.agentCardTitle}>Contact Agent</h4>

                  <div className={styles.agentInfo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={agent.image} alt={agent.name} className={styles.agentAvatar} />
                    <div>
                      <div className={styles.agentName}>{agent.name}</div>
                      <div className={styles.agentRole}>{agent.role}</div>
                    </div>
                  </div>

                  {/* Contact form */}
                  <AgentContactForm agentName={agent.name} />

                  <div className={styles.agentCtaBtns}>
                    <a href={`tel:${agent.phone}`} className="tf-btn btn-border" style={{ flex: 1 }}>
                      <i className="icon icon-PhoneCall" />
                      <span>Call</span>
                      <span className="bg-effect" />
                    </a>
                    <a href={`mailto:${agent.email}`} className="tf-btn btn-border" style={{ flex: 1 }}>
                      <i className="icon icon-Email" />
                      <span>Email</span>
                      <span className="bg-effect" />
                    </a>
                  </div>
                </div>
              )}

              {/* Quick summary card */}
              <div className={styles.summaryCard}>
                <h4 className={styles.summaryTitle}>Property Summary</h4>
                <ul className={styles.summaryList}>
                  <li>
                    <span className={styles.summaryKey}>Listed</span>
                    <span className={styles.summaryVal}>
                      {property.status === "for-sale" ? "For Sale" : "For Rent"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.summaryKey}>Type</span>
                    <span className={styles.summaryVal} style={{ textTransform: "capitalize" }}>
                      {property.type}
                    </span>
                  </li>
                  <li>
                    <span className={styles.summaryKey}>City</span>
                    <span className={styles.summaryVal}>
                      {property.city}, {property.state}
                    </span>
                  </li>
                  <li>
                    <span className={styles.summaryKey}>Bedrooms</span>
                    <span className={styles.summaryVal}>{property.beds}</span>
                  </li>
                  <li>
                    <span className={styles.summaryKey}>Bathrooms</span>
                    <span className={styles.summaryVal}>{property.baths}</span>
                  </li>
                  <li>
                    <span className={styles.summaryKey}>Garages</span>
                    <span className={styles.summaryVal}>{property.garages ?? 0}</span>
                  </li>
                  <li>
                    <span className={styles.summaryKey}>Area</span>
                    <span className={styles.summaryVal}>{property.sqft.toLocaleString()} sqft</span>
                  </li>
                  {property.yearBuilt && (
                    <li>
                      <span className={styles.summaryKey}>Year Built</span>
                      <span className={styles.summaryVal}>{property.yearBuilt}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Properties ───────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="tf-container">
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>Related Properties</h2>
              <Link href="/properties" className="tf-btn btn-border">
                <span>View All</span>
                <span className="bg-effect" />
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} variant="default" whiteBg={true} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
