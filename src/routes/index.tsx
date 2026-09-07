import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Smile,
  Stethoscope,
  Baby,
  ShieldCheck,
  CalendarCheck,
  Phone,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  X,
  ArrowRight,
  Menu,
} from "lucide-react";
import heroClinic from "@/assets/hero-clinic.jpg";
import dentistImg from "@/assets/dentist.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pearl Dental Studio — Modern Dentistry, Gentle Care" },
      {
        name: "description",
        content:
          "Pearl Dental Studio offers gentle, modern dental care — cleanings, whitening, implants and braces. Book your appointment online in seconds.",
      },
      {
        property: "og:title",
        content: "Pearl Dental Studio — Modern Dentistry, Gentle Care",
      },
      {
        property: "og:description",
        content:
          "Gentle, modern dental care — cleanings, whitening, implants and braces. Book your appointment online in seconds.",
      },
    ],
  }),
  component: Index,
});

const SERVICES = [
  {
    icon: Sparkles,
    name: "Teeth Whitening",
    desc: "Professional whitening for a visibly brighter smile in a single visit.",
    price: "From Rs 8,000",
  },
  {
    icon: Smile,
    name: "Braces & Aligners",
    desc: "Modern orthodontics — clear aligners and classic braces for all ages.",
    price: "From Rs 60,000",
  },
  {
    icon: Stethoscope,
    name: "Check-up & Cleaning",
    desc: "Gentle scaling, polishing and a full dental health assessment.",
    price: "From Rs 3,500",
  },
  {
    icon: ShieldCheck,
    name: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacement with premium implants.",
    price: "From Rs 45,000",
  },
  {
    icon: Baby,
    name: "Kids Dentistry",
    desc: "Friendly, fear-free dental care designed specially for children.",
    price: "From Rs 2,500",
  },
  {
    icon: CalendarCheck,
    name: "Root Canal",
    desc: "Painless single-visit root canal treatment with digital precision.",
    price: "From Rs 12,000",
  },
];

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("Teeth Whitening");
  const [slot, setSlot] = useState("10:00 AM");

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      <div
        className="animate-modal-in max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-lift sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Book an Appointment
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose your service and preferred time — we'll confirm shortly.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-display mt-5 text-xl font-bold text-foreground">
              Request Received!
            </h4>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
              Thank you! Your booking request for <strong>{service}</strong> at{" "}
              <strong>{slot}</strong> has been noted. Our team will call you to confirm.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="bk-name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <input
                  id="bk-phone"
                  required
                  type="tel"
                  placeholder="03xx xxxxxxx"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bk-service" className="mb-1.5 block text-sm font-medium text-foreground">
                Select Service
              </label>
              <select
                id="bk-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
              >
                {SERVICES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bk-date" className="mb-1.5 block text-sm font-medium text-foreground">
                Preferred Date
              </label>
              <input
                id="bk-date"
                required
                type="date"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div>
              <span className="mb-1.5 block text-sm font-medium text-foreground">
                Preferred Time
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSlot(t)}
                    className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all ${
                      slot === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-medium text-foreground">
                Notes <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="bk-notes"
                rows={2}
                placeholder="Anything we should know?"
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-accent py-4 text-sm font-bold tracking-widest text-accent-foreground uppercase transition-transform hover:scale-[1.02]"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Smile className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Pearl<span className="text-accent">Dental</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Services</a>
            <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">About</a>
            <a href="#visit" className="text-muted-foreground transition-colors hover:text-foreground">Visit Us</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookingOpen(true)}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 sm:block"
            >
              Book Appointment
            </button>
            <button
              className="rounded-full p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-background px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#visit" onClick={() => setMenuOpen(false)}>Visit Us</a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setBookingOpen(true);
                }}
                className="rounded-full bg-accent px-5 py-2.5 font-bold text-accent-foreground"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wide text-secondary-foreground uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Accepting new patients
            </span>
            <h1 className="font-display animate-fade-up-delay mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              A brighter smile starts{" "}
              <span className="relative inline-block text-primary">
                here
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 6 Q 50 0 98 6" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Gentle, modern dentistry in a calming space. From routine cleanings to
              complete smile makeovers — we make every visit feel easy.
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.04]"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#services"
                className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Explore services
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">(600+ reviews)</span>
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="hidden sm:block">
                <span className="font-semibold">15+</span>{" "}
                <span className="text-muted-foreground">years of care</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden h-full w-full rounded-[2rem] bg-sage lg:block" aria-hidden="true" />
            <img
              src={heroClinic}
              alt="Bright modern treatment room at Pearl Dental Studio"
              width={1600}
              height={1000}
              className="relative w-full rounded-[2rem] object-cover shadow-soft"
            />
            <div className="animate-float absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-lift sm:left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <CalendarCheck className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Next available</p>
                <p className="text-sm font-bold">Today, 3:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-forest py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                Our Services
              </p>
              <h2 className="font-display mt-3 max-w-lg text-3xl font-bold text-cream sm:text-4xl">
                Everything your smile needs, under one roof
              </h2>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:scale-105"
            >
              Book a Visit
            </button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="group rounded-2xl border border-cream/10 bg-cream/5 p-6 transition-all hover:border-accent/50 hover:bg-cream/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold text-cream">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent">{s.price}</span>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-cream transition-colors hover:text-accent"
                  >
                    Book <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why us */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <img
              src={dentistImg}
              alt="Dr. Ayesha Khan, lead dentist at Pearl Dental Studio"
              width={900}
              height={1100}
              loading="lazy"
              className="w-full max-w-md rounded-[2rem] object-cover shadow-soft"
            />
            <div className="absolute right-0 bottom-8 rounded-2xl bg-card p-5 shadow-lift sm:-right-4">
              <p className="font-display text-3xl font-extrabold text-primary">12k+</p>
              <p className="text-xs font-medium text-muted-foreground">Happy patients treated</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
              Why Pearl Dental
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
              Led by Dr. Ayesha Khan — dentistry without the fear
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We believe a dental visit should feel like a breath of fresh air. Our
              studio combines the latest technology with a warm, unhurried approach —
              so you leave smiling, every time.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Painless treatments with modern equipment",
                "Transparent pricing — no surprise bills",
                "Same-day emergency appointments",
                "Sterilization standards you can trust",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{point}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setBookingOpen(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.04]"
            >
              Meet Us — Book Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Visit info */}
      <section id="visit" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-card p-7 shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <MapPin className="h-5 w-5 text-primary" />
              </span>
              <h3 className="font-display mt-4 font-bold">Location</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                12-B Main Boulevard, Gulberg III, Lahore
              </p>
            </div>
            <div className="rounded-2xl bg-card p-7 shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <Clock className="h-5 w-5 text-primary" />
              </span>
              <h3 className="font-display mt-4 font-bold">Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Mon – Sat, 10:00 AM – 8:00 PM
                <br />
                Sunday closed
              </p>
            </div>
            <div className="rounded-2xl bg-card p-7 shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <Phone className="h-5 w-5 text-primary" />
              </span>
              <h3 className="font-display mt-4 font-bold">Call Us</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                +92 300 1234567
                <br />
                hello@pearldental.pk
              </p>
            </div>
          </div>

          {/* CTA banner */}
          <div className="mt-14 overflow-hidden rounded-[2rem] bg-primary p-8 text-center sm:p-14">
            <h2 className="font-display mx-auto max-w-xl text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready for your best smile yet?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-primary-foreground/80 sm:text-base">
              Booking takes less than a minute. Pick a service, pick a time — we'll
              take care of the rest.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="mt-8 rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-wide text-accent-foreground uppercase transition-transform hover:scale-105"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Smile className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold">
              Pearl<span className="text-accent">Dental</span>
            </span>
          </a>
          <p className="text-xs text-muted-foreground">
            © 2026 Pearl Dental Studio. Prototype for client presentation.
          </p>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
