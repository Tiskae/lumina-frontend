"use client";

import styles from "./FilterSidebar.module.scss";

export interface FilterState {
  keyword: string;
  status: "all" | "for-sale" | "for-rent";
  types: string[];
  city: string;
  beds: string;
  baths: string;
  garages: string;
  priceMin: number;
  priceMax: number;
}

export const MAX_PRICE = 3_000_000_000;
const STEP = 10_000_000;

function formatPrice(value: number) {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(0)}M`;
  return `₦${value.toLocaleString()}`;
}

interface Props {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  cities: string[];
  onClose: () => void;
}

export default function FilterSidebar({ filters, setFilters, cities, onClose }: Props) {
  function update(patch: Partial<FilterState>) {
    setFilters({ ...filters, ...patch });
  }

  function toggleType(type: string) {
    const types = filters.types.includes(type) ? filters.types.filter((t) => t !== type) : [...filters.types, type];
    update({ types });
  }

  const minPct = (filters.priceMin / MAX_PRICE) * 100;
  const maxPct = (filters.priceMax / MAX_PRICE) * 100;

  return (
    <div className={styles.sidebar}>
      {/* Mobile header */}
      <div className={styles.canvasHeader}>
        <div className="h5">Filters</div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">
          <i className="icon icon-close" />
        </button>
      </div>

      <div className={styles.canvasBody}>
        <div className={styles.innerGroup}>
          {/* Keyword search */}
          {/* <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Looking For</label>
            <div className={styles.searchField}>
              <input
                type="text"
                placeholder="Search keyword"
                value={filters.keyword}
                onChange={(e) => update({ keyword: e.target.value })}
              />
              <button type="button" aria-label="Search">
                <i className="icon icon-MagnifyingGlass" />
              </button>
            </div>
          </div> */}

          {/* Listing Status */}
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Listing Status</div>
            <div className={styles.optionList}>
              {(["all", "for-sale", "for-rent"] as const).map((s) => (
                <label key={s} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={filters.status === s}
                    onChange={() => update({ status: s })}
                  />
                  <span className={styles.radioBtn} />
                  <span>{s === "all" ? "All" : s === "for-sale" ? "For Sale" : "For Rent"}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Property Type</div>
            <div className={styles.optionList}>
              {["villa", "apartment", "townhouse", "commercial"].map((type) => (
                <label key={type} className={styles.checkItem}>
                  <input type="checkbox" checked={filters.types.includes(type)} onChange={() => toggleType(type)} />
                  <span className={styles.checkBtn} />
                  <span style={{ textTransform: "capitalize" }}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Location</div>
            <div className={styles.selectWrap}>
              <select value={filters.city} onChange={(e) => update({ city: e.target.value })}>
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <i className="icon icon-CaretDown" />
            </div>
          </div>

          {/* Bedrooms */}
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Bedrooms</div>
            <div className={styles.selectWrap}>
              <select value={filters.beds} onChange={(e) => update({ beds: e.target.value })}>
                <option value="any">Any Bedrooms</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
              <i className="icon icon-CaretDown" />
            </div>
          </div>

          {/* Baths */}
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Baths</div>
            <div className={styles.selectWrap}>
              <select value={filters.baths} onChange={(e) => update({ baths: e.target.value })}>
                <option value="all">All Baths</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
              <i className="icon icon-CaretDown" />
            </div>
          </div>

          {/* Garages */}
          {/* <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Garages</div>
            <div className={styles.selectWrap}>
              <select value={filters.garages} onChange={(e) => update({ garages: e.target.value })}>
                <option value="all">All Garages</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
              <i className="icon icon-CaretDown" />
            </div>
          </div> */}

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <div className={styles.filterLabel}>Price Range</div>
            <div className={styles.rangeSlider}>
              <div
                className={styles.rangeTrack}
                style={{
                  background: `linear-gradient(to right,
                    var(--Line) 0%,
                    var(--Line) ${minPct}%,
                    var(--Primary) ${minPct}%,
                    var(--Primary) ${maxPct}%,
                    var(--Line) ${maxPct}%,
                    var(--Line) 100%)`,
                }}
              />
              <input
                type="range"
                className={`${styles.rangeInput} ${styles.rangeMin}`}
                min={0}
                max={MAX_PRICE}
                step={STEP}
                value={filters.priceMin}
                onChange={(e) => update({ priceMin: Math.min(Number(e.target.value), filters.priceMax - STEP) })}
              />
              <input
                type="range"
                className={`${styles.rangeInput} ${styles.rangeMax}`}
                min={0}
                max={MAX_PRICE}
                step={STEP}
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: Math.max(Number(e.target.value), filters.priceMin + STEP) })}
              />
            </div>
            <div className={styles.rangeValues}>
              <span className={styles.rangeVal}>{formatPrice(filters.priceMin)}</span>
              <span>To</span>
              <span className={styles.rangeVal}>{formatPrice(filters.priceMax)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.filterActions}>
            <button
              type="button"
              className="tf-btn"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={onClose}
            >
              <i className="icon icon-MagnifyingGlass" />
              <span>Search</span>
              <span className="bg-effect" />
            </button>
            <div className={styles.botBtns}>
              <button
                type="button"
                className={styles.textBtn}
                onClick={() =>
                  setFilters({
                    keyword: "",
                    status: "all",
                    types: [],
                    city: "all",
                    beds: "any",
                    baths: "all",
                    garages: "all",
                    priceMin: 0,
                    priceMax: MAX_PRICE,
                  })
                }
              >
                <i className="icon icon-ArrowCounterClockwise" />
                <span>Reset all filters</span>
              </button>
              {/* <button type="button" className={styles.textBtn}>
                <i className="icon icon-Star" />
                <span>Save search</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
