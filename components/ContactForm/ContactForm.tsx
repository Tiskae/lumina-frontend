"use client";

import { useState } from "react";
import styles from "./ContactForm.module.scss";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "First name is required.";
  if (!f.lastName.trim()) e.lastName = "Last name is required.";
  if (!f.email.trim()) {
    e.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    e.email = "Please enter a valid email address.";
  }
  if (!f.phone.trim()) e.phone = "Phone number is required.";
  if (!f.subject) e.subject = "Please select a topic.";
  if (!f.message.trim()) e.message = "Message is required.";
  return e;
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const first = document.querySelector("[data-field-error]") as HTMLElement;
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>
          <i className="icon icon-CheckCircle" />
        </div>
        <h3 className={styles.successTitle}>Message Sent!</h3>
        <p className={styles.successText}>
          Thank you, {fields.firstName}. One of our consultants will be in touch within one business day.
        </p>
        <button
          type="button"
          className="tf-btn btn-border"
          onClick={() => { setFields(EMPTY); setErrors({}); setSubmitted(false); }}
        >
          <span>Send Another Message</span>
          <span className="bg-effect" />
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.nameRow}>
        <Field label="First Name" error={errors.firstName}>
          <input
            type="text"
            placeholder="e.g. Amara"
            className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
            value={fields.firstName}
            onChange={(e) => set("firstName", e.target.value)}
          />
        </Field>
        <Field label="Last Name" error={errors.lastName}>
          <input
            type="text"
            placeholder="e.g. Osei"
            className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
            value={fields.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Email Address" error={errors.email}>
        <input
          type="email"
          placeholder="you@example.com"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          value={fields.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </Field>

      <Field label="Phone Number" error={errors.phone}>
        <input
          type="tel"
          placeholder="e.g. 0912 044 8767"
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          value={fields.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </Field>

      <Field label="Subject" error={errors.subject}>
        <select
          className={`${styles.select} ${errors.subject ? styles.inputError : ""}`}
          value={fields.subject}
          onChange={(e) => set("subject", e.target.value)}
        >
          <option value="">Select a topic</option>
          <option value="buying">I want to buy a property</option>
          <option value="renting">I want to rent a property</option>
          <option value="selling">I want to list my property</option>
          <option value="valuation">Request a valuation</option>
          <option value="other">Other enquiry</option>
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          rows={5}
          placeholder="Tell us about what you're looking for..."
          className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </Field>

      <button
        type="submit"
        className={`tf-btn btn-bg-1 w-full ${styles.submitBtn} ${loading ? styles.loading : ""}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className={styles.spinner} />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <span className="bg-effect" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.fieldWrap} data-field-error={error ? true : undefined}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}
