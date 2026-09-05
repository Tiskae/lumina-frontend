import PageLayout from "@/components/PageLayout/PageLayout";
import HeroSearch from "@/components/sections/HeroSearch/HeroSearch";
import StatsBar from "@/components/sections/StatsBar/StatsBar";
import FeaturedProperties from "@/components/sections/FeaturedProperties/FeaturedProperties";
import CategorySection from "@/components/sections/CategorySection/CategorySection";
import AgentsSection from "@/components/sections/AgentsSection/AgentsSection";
import BlogSection from "@/components/sections/BlogSection/BlogSection";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/components/PropertyCard/PropertyCard";

export default function HomePage() {
  const properties = propertiesData as Property[];

  return (
    <PageLayout currentPath="/" isAbsolute showNewsletter>
      <HeroSearch />
      <StatsBar />
      <FeaturedProperties properties={properties} />
      <CategorySection />
      <AgentsSection />
      <BlogSection />
    </PageLayout>
  );
}
