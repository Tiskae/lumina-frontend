import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import ListingsSection from "@/components/sections/ListingsSection/ListingsSection";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/components/PropertyCard/PropertyCard";

export const metadata = {
  title: "Property Listings | Lumina Real Estate",
  description: "Browse luxury properties across Lagos, Abuja, and Africa.",
};

export default function ListingsPage() {
  const properties = propertiesData as Property[];

  return (
    <PageLayout currentPath="/properties" isAbsolute>
      <PageBanner
        title="Explore Properties"
        subtitle="Discover homes and spaces carefully selected to suit every lifestyle and budget."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Buy / Rent" }]}
      />
      <ListingsSection properties={properties} />
    </PageLayout>
  );
}
