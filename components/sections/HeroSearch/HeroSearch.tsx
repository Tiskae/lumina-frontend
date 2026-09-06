"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import SplitText from "@/components/SplitText/SplitText";
import styles from "./HeroSearch.module.scss";

import ImageHero from "/images/section/hero-1.jpg";

type SearchTab = "all" | "rent" | "sale";

const CITIES = [
  "All Cities",
  "Lagos Island",
  "Ikoyi",
  "Lekki",
  "Victoria Island",
  "Banana Island",
  "Oniru",
  "Abuja",
  "Maitama",
  "Asokoro",
];

const TYPES = ["All Types", "Apartment", "Villa", "Townhouse", "Commercial"];

const BEDROOMS = ["Any Beds", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];

const AMENITIES = [
  "Swimming Pool",
  "Gym",
  "24hr Security",
  "Generator",
  "Air Conditioning",
  "Smart Home",
  "Elevator / Lift",
  "Concierge",
  "CCTV",
  "Parking Space",
  "Water Treatment",
  "Boys' Quarters",
];

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>("all");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [beds, setBeds] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("status", activeTab);
    if (keyword) params.set("q", keyword);
    if (city && city !== "All Cities") params.set("city", city);
    if (type && type !== "All Types") params.set("type", type.toLowerCase());
    if (beds && beds !== "Any Beds") params.set("beds", beds.replace(/\D/g, ""));
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","));
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className={styles.pageTitle}>
      <div className="tf-container w-1770">
        {/* Heading */}
        <div className={styles.content}>
          <SplitText effect="split-lines-rotation-x" as="h1" className={styles.title}>
            Discover Homes That Fit You!
          </SplitText>
          <div className={styles.titleRow} style={{ marginTop: 20 }}>
            <div className={styles.subtitle}>
              Explore carefully selected properties in Lagos, Abuja, Port Harcourt, and other African cities. Supported
              by professional guidance, local market expertise, and a commitment to helping you find a home that truly
              matches your lifestyle and budget.
            </div>

            <Link href="/listings" className="tf-btn btn-bg-1 btn-px-32">
              <span>View Properties</span>
              <span className="bg-effect" />
            </Link>
          </div>
        </div>

        {/* Hero image with floating search form */}
        <div style={{ position: "relative" }}>
          <AnimateOnScroll direction="1" className={styles.heroImage}>
            <Image
              src={ImageHero}
              alt="Luxury Lagos property"
              width={1770}
              height={680}
              priority
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </AnimateOnScroll>

          {/* Search form */}
          <div className={styles.flatTab}>
            {/* Tab nav */}
            <nav className={styles.tabNav}>
              {(["all", "rent", "sale"] as SearchTab[]).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tabItem} ${activeTab === tab ? styles.active : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "all" ? "All" : tab === "rent" ? "For Rent" : "For Sale"}
                </button>
              ))}
            </nav>

            {/* Search box */}
            <form className={styles.searchBox} onSubmit={handleSearch}>
              <div className={styles.formGrid}>
                <div className={styles.fieldWrap}>
                  <label htmlFor="keyword">Keyword</label>
                  <input
                    id="keyword"
                    type="text"
                    placeholder="Search property..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrap}>
                  <label htmlFor="city">Location</label>
                  <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldWrap}>
                  <label htmlFor="type">Property Type</label>
                  <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldWrap}>
                  <label htmlFor="beds">Bedrooms</label>
                  <select id="beds" value={beds} onChange={(e) => setBeds(e.target.value)}>
                    {BEDROOMS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.searchActions}>
                <button type="button" className={styles.advancedToggle} onClick={() => setAdvancedOpen((v) => !v)}>
                  <i className="icon icon-filter" />
                  {advancedOpen ? "Simple Search" : "Advanced Search"}
                </button>

                <button type="submit" className="tf-btn btn-bg-1 btn-px-28">
                  <i className="icon icon-search" />
                  <span>Search Property</span>
                  <span className="bg-effect" />
                </button>
              </div>

              {/* Advanced panel */}
              <div className={`${styles.advancedPanel} ${advancedOpen ? styles.isOpen : ""}`}>
                <div className={styles.advancedGrid}>
                  <div className={styles.fieldWrap}>
                    <label>Bathrooms</label>
                    <select>
                      <option>Any Baths</option>
                      <option>1 Bath</option>
                      <option>2 Baths</option>
                      <option>3+ Baths</option>
                    </select>
                  </div>
                  <div className={styles.fieldWrap}>
                    <label>Garages</label>
                    <select>
                      <option>Any Garages</option>
                      <option>1 Garage</option>
                      <option>2 Garages</option>
                    </select>
                  </div>
                  <div className={styles.fieldWrap}>
                    <label>Min Size (sqft)</label>
                    <select>
                      <option>Min (SqFt)</option>
                      <option>1,000 SqFt</option>
                      <option>2,000 SqFt</option>
                      <option>3,000 SqFt</option>
                    </select>
                  </div>
                  <div className={styles.fieldWrap}>
                    <label>Max Size (sqft)</label>
                    <select>
                      <option>Max (SqFt)</option>
                      <option>3,000 SqFt</option>
                      <option>6,000 SqFt</option>
                      <option>10,000 SqFt</option>
                    </select>
                  </div>
                </div>

                {/* Amenities */}
                <div className={styles.amenitiesSection}>
                  <div className={styles.amenitiesLabel}>Amenities</div>
                  <div className={styles.amenitiesGrid}>
                    {AMENITIES.map((amenity) => (
                      <label key={amenity} className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                        />
                        <span className={styles.checkboxBox} />
                        <span className={styles.checkboxText}>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
