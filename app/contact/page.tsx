import PageLayout from "@/components/PageLayout/PageLayout";
import PageBanner from "@/components/sections/PageBanner/PageBanner";
import agentsData from "@/data/agents.json";

export const metadata = {
  title: "Contact Us | Lumina Real Estate",
  description:
    "Get in touch with Lumina Real Estate. Our consultants are ready to help you find your ideal luxury property in Lagos or Abuja.",
};

export default function ContactPage() {
  return (
    <PageLayout currentPath="/contact">
      <PageBanner
        title="Contact Us"
        subtitle="Reach our team of luxury property consultants across Lagos and Abuja."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* Contact info + form */}
      <section style={{ padding: "80px 0" }}>
        <div className="tf-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left — info */}
            <div>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "var(--Text-primary)",
                  marginBottom: 16,
                  lineHeight: "44px",
                }}
              >
                Let&apos;s Find Your Perfect Property
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: "28px",
                  color: "var(--Text-secondary)",
                  marginBottom: 40,
                }}
              >
                Whether you are buying, selling, or renting, our consultants
                are here to guide you through every step. Reach us by phone,
                email, or visit one of our offices.
              </p>

              {/* Office cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  {
                    city: "Lagos",
                    address: "14 Bourdillon Road, Ikoyi, Lagos",
                    phone: "+234 800 111 2233",
                    email: "lagos@lumina.ng",
                    hours: "Mon – Fri, 8:00 am – 6:00 pm",
                  },
                  {
                    city: "Abuja",
                    address: "Plot 22 Aguiyi Ironsi Street, Maitama, Abuja",
                    phone: "+234 800 777 8899",
                    email: "abuja@lumina.ng",
                    hours: "Mon – Fri, 8:00 am – 5:30 pm",
                  },
                ].map((office) => (
                  <div
                    key={office.city}
                    style={{
                      padding: 28,
                      border: "1px solid var(--Line)",
                      borderRadius: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--Primary)",
                        marginBottom: 12,
                      }}
                    >
                      {office.city} Office
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {[
                        { icon: "icon-MapPin", text: office.address },
                        { icon: "icon-PhoneCall", text: office.phone },
                        { icon: "icon-Email", text: office.email },
                        { icon: "icon-Clock", text: office.hours },
                      ].map((item) => (
                        <div
                          key={item.icon}
                          style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                          }}
                        >
                          <i
                            className={`icon ${item.icon}`}
                            style={{
                              fontSize: 18,
                              color: "var(--Primary)",
                              marginTop: 2,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 14,
                              color: "var(--Text-secondary)",
                              lineHeight: "22px",
                            }}
                          >
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div
              style={{
                background: "var(--Bg-light)",
                borderRadius: 20,
                padding: 40,
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "var(--Text-primary)",
                  marginBottom: 8,
                }}
              >
                Send Us a Message
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--Text-secondary)",
                  marginBottom: 28,
                }}
              >
                We typically respond within one business day.
              </p>

              <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--Text-primary)",
                        marginBottom: 8,
                      }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amara"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid var(--Line)",
                        borderRadius: 8,
                        fontSize: 14,
                        background: "var(--White)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--Text-primary)",
                        marginBottom: 8,
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Osei"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid var(--Line)",
                        borderRadius: 8,
                        fontSize: 14,
                        background: "var(--White)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--Text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid var(--Line)",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "var(--White)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--Text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid var(--Line)",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "var(--White)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--Text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    Subject
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid var(--Line)",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "var(--White)",
                      outline: "none",
                      color: "var(--Text-primary)",
                      appearance: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="buying">I want to buy a property</option>
                    <option value="renting">I want to rent a property</option>
                    <option value="selling">I want to list my property</option>
                    <option value="valuation">Request a valuation</option>
                    <option value="other">Other enquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--Text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about what you're looking for..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid var(--Line)",
                      borderRadius: 8,
                      fontSize: 14,
                      background: "var(--White)",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <button type="submit" className="tf-btn btn-bg-1 w-full" style={{ marginTop: 8 }}>
                  <span>Send Message</span>
                  <span className="bg-effect" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ height: 420, background: "var(--Bg-light)", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <i
            className="icon icon-MapPin"
            style={{ fontSize: 48, color: "var(--Primary)" }}
          />
          <p style={{ fontSize: 16, color: "var(--Text-secondary)" }}>
            14 Bourdillon Road, Ikoyi, Lagos &nbsp;|&nbsp; Plot 22 Aguiyi Ironsi Street, Maitama, Abuja
          </p>
        </div>
      </section>

      {/* Team quick-links */}
      <section style={{ padding: "80px 0", background: "var(--White)" }}>
        <div className="tf-container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "var(--Text-primary)",
                marginBottom: 12,
              }}
            >
              Speak Directly with a Consultant
            </h2>
            <p style={{ fontSize: 16, color: "var(--Text-secondary)" }}>
              Our team is available Monday through Friday to answer any question.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {agentsData.map((agent) => (
              <div
                key={agent.id}
                style={{
                  padding: "28px 20px",
                  border: "1px solid var(--Line)",
                  borderRadius: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto 16px",
                    background: "var(--Bg-light)",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.image}
                    alt={agent.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--Text-primary)",
                    marginBottom: 4,
                  }}
                >
                  {agent.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--Primary)",
                    marginBottom: 16,
                  }}
                >
                  {agent.role}
                </div>
                <a
                  href={`tel:${agent.phone}`}
                  style={{
                    fontSize: 13,
                    color: "var(--Text-secondary)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  style={{
                    fontSize: 13,
                    color: "var(--Primary)",
                    display: "block",
                  }}
                >
                  {agent.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
