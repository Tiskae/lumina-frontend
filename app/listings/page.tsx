import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import PropertyGrid from "@/components/sections/PropertyGrid/PropertyGrid";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/components/PropertyCard/PropertyCard";

export const metadata = {
  title: "Property Listings | Lumina Real Estate",
  description: "Browse luxury properties across Lagos, Abuja, and Africa.",
};

export default function ListingsPage() {
  const properties = propertiesData as Property[];

  return (
    <PageLayout currentPath="/listings">
      <PageBanner
        title="Property Listings"
        subtitle="Browse our curated selection of luxury properties across Nigeria and Africa."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Listings" },
        ]}
      />
      <PropertyGrid properties={properties} />
    </PageLayout>
  );
}
