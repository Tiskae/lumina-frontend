"use client";

import { useState, useMemo } from "react";
import styles from "./FinancingCalculator.module.scss";

interface Props {
  defaultPrice?: number;
  currencyCode?: string;
}

interface CurrencyConfig {
  code: string;
  locale: string;
  defaultRate: number;
  priceStep: number;
  disclaimer: string;
}

const CURRENCY_CONFIG: Record<string, CurrencyConfig> = {
  NGN: {
    code: "NGN",
    locale: "en-NG",
    defaultRate: 18,
    priceStep: 1_000_000,
    disclaimer:
      "* Estimates are indicative only. Actual mortgage terms depend on lender policies, creditworthiness, and prevailing CBN rates.",
  },
  ZAR: {
    code: "ZAR",
    locale: "en-ZA",
    defaultRate: 11.5,
    priceStep: 100_000,
    disclaimer:
      "* Estimates are indicative only. Actual bond terms depend on lender policies, creditworthiness, and prevailing SARB rates.",
  },
  USD: {
    code: "USD",
    locale: "en-US",
    defaultRate: 7,
    priceStep: 10_000,
    disclaimer:
      "* Estimates are indicative only. Actual mortgage terms depend on lender policies, creditworthiness, and prevailing market rates.",
  },
};

function formatCurrency(n: number, config: CurrencyConfig) {
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function FinancingCalculator({ defaultPrice = 0, currencyCode = "NGN" }: Props) {
  const config = CURRENCY_CONFIG[currencyCode] ?? CURRENCY_CONFIG.NGN;

  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(config.defaultRate);
  const [years, setYears] = useState(15);

  const { monthly, totalPayment, totalInterest, loanAmount } = useMemo(() => {
    const down = (downPct / 100) * price;
    const loan = price - down;
    if (loan <= 0 || rate <= 0 || years <= 0) {
      return { monthly: 0, totalPayment: 0, totalInterest: 0, loanAmount: loan };
    }
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n + down;
    const totalInterest = monthly * n - loan;
    return { monthly, totalPayment, totalInterest, loanAmount: loan };
  }, [price, downPct, rate, years]);

  const fmt = (n: number) => formatCurrency(n, config);

  return (
    <div className={styles.calc}>
      <div className={styles.fields}>
        {/* Property Price */}
        <div className={styles.field}>
          <label className={styles.label}>Property Price ({config.code})</label>
          <input
            type="number"
            className={styles.input}
            value={price}
            min={0}
            step={config.priceStep}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Down Payment */}
        <div className={styles.field}>
          <label className={styles.label}>Down Payment ({downPct}%)</label>
          <div className={styles.sliderWrap}>
            <input
              type="range"
              className={styles.slider}
              min={5}
              max={60}
              step={5}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
            />
            <div className={styles.sliderLabels}>
              <span>5%</span>
              <span>{fmt((downPct / 100) * price)}</span>
              <span>60%</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div className={styles.field}>
          <label className={styles.label}>Annual Interest Rate ({rate}%)</label>
          <div className={styles.sliderWrap}>
            <input
              type="range"
              className={styles.slider}
              min={6}
              max={30}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
            <div className={styles.sliderLabels}>
              <span>6%</span>
              <span>{rate}%</span>
              <span>30%</span>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div className={styles.field}>
          <label className={styles.label}>Loan Term (Years)</label>
          <div className={styles.termBtns}>
            {[5, 10, 15, 20, 25, 30].map((y) => (
              <button
                key={y}
                type="button"
                className={`${styles.termBtn} ${years === y ? styles.termActive : ""}`}
                onClick={() => setYears(y)}
              >
                {y}yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={styles.results}>
        <div className={styles.monthly}>
          <div className={styles.monthlyLabel}>Monthly Payment</div>
          <div className={styles.monthlyValue}>{monthly > 0 ? fmt(monthly) : "—"}</div>
        </div>

        <div className={styles.breakdown}>
          <div className={styles.bRow}>
            <span>Loan Amount</span>
            <span>{fmt(loanAmount)}</span>
          </div>
          <div className={styles.bRow}>
            <span>Down Payment ({downPct}%)</span>
            <span>{fmt((downPct / 100) * price)}</span>
          </div>
          <div className={styles.bRow}>
            <span>Total Interest Paid</span>
            <span>{totalInterest > 0 ? fmt(totalInterest) : "—"}</span>
          </div>
          <div className={`${styles.bRow} ${styles.bRowTotal}`}>
            <span>Total Cost</span>
            <span>{totalPayment > 0 ? fmt(totalPayment) : "—"}</span>
          </div>
        </div>

        <p className={styles.disclaimer}>{config.disclaimer}</p>
      </div>
    </div>
  );
}
