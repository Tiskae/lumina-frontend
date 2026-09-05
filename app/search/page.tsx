import { Suspense } from "react";
import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import SearchResults from "./SearchResults";

export const metadata = {
  title: "Search Properties | Lumina Real Estate",
  description: "Search luxury properties in Lagos, Abuja, and across Nigeria.",
};

export default function SearchPage() {
  return (
    <PageLayout currentPath="/search">
      <PageBanner
        title="Search Results"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
      />
      <Suspense
        fallback={
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ color: "var(--Text-secondary)" }}>Loading results...</p>
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </PageLayout>
  );
}
