"use client";

import { useState } from "react";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import type { Property } from "@/components/PropertyCard/PropertyCard";
import styles from "./PropertyGrid.module.scss";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const perPage = 6;

  const sorted = [...properties].sort((a, b) => {
    if (sort === "price-asc") return (a.priceRaw ?? 0) - (b.priceRaw ?? 0);
    if (sort === "price-desc") return (b.priceRaw ?? 0) - (a.priceRaw ?? 0);
    return Number(b.id) - Number(a.id);
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <section className={styles.section}>
      <div className="tf-container">
        {/* Top bar */}
        <div className={styles.topBar}>
          <p className={styles.resultCount}>
            Showing{" "}
            <strong>
              {(page - 1) * perPage + 1}&ndash;{Math.min(page * perPage, sorted.length)}
            </strong>{" "}
            of <strong>{sorted.length}</strong> properties
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div className={styles.sortWrap}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div className={styles.viewToggle}>
              <button
                className={view === "grid" ? styles.active : ""}
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <i className="icon icon-GridFour" />
              </button>
              <button
                className={view === "list" ? styles.active : ""}
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <i className="icon icon-ListDashes" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className={`${styles.grid} ${view === "list" ? styles.listView : ""}`}>
          {paged.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              variant={view === "list" ? "list" : "default"}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.navBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <i className="icon icon-CaretLeft" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={p === page ? styles.active : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}

            <button
              className={styles.navBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <i className="icon icon-CaretRight" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
