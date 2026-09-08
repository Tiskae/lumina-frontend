"use client";

import { useState, useMemo } from "react";
import FilterSidebar, { type FilterState, MAX_PRICE } from "@/components/FilterSidebar/FilterSidebar";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import type { Property } from "@/components/PropertyCard/PropertyCard";
import styles from "./ListingsSection.module.scss";

interface Props {
  properties: Property[];
}

const DEFAULT_FILTERS: FilterState = {
  keyword: "",
  status: "all",
  types: [],
  city: "all",
  beds: "any",
  baths: "all",
  garages: "all",
  priceMin: 0,
  priceMax: MAX_PRICE,
};

export default function ListingsSection({ properties }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cities = useMemo(
    () => Array.from(new Set(properties.map((p) => p.city))).sort(),
    [properties]
  );

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const kw = filters.keyword.toLowerCase();
      if (kw && !p.title.toLowerCase().includes(kw) && !p.address?.toLowerCase().includes(kw)) return false;
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.types.length > 0 && !filters.types.includes(p.type)) return false;
      if (filters.city !== "all" && p.city !== filters.city) return false;
      if (filters.beds !== "any" && p.beds < Number(filters.beds)) return false;
      if (filters.baths !== "all" && p.baths < Number(filters.baths)) return false;
      if (filters.garages !== "all" && (p.garages ?? 0) < Number(filters.garages)) return false;
      const raw = p.priceRaw ?? 0;
      if (raw < filters.priceMin || raw > filters.priceMax) return false;
      return true;
    });
  }, [properties, filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return (a.priceRaw ?? 0) - (b.priceRaw ?? 0);
      if (sort === "price-desc") return (b.priceRaw ?? 0) - (a.priceRaw ?? 0);
      if (sort === "name") return a.title.localeCompare(b.title);
      return Number(b.id) - Number(a.id);
    });
  }, [filtered, sort]);

  const perPage = view === "list" ? 4 : 6;
  const totalPages = Math.ceil(sorted.length / perPage);
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  // Active filter chips
  const activeFilters: Array<{ label: string; key: string }> = [];
  if (filters.status !== "all") activeFilters.push({ label: filters.status === "for-sale" ? "For Sale" : "For Rent", key: "status" });
  if (filters.city !== "all") activeFilters.push({ label: filters.city, key: "city" });
  if (filters.beds !== "any") activeFilters.push({ label: `${filters.beds}+ Beds`, key: "beds" });
  if (filters.baths !== "all") activeFilters.push({ label: `${filters.baths}+ Baths`, key: "baths" });
  filters.types.forEach((t) => activeFilters.push({ label: t.charAt(0).toUpperCase() + t.slice(1), key: `type:${t}` }));

  function removeFilter(key: string) {
    if (key === "status") setFilters((f) => ({ ...f, status: "all" }));
    else if (key === "city") setFilters((f) => ({ ...f, city: "all" }));
    else if (key === "beds") setFilters((f) => ({ ...f, beds: "any" }));
    else if (key === "baths") setFilters((f) => ({ ...f, baths: "all" }));
    else if (key.startsWith("type:")) {
      const t = key.replace("type:", "");
      setFilters((f) => ({ ...f, types: f.types.filter((x) => x !== t) }));
    }
    setPage(1);
  }

  function handleSetFilters(f: FilterState) {
    setFilters(f);
    setPage(1);
  }

  function changeView(v: "grid" | "list") {
    setView(v);
    setPage(1);
  }

  return (
    <section className={styles.section}>
      <div className="tf-container">
        <div className={styles.row}>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className={styles.overlay}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Sidebar col */}
          <div className={`${styles.sidebarCol} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
            <FilterSidebar
              filters={filters}
              setFilters={handleSetFilters}
              cities={cities}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Main col */}
          <div className={styles.mainCol}>

            {/* Meta filter bar */}
            <div className={styles.metaFilter}>
              <div className={styles.topFilter}>
                <div className={styles.filterLeft}>
                  {/* Mobile filter toggle */}
                  <button
                    className={styles.btnFilter}
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open filters"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M3.125 6.876H5.703c.138-.537.45-1.014.89-1.354.438-.34.977-.525 1.532-.525s1.094.185 1.532.525c.439.34.752.817.89 1.354H16.875a.625.625 0 0 0 0-1.25H10.547A2.501 2.501 0 0 0 8.125 4a2.5 2.5 0 0 0-2.422 1.626H3.125a.625.625 0 0 0 0 1.25Zm5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm8.75 6.25H15.547a2.502 2.502 0 0 0-2.422-1.875 2.5 2.5 0 0 0-2.422 1.875H3.125a.625.625 0 0 0 0 1.25h7.578A2.502 2.502 0 0 0 13.125 16a2.5 2.5 0 0 0 2.422-1.875H16.875a.625.625 0 0 0 0-1.25Zm-3.75 1.875a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor"/>
                    </svg>
                    Filters
                  </button>
                  <div className={styles.resultCount}>
                    <span>{sorted.length}</span> {sorted.length === 1 ? "Result" : "Results"}
                  </div>
                </div>

                <div className={styles.filterRight}>
                  <div className={styles.sortWrap}>
                    <span>Sort by:</span>
                    <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                      <option value="default">Best Match</option>
                      <option value="name">Name</option>
                      <option value="price-asc">Price: Low–High</option>
                      <option value="price-desc">Price: High–Low</option>
                    </select>
                  </div>

                  <div className={styles.viewWrap}>
                    <span>View as:</span>
                    <div className={styles.viewToggle}>
                      <button
                        className={view === "grid" ? styles.viewActive : ""}
                        onClick={() => changeView("grid")}
                        aria-label="Grid view"
                      >
                        <i className="icon icon-GridFour" />
                      </button>
                      <button
                        className={view === "list" ? styles.viewActive : ""}
                        onClick={() => changeView("list")}
                        aria-label="List view"
                      >
                        <i className="icon icon-ListDashes" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active filter chips */}
              {activeFilters.length > 0 && (
                <div className={styles.activeFilters}>
                  {activeFilters.map((f) => (
                    <button key={f.key} className={styles.filterChip} onClick={() => removeFilter(f.key)}>
                      {f.label}
                      <i className="icon icon-close" />
                    </button>
                  ))}
                  <button
                    className={styles.clearAll}
                    onClick={() => { setFilters(DEFAULT_FILTERS); setPage(1); }}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Property cards */}
            {paged.length === 0 ? (
              <div className={styles.empty}>
                <i className="icon icon-HouseLine" />
                <p>No properties match your filters.</p>
                <button
                  className="tf-btn btn-border"
                  onClick={() => { setFilters(DEFAULT_FILTERS); setPage(1); }}
                >
                  <span>Clear Filters</span>
                  <span className="bg-effect" />
                </button>
              </div>
            ) : (
              <div className={`${styles.grid} ${view === "list" ? styles.listView : ""}`}>
                {paged.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    variant={view === "list" ? "list" : "default"}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <i className="icon icon-CaretLeft" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={p === page ? styles.pageActive : ""}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <i className="icon icon-CaretRight" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
