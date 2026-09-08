"use client";

import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/components/PropertyCard/PropertyCard";

const properties = propertiesData as Property[];

export default function SearchResults() {
  const params = useSearchParams();
  const keyword = params.get("q") ?? "";
  const city = params.get("city") ?? "";
  const status = params.get("status") ?? "";
  const type = params.get("type") ?? "";

  const results = properties.filter((p) => {
    const matchesKeyword =
      !keyword ||
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (p.address ?? "").toLowerCase().includes(keyword.toLowerCase());
    const matchesCity = !city || p.city.toLowerCase() === city.toLowerCase();
    const matchesStatus = !status || p.status === status;
    const matchesType = !type || p.type === type;
    return matchesKeyword && matchesCity && matchesStatus && matchesType;
  });

  const label = [
    keyword && `"${keyword}"`,
    city && `in ${city}`,
    status === "for-sale" && "For Sale",
    status === "for-rent" && "For Rent",
    type && type.charAt(0).toUpperCase() + type.slice(1) + "s",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section style={{ padding: "60px 0 100px" }}>
      <div className="tf-container">
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 15, color: "var(--Text-secondary)" }}>
            {results.length} propert{results.length === 1 ? "y" : "ies"} found
            {label ? ` for ${label}` : ""}
          </p>
        </div>

        {results.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 30,
            }}
          >
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} variant="default" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <i
              className="icon icon-HouseLine"
              style={{
                fontSize: 64,
                color: "var(--Line)",
                display: "block",
                marginBottom: 20,
              }}
            />
            <h3
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "var(--Text-primary)",
                marginBottom: 12,
              }}
            >
              No properties found
            </h3>
            <p style={{ fontSize: 15, color: "var(--Text-secondary)" }}>
              Try adjusting your search filters or{" "}
              <a href="/properties" style={{ color: "var(--Primary)" }}>
                browse all properties
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
