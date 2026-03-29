import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Features", "Joint Accounts", "Projects", "Pricing"];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Expense Tracking",
    desc: "Log every rupee. Auto-categorize transactions and get a crystal-clear picture of where your money flows — daily, weekly, or monthly.",
    accent: "#00E5CC",
    tag: "Core",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Category Budgets",
    desc: "Set smart budgets per category — groceries, travel, dining, utilities. Visual progress bars warn you before you overspend.",
    accent: "#7C6FFF",
    tag: "Smart",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Joint Accounts",
    desc: "Share finances seamlessly with partners, family, or flatmates. Real-time sync with role-based permissions and split-expense clarity.",
    accent: "#FF6B6B",
    tag: "Social",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Project Budgets",
    desc: "Companies and teams can allocate budgets per project, track burn rate, and get alerts before deadlines and funds collide.",
    accent: "#F5A623",
    tag: "Business",
  },
];

const STATS = [
  { value: "₹2.4Cr+", label: "Managed monthly" },
  { value: "18K+", label: "Active users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "User rating" },
];

const TESTIMONIALS = [
  {
    quote: "Finally a finance app that handles our startup's project budgets AND my personal expenses. Game changer.",
    name: "Arjun Mehta",
    role: "Founder, Paytm-era startup",
    avatar: "AM",
    color: "#7C6FFF",
  },
  {
    quote: "The joint account feature with my wife is incredibly smooth. No more 'where did that ₹5000 go' arguments.",
    name: "Priya Sharma",
    role: "Product Manager",
    avatar: "PS",
    color: "#00E5CC",
  },
  {
    quote: "Category budgets with visual alerts saved me from blowing my travel fund three months in a row.",
    name: "Rohan Das",
    role: "Freelance Designer",
    avatar: "RD",
    color: "#FF6B6B",
  },
];

function AnimatedCounter({ target, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
          const duration = 1800;
          const steps = 60;
          const increment = numTarget / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numTarget) {
              setCount(numTarget);
              clearInterval(timer);
            } else {
              setCount(parseFloat(current.toFixed(1)));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target.includes(".")
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString("en-IN");

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

export default function WelcomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((p) => (p + 1) % FEATURES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background: "#080B14",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; }

        .font-display { font-family: 'Syne', sans-serif; }

        .glow-teal { box-shadow: 0 0 40px rgba(0,229,204,0.15); }
        .glow-purple { box-shadow: 0 0 40px rgba(124,111,255,0.15); }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float-anim { animation: float 5s ease-in-out infinite; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeSlideUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.15s; opacity: 0; }
        .delay-2 { animation-delay: 0.3s; opacity: 0; }
        .delay-3 { animation-delay: 0.45s; opacity: 0; }
        .delay-4 { animation-delay: 0.6s; opacity: 0; }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid currentColor;
          animation: pulse-ring 2s ease-out infinite;
        }

        .tab-bar::-webkit-scrollbar { display: none; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #00E5CC, #7C6FFF, #FF6B6B, #7C6FFF, #00E5CC);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .nav-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .feature-pill {
          transition: all 0.25s ease;
        }

        .dash-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
        }

        .progress-bar {
          height: 6px;
          border-radius: 99px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .gradient-border {
          position: relative;
          border-radius: 20px;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(0,229,204,0.4), rgba(124,111,255,0.4), rgba(255,107,107,0.2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      {/* NAV */}
      

      {/* HERO */}
      <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">
        {/* Glows */}
        <div className="hero-glow w-96 h-96 -top-20 -left-20 opacity-30" style={{ background: "#7C6FFF" }} />
        <div className="hero-glow w-96 h-96 top-1/2 -right-20 opacity-20" style={{ background: "#00E5CC" }} />
        <div className="hero-glow w-64 h-64 bottom-20 left-1/3 opacity-15" style={{ background: "#FF6B6B" }} />

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 fade-up"
                style={{
                  background: "rgba(0,229,204,0.1)",
                  border: "1px solid rgba(0,229,204,0.2)",
                  color: "#00E5CC",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Now with AI-powered insights
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 fade-up delay-1">
                Finance that{" "}
                <span className="shimmer-text">thinks</span>
                <br />
                like you do
              </h1>

              <p className="text-lg text-white/50 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 fade-up delay-2">
                Track expenses, manage budgets by category, share joint accounts with loved ones, and keep company projects on budget — all in one elegant dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start fade-up delay-3">
                <button
                  className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #00E5CC, #7C6FFF)" }}
                >
                  Start for free
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-medium text-sm border transition-all duration-200 hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch demo
                </button>
              </div>

              <p className="text-xs text-white/30 mt-4 fade-up delay-4">No credit card required · Free forever plan</p>
            </div>

            {/* Right — Dashboard Preview */}
            <div className="flex-1 w-full max-w-lg float-anim">
              <div
                className="gradient-border rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {/* Mini dashboard */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Total Balance</p>
                    <p className="font-display text-2xl font-bold">₹1,24,580</p>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(0,229,204,0.12)", color: "#00E5CC" }}
                  >
                    +8.2% this month
                  </div>
                </div>

                {/* Spending bars */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Groceries", spent: 8200, budget: 12000, color: "#00E5CC" },
                    { label: "Travel", spent: 22000, budget: 25000, color: "#F5A623" },
                    { label: "Dining", spent: 5400, budget: 8000, color: "#7C6FFF" },
                    { label: "Utilities", spent: 3200, budget: 4000, color: "#FF6B6B" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white/40">₹{item.spent.toLocaleString("en-IN")} / ₹{item.budget.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(item.spent / item.budget) * 100}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Joint", val: "2 accounts", icon: "👥" },
                    { label: "Projects", val: "4 active", icon: "📁" },
                    { label: "Saved", val: "₹18.4K", icon: "💰" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-3 text-center"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-xs font-medium text-white/80">{item.val}</div>
                      <div className="text-xs text-white/30">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl font-bold mb-1 shimmer-text">
                {s.value}
              </div>
              <div className="text-sm text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "#00E5CC" }}>
            Everything you need
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
            Built for every kind of{" "}
            <span className="shimmer-text">money story</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Whether you're tracking personal expenses, sharing with family, or managing company projects — Finnr adapts to you.
          </p>
        </div>

        {/* Feature tabs */}
        <div className="flex gap-2 overflow-x-auto tab-bar mb-12 pb-1 justify-center flex-wrap">
          {FEATURES.map((f, i) => (
            <button
              key={f.title}
              onClick={() => setActiveFeature(i)}
              className="feature-pill flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap border"
              style={{
                background: activeFeature === i ? `${FEATURES[i].accent}18` : "rgba(255,255,255,0.04)",
                borderColor: activeFeature === i ? `${FEATURES[i].accent}50` : "rgba(255,255,255,0.08)",
                color: activeFeature === i ? FEATURES[i].accent : "rgba(255,255,255,0.5)",
              }}
            >
              <span style={{ color: FEATURES[i].accent }}>{f.icon}</span>
              {f.title}
            </button>
          ))}
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onClick={() => setActiveFeature(i)}
              className="card-hover rounded-2xl p-6 cursor-pointer border"
              style={{
                background: activeFeature === i ? `${f.accent}10` : "rgba(255,255,255,0.03)",
                borderColor: activeFeature === i ? `${f.accent}40` : "rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${f.accent}18`, color: f.accent }}
              >
                {f.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-base">{f.title}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${f.accent}18`, color: f.accent }}
                >
                  {f.tag}
                </span>
              </div>
              <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOINT ACCOUNTS DEEP DIVE */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Visual */}
            <div className="flex-1">
              <div
                className="rounded-2xl p-6 max-w-md mx-auto"
                style={{ background: "rgba(255,107,107,0.06)", border: "1px solid rgba(255,107,107,0.15)" }}
              >
                <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Joint Account</p>
                <div className="flex items-center gap-4 mb-6">
                  {["PS", "AM"].map((av, i) => (
                    <div key={av} className="flex items-center gap-2">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: i === 0 ? "#FF6B6B" : "#7C6FFF" }}
                      >
                        {av}
                      </div>
                      <span className="text-sm text-white/60">{i === 0 ? "Priya" : "Arjun"}</span>
                    </div>
                  ))}
                  <div className="ml-auto text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(0,229,204,0.12)", color: "#00E5CC" }}>Active</div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Priya", action: "Paid rent", amount: "-₹22,000", color: "#FF6B6B", time: "Today" },
                    { name: "Arjun", action: "Groceries", amount: "-₹3,400", color: "#7C6FFF", time: "Yesterday" },
                    { name: "Priya", action: "Electricity", amount: "-₹1,200", color: "#FF6B6B", time: "2d ago" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: tx.color }}
                      >
                        {tx.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{tx.action}</p>
                        <p className="text-xs text-white/30">{tx.name} · {tx.time}</p>
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#FF6B6B" }}>{tx.amount}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 rounded-xl p-3 flex items-center justify-between"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-xs text-white/40">Arjun owes Priya</span>
                  <span className="text-sm font-semibold" style={{ color: "#00E5CC" }}>₹12,300</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 max-w-lg">
              <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "#FF6B6B" }}>
                Joint Accounts
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Shared money,<br />zero confusion
              </h2>
              <p className="text-white/45 text-lg leading-relaxed mb-8">
                Add your partner, roommates, or family. Every transaction is visible, every split is tracked, and who owes what is always crystal clear.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time sync across all members",
                  "Role-based permissions (viewer / editor / admin)",
                  "Instant settle-up calculations",
                  "Shared budget limits per category",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,107,0.2)", color: "#FF6B6B" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT BUDGETS */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "#F5A623" }}>
              Project Budgets
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Keep every project<br />in the black
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-8">
              Companies and teams can create dedicated budgets per project. Track spending, set milestones, and get alerts before you burn through your runway.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Budget Allocation", icon: "🎯" },
                { label: "Burn Rate Tracking", icon: "🔥" },
                { label: "Team Expense Logs", icon: "📋" },
                { label: "Deadline Alerts", icon: "⏰" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl p-4 flex items-center gap-3 border"
                  style={{ background: "rgba(245,166,35,0.06)", borderColor: "rgba(245,166,35,0.15)" }}
                >
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-sm font-medium text-white/70">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="flex-1 max-w-md w-full">
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(245,166,35,0.05)", border: "1px solid rgba(245,166,35,0.15)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-medium text-white/70">Active Projects</p>
                <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(245,166,35,0.15)", color: "#F5A623" }}>Q2 2025</span>
              </div>
              {[
                { name: "Website Redesign", spent: 145000, budget: 200000, team: 4, color: "#00E5CC" },
                { name: "Mobile App v2", spent: 380000, budget: 400000, team: 7, color: "#F5A623" },
                { name: "Marketing Campaign", spent: 62000, budget: 150000, team: 3, color: "#7C6FFF" },
                { name: "Data Migration", spent: 89000, budget: 120000, team: 5, color: "#FF6B6B" },
              ].map((p) => {
                const pct = Math.round((p.spent / p.budget) * 100);
                return (
                  <div key={p.name} className="mb-5 last:mb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-white/30">{p.team} members</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium" style={{ color: pct > 90 ? "#FF6B6B" : "white" }}>
                          {pct}%
                        </p>
                        <p className="text-xs text-white/30">₹{(p.budget / 1000).toFixed(0)}K budget</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: p.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold mb-3">Loved by real people</h2>
            <p className="text-white/40">Not bots. Actual humans who trust Finnr with their money.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="card-hover rounded-2xl p-6 border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="#F5A623" className="w-4 h-4">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-white/30">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <div
          className="relative rounded-3xl p-14 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,229,204,0.1), rgba(124,111,255,0.12), rgba(255,107,107,0.08))", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="hero-glow w-64 h-64 -top-10 left-1/4 opacity-25" style={{ background: "#7C6FFF" }} />
          <div className="hero-glow w-48 h-48 -bottom-10 right-1/4 opacity-20" style={{ background: "#00E5CC" }} />

          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-5">
              Your finances,<br />
              <span className="shimmer-text">finally under control</span>
            </h2>
            <p className="text-white/45 text-lg max-w-lg mx-auto mb-10">
              Join thousands who've taken back control of their money. Free to start, powerful to grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="px-9 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #00E5CC, #7C6FFF)", color: "white" }}
              >
                Create free account →
              </button>
              <button
                className="px-9 py-4 rounded-xl font-medium text-sm border transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
              >
                Schedule a demo
              </button>
            </div>
            <p className="text-xs text-white/25 mt-5">Setup in 2 minutes · No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00E5CC, #7C6FFF)" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
              </svg>
            </div>
            <span className="font-display text-sm font-bold">Finnr</span>
            <span className="text-white/20 text-sm ml-2">© 2025</span>
          </div>

          <div className="flex gap-6 text-xs text-white/30">
            {["Privacy", "Terms", "Support", "Blog"].map((l) => (
              <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}