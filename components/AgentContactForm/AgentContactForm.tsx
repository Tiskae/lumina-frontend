"use client";

import { useState } from "react";
import styles from "./AgentContactForm.module.scss";

interface Props {
  agentName: string;
}

export default function AgentContactForm({ agentName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Record<string, boolean> = {};
    if (!name.trim()) e.name = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = true;
    if (!phone.trim()) e.phone = true;
    if (!message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  if (sent) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>
          <i className="icon icon-CheckCircle" />
        </div>
        <p className={styles.successTitle}>Enquiry sent!</p>
        <p className={styles.successText}>
          {agentName} will be in touch with you shortly.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setErrors({});
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
      />
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
      />
      <textarea
        rows={4}
        placeholder="I am interested in this property..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
      />
      <button
        type="submit"
        className={`tf-btn btn-bg-1 w-full ${loading ? styles.loading : ""}`}
        disabled={loading}
      >
        {loading ? <span className={styles.spinner} /> : null}
        <span>{loading ? "Sending..." : "Send Enquiry"}</span>
        <span className="bg-effect" />
      </button>
    </form>
  );
}
