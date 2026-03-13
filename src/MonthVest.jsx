import { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

/* ─── FONT LOADER ────────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
  return null;
};

/* ─── DESIGN TOKENS ──────────────────────────────────────── */
const T = {
  bg:      "#05090F",
  surface: "#0B1220",
  card:    "#0F1A2E",
  border:  "#1E3050",
  borderH: "#2A4572",
  blue1:   "#3B82F6",
  blue2:   "#60A5FA",
  blue3:   "#93C5FD",
  indigo:  "#6366F1",
  muted:   "#475569",
  text:    "#E2E8F0",
  textSub: "#94A3B8",
};

/* ─── MOCK DATA ───────────────────────────────────────────── */
const INIT_MEMBERS = [
  { id:1, name:"Mahesh Kumar",  relation:"Self",     age:45, avatar:"MK", color:"#3B82F6" },
  { id:2, name:"Priya Kumar",   relation:"Wife",     age:42, avatar:"PK", color:"#6366F1" },
  { id:3, name:"Ramesh Kumar",  relation:"Father",   age:70, avatar:"RK", color:"#0EA5E9" },
  { id:4, name:"Sneha Kumar",   relation:"Daughter", age:20, avatar:"SK", color:"#38BDF8" },
];

const INIT_INV = [
  {id:1,  memberId:1, type:"Stocks",         amount:200000, currentValue:260000, year:2021},
  {id:2,  memberId:1, type:"Mutual Funds",   amount:150000, currentValue:185000, year:2022},
  {id:3,  memberId:1, type:"Gold",           amount:80000,  currentValue:100000, year:2023},
  {id:4,  memberId:1, type:"Fixed Deposits", amount:100000, currentValue:112000, year:2024},
  {id:5,  memberId:2, type:"Mutual Funds",   amount:120000, currentValue:145000, year:2021},
  {id:6,  memberId:2, type:"Gold",           amount:90000,  currentValue:115000, year:2022},
  {id:7,  memberId:2, type:"Stocks",         amount:60000,  currentValue:72000,  year:2023},
  {id:8,  memberId:2, type:"Fixed Deposits", amount:50000,  currentValue:56000,  year:2024},
  {id:9,  memberId:3, type:"Fixed Deposits", amount:300000, currentValue:345000, year:2021},
  {id:10, memberId:3, type:"Gold",           amount:250000, currentValue:310000, year:2022},
  {id:11, memberId:3, type:"Mutual Funds",   amount:100000, currentValue:120000, year:2023},
  {id:12, memberId:3, type:"Stocks",         amount:50000,  currentValue:58000,  year:2024},
  {id:13, memberId:4, type:"Stocks",         amount:30000,  currentValue:40000,  year:2022},
  {id:14, memberId:4, type:"Mutual Funds",   amount:40000,  currentValue:50000,  year:2023},
  {id:15, memberId:4, type:"Gold",           amount:20000,  currentValue:25000,  year:2024},
];

const PORTFOLIO_GROWTH = [
  {year:"2021", value:980000,  invested:870000},
  {year:"2022", value:1150000, invested:1040000},
  {year:"2023", value:1380000, invested:1220000},
  {year:"2024", value:1648000, invested:1440000},
];

const CAT_PERF = [
  {category:"Stocks",         short:"STK", invested:340000, current:430000},
  {category:"Mutual Funds",   short:"MF",  invested:410000, current:500000},
  {category:"Gold",           short:"GLD", invested:440000, current:550000},
  {category:"Fixed Deposits", short:"FD",  invested:450000, current:513000},
];

const BASE_STOCKS = [
  {symbol:"RELIANCE", name:"Reliance Industries", price:2847.50, change:1.24,  base:2812},
  {symbol:"TCS",      name:"Tata Consultancy",    price:3921.80, change:-0.38, base:3936},
  {symbol:"INFY",     name:"Infosys",             price:1543.20, change:2.11,  base:1511},
  {symbol:"HDFC",     name:"HDFC Bank",           price:1678.90, change:0.73,  base:1666},
  {symbol:"WIPRO",    name:"Wipro Ltd",           price:456.30,  change:-1.02, base:461},
  {symbol:"BAJFIN",   name:"Bajaj Finance",       price:7234.00, change:0.91,  base:7168},
  {symbol:"TATAMOT",  name:"Tata Motors",         price:912.40,  change:3.24,  base:883},
  {symbol:"SBIN",     name:"State Bank India",    price:743.60,  change:-0.55, base:747},
];

const INV_TYPES = ["Stocks","Mutual Funds","Gold","Fixed Deposits"];
const PIE_COLORS = ["#3B82F6","#6366F1","#0EA5E9","#38BDF8"];

/* ─── UTILS ───────────────────────────────────────────────── */
const fmt     = n => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}k`;
const fmtFull = n => "₹" + n.toLocaleString("en-IN");
const retPct  = (a,b) => (((b-a)/a)*100).toFixed(1);

/* ─── BASE UI ────────────────────────────────────────────── */
const Card = ({children, className=""}) => (
  <div style={{background:T.card, border:`1px solid ${T.border}`}} className={`rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({children, sub}) => (
  <div className="mb-5">
    <h2 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-xl font-bold">{children}</h2>
    {sub && <p style={{color:T.textSub}} className="text-xs mt-0.5">{sub}</p>}
  </div>
);

const StatCard = ({label, value, sub, icon, green, red}) => (
  <Card className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span style={{color:T.muted}} className="text-xs font-semibold uppercase tracking-widest">{label}</span>
      <span className="text-xl">{icon}</span>
    </div>
    <div className={`text-2xl font-bold tracking-tight ${green?"text-emerald-400":red?"text-red-400":""}`}
      style={!green&&!red?{color:T.text}:{}}>{value}</div>
    {sub && <div style={{color:T.muted}} className="text-xs">{sub}</div>}
  </Card>
);

const Pill = ({children}) => {
  const map = {
    "Stocks":         "bg-blue-900/50 text-blue-300 border-blue-700/40",
    "Mutual Funds":   "bg-indigo-900/50 text-indigo-300 border-indigo-700/40",
    "Gold":           "bg-amber-900/50 text-amber-300 border-amber-700/40",
    "Fixed Deposits": "bg-sky-900/50 text-sky-300 border-sky-700/40",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[children]||"bg-slate-800 text-slate-300 border-slate-600"}`}>{children}</span>;
};

const Inp = ({label, ...p}) => (
  <div className="flex flex-col gap-1.5">
    {label && <label style={{color:T.textSub}} className="text-xs font-semibold uppercase tracking-wider">{label}</label>}
    <input {...p} style={{background:"#060D1A", border:`1px solid ${T.border}`, color:T.text}}
      className="rounded-xl px-4 py-2.5 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition w-full"/>
  </div>
);

const Sel = ({label, children, ...p}) => (
  <div className="flex flex-col gap-1.5">
    {label && <label style={{color:T.textSub}} className="text-xs font-semibold uppercase tracking-wider">{label}</label>}
    <select {...p} style={{background:"#060D1A", border:`1px solid ${T.border}`, color:T.text}}
      className="rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition w-full">
      {children}
    </select>
  </div>
);

const Btn = ({children, variant="primary", className="", ...p}) => {
  const v = {
    primary: "text-white font-semibold",
    ghost:   "bg-transparent text-blue-300 border border-blue-800/60 hover:bg-blue-900/30",
    danger:  "bg-red-900/30 text-red-400 border border-red-800/50 hover:bg-red-800/40",
    outline: "bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-900/30",
  };
  const style = variant==="primary"
    ? {background:"linear-gradient(135deg,#3B82F6,#6366F1)", boxShadow:"0 4px 20px rgba(59,130,246,0.3)"}
    : {};
  return <button {...p} style={style} className={`px-4 py-2 rounded-xl text-sm transition ${v[variant]} ${className}`}>{children}</button>;
};

const ChartTip = ({active, payload, label}) => {
  if (!active||!payload?.length) return null;
  return (
    <div style={{background:"#060D1A", border:`1px solid ${T.borderH}`}} className="rounded-xl px-4 py-3 shadow-2xl text-sm">
      {label && <div style={{color:T.textSub}} className="mb-1.5 text-xs uppercase tracking-wider font-semibold">{label}</div>}
      {payload.map((p,i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{background:p.color}}/>
          <span style={{color:T.textSub}} className="text-xs">{p.name}:</span>
          <span style={{color:T.text}} className="text-xs font-bold">{fmtFull(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const THead = ({cols}) => (
  <thead>
    <tr style={{borderBottom:`1px solid ${T.border}`}}>
      {cols.map(h => (
        <th key={h} style={{color:T.muted}} className="text-left text-xs font-semibold uppercase tracking-widest px-5 py-4">{h}</th>
      ))}
    </tr>
  </thead>
);

/* ─── LIVE TICKER ─────────────────────────────────────────── */
function StockTickerBar() {
  const [stocks, setStocks] = useState(BASE_STOCKS);
  useEffect(() => {
    const id = setInterval(() => {
      setStocks(prev => prev.map(s => ({
        ...s,
        price:  +(s.price + (Math.random()-0.5)*s.price*0.003).toFixed(2),
        change: +(s.change + (Math.random()-0.5)*0.12).toFixed(2),
      })));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const items = [...stocks, ...stocks];
  return (
    <div style={{background:"#060D1A", borderBottom:`1px solid ${T.border}`}} className="overflow-hidden py-2">
      <div className="ticker-wrap">
        {items.map((s,i) => (
          <div key={i} className="inline-flex items-center gap-2.5 px-5 border-r border-blue-900/30">
            <span style={{color:T.blue2}} className="text-xs font-bold">{s.symbol}</span>
            <span style={{color:T.text}} className="text-xs font-semibold">₹{s.price.toFixed(2)}</span>
            <span className={`text-xs font-semibold ${s.change>=0?"text-emerald-400":"text-red-400"}`}>
              {s.change>=0?"+":""}{s.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .ticker-wrap{display:flex;width:max-content;animation:ticker 35s linear infinite;}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      `}</style>
    </div>
  );
}

/* ─── LANDING PAGE ────────────────────────────────────────── */
function LandingPage({onGetStarted, onLogin}) {
  return (
    <div style={{background:T.bg, fontFamily:"'DM Sans',sans-serif"}} className="min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav style={{borderBottom:`1px solid ${T.border}`, background:"rgba(5,9,15,0.96)"}}
        className="sticky top-0 z-50 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)", minWidth:36, minHeight:36}}
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-xl font-bold">
            Month<span style={{color:T.blue1}}>Vest</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Btn variant="ghost" onClick={onLogin}>Sign In</Btn>
          <Btn variant="primary" onClick={onGetStarted}>Get Started →</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        <div style={{background:"radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.2) 0%,transparent 70%)"}} className="absolute inset-0 pointer-events-none"/>
        <div style={{background:"radial-gradient(circle at 15% 60%,rgba(99,102,241,0.14) 0%,transparent 55%)"}} className="absolute inset-0 pointer-events-none"/>
        <div style={{background:"radial-gradient(circle at 85% 40%,rgba(14,165,233,0.1) 0%,transparent 55%)"}} className="absolute inset-0 pointer-events-none"/>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
            style={{background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.35)"}}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span style={{color:T.blue3}} className="text-xs font-semibold tracking-wide">Trusted by 10,000+ Indian families</span>
          </div>

          <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-5xl md:text-7xl font-extrabold mb-5 leading-[1.1]">
            Invest Together,<br/>
            <span style={{background:"linear-gradient(135deg,#60A5FA,#6366F1,#38BDF8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
              Grow Together
            </span>
          </h1>
          <p style={{color:T.textSub}} className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            MonthVest is India's simplest family investment dashboard. Track stocks, mutual funds, gold and fixed deposits — all in one trusted place.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={onGetStarted}
              style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)", boxShadow:"0 0 50px rgba(59,130,246,0.45)"}}
              className="px-8 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition">
              Get Started — Free
            </button>
            <button onClick={onLogin}
              style={{border:`1px solid ${T.border}`, color:T.textSub}}
              className="px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-600 hover:text-blue-300 transition bg-transparent">
              Sign In →
            </button>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative z-10 mt-14 max-w-4xl mx-auto">
          <div style={{background:"rgba(15,26,46,0.8)", border:`1px solid ${T.border}`, borderRadius:"24px", backdropFilter:"blur(12px)"}}
            className="p-5 shadow-2xl">
            {/* Mock stat row */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[["Total Invested","₹14.4L"],["Portfolio","₹16.5L"],["Returns","+₹2.1L"],["Members","4"]].map(([l,v],i) => (
                <div key={i} style={{background:T.surface, border:`1px solid ${T.border}`}} className="rounded-xl p-3 text-left">
                  <div style={{color:T.muted}} className="text-xs mb-1">{l}</div>
                  <div style={{color:i===2?"#34D399":i===1?T.blue1:T.text}} className="text-base font-bold">{v}</div>
                </div>
              ))}
            </div>
            {/* Mock chart */}
            <div style={{background:T.surface, border:`1px solid ${T.border}`, borderRadius:"12px"}} className="p-4 h-28 flex items-end gap-1">
              {[35,50,42,65,55,78,63,88,74,95,82,100].map((h,i) => (
                <div key={i} style={{flex:1, height:`${h}%`, background:`linear-gradient(180deg,#60A5FA,#6366F1)`, borderRadius:"3px 3px 0 0", opacity:0.6+i*0.03}}/>
              ))}
            </div>
          </div>
          <div style={{background:"radial-gradient(ellipse at 50% 100%,rgba(59,130,246,0.25),transparent 70%)"}} className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"/>
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-4xl font-bold mb-3">
              Built for Indian families
            </h2>
            <p style={{color:T.textSub}} className="text-base">Powerful tools wrapped in a simple, beautiful interface</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {icon:"📊", title:"Unified Portfolio",    desc:"See all investments — stocks, MFs, gold, FDs — for every family member in one crystal-clear view."},
              {icon:"📡", title:"Live Market Data",     desc:"Real-time NSE/BSE stock ticker updates every 2 seconds. Your portfolio pulse, always live."},
              {icon:"👨‍👩‍👧‍👦", title:"Family Profiles",    desc:"Separate tracking per family member with individual dashboards, investment history and returns."},
              {icon:"📈", title:"Growth Analytics",     desc:"Year-over-year portfolio growth charts and category performance breakdowns for smarter decisions."},
              {icon:"🗂", title:"Investment History",   desc:"Record and review every past investment. Understand what worked and plan what comes next."},
              {icon:"🔒", title:"Private & Secure",     desc:"Your financial data stays yours. No ads, no sharing, no compromise. Ever."},
            ].map((f,i) => (
              <div key={i} style={{background:T.card, border:`1px solid ${T.border}`}}
                className="rounded-2xl p-6 hover:border-blue-600/50 hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-lg font-bold mb-2">{f.title}</h3>
                <p style={{color:T.textSub}} className="text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`}} className="py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["₹500Cr+","Assets Tracked"],["10K+","Active Families"],["4","Asset Classes"],["99.9%","Uptime"]].map(([v,l],i) => (
            <div key={i}>
              <div style={{fontFamily:"'Playfair Display',serif", background:"linear-gradient(135deg,#60A5FA,#6366F1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}
                className="text-4xl font-extrabold mb-1">{v}</div>
              <div style={{color:T.textSub}} className="text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center relative overflow-hidden">
        <div style={{background:"radial-gradient(ellipse at 50% 50%,rgba(59,130,246,0.12),transparent 65%)"}} className="absolute inset-0 pointer-events-none"/>
        <h2 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
          Your family's wealth,<br/>beautifully organized
        </h2>
        <p style={{color:T.textSub}} className="mb-8 text-lg relative z-10">Join thousands of families who've simplified how they invest.</p>
        <button onClick={onGetStarted} className="relative z-10"
          style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)", boxShadow:"0 0 60px rgba(59,130,246,0.4)"}}
          className="px-10 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition">
          Create Free Account →
        </button>
      </section>

      <footer style={{borderTop:`1px solid ${T.border}`, color:T.muted}} className="px-6 py-8 text-center text-sm">
        © 2024 <span style={{color:T.blue2, fontFamily:"'Playfair Display',serif"}}>MonthVest</span> · Built with trust for Indian families
      </footer>
    </div>
  );
}

/* ─── AUTH MODAL ─────────────────────────────────────────── */
function AuthModal({mode, onClose, onSuccess}) {
  const [tab, setTab] = useState(mode);
  const [f, setF] = useState({name:"", email:"", password:""});
  const go = () => { if (f.email && f.password) onSuccess(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.75)", backdropFilter:"blur(10px)"}}>
      <div style={{background:T.card, border:`1px solid ${T.borderH}`, maxWidth:420, width:"100%"}} className="rounded-3xl p-8 shadow-2xl relative">
        <button onClick={onClose} style={{color:T.muted}} className="absolute top-5 right-5 text-xl hover:text-white transition">✕</button>
        <div className="flex items-center gap-2.5 mb-7">
          <div style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)"}} className="w-8 h-8 rounded-xl flex items-center justify-center">
            <span className="text-white text-xs font-black">M</span>
          </div>
          <span style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-xl font-bold">
            Month<span style={{color:T.blue1}}>Vest</span>
          </span>
        </div>
        <div style={{background:T.surface, border:`1px solid ${T.border}`}} className="flex rounded-xl p-1 mb-6">
          {["login","register"].map(t => (
            <button key={t} onClick={()=>setTab(t)}
              style={tab===t?{background:T.blue1, color:"white"}:{color:T.textSub}}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition capitalize">
              {t==="login"?"Sign In":"Register"}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {tab==="register" && <Inp label="Full Name" placeholder="Mahesh Kumar" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>}
          <Inp label="Email" type="email" placeholder="you@example.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
          <Inp label="Password" type="password" placeholder="••••••••" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/>
        </div>
        <button onClick={go}
          style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)", boxShadow:"0 8px 30px rgba(59,130,246,0.3)"}}
          className="w-full mt-6 py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition">
          {tab==="login" ? "Sign In to Dashboard →" : "Create My Account →"}
        </button>
        <p style={{color:T.muted}} className="text-center text-xs mt-4">
          {tab==="login" ? "No account? " : "Have an account? "}
          <button onClick={()=>setTab(tab==="login"?"register":"login")} style={{color:T.blue2}} className="underline">
            {tab==="login"?"Register here":"Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── LIVE STOCKS PAGE ───────────────────────────────────── */
function LiveStocksPage({investments, members}) {
  const [stocks, setStocks] = useState(BASE_STOCKS.map(s => ({
    ...s,
    hist: Array.from({length:20},(_,i)=>({t:i, v:s.base+(Math.random()-0.5)*s.base*0.015}))
  })));
  const [search, setSearch] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const np = +(s.price + (Math.random()-0.5)*s.price*0.003).toFixed(2);
        const nc = +(s.change + (Math.random()-0.5)*0.12).toFixed(2);
        return {...s, price:np, change:nc, hist:[...s.hist.slice(-19), {t:s.hist.length, v:np}]};
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const stockInvs = investments.filter(i => i.type==="Stocks");
  const totalInv  = stockInvs.reduce((s,x)=>s+x.amount, 0);
  const totalCur  = stockInvs.reduce((s,x)=>s+x.currentValue, 0);
  const memberName = id => members.find(m=>m.id===id)?.name||"—";
  const filtered = stocks.filter(s => s.symbol.toLowerCase().includes(search.toLowerCase())||s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-3xl font-bold">Live Stock Market</h1>
        <p style={{color:T.textSub}} className="text-sm mt-1">Simulated NSE/BSE feed · refreshes every 2 seconds</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Stock Holdings" value={fmtFull(totalInv)} icon="💹"/>
        <StatCard label="Current Value"  value={fmtFull(totalCur)} icon="📊" green={false}/>
        <StatCard label="Stock P&L" value={`${totalCur>=totalInv?"+":""}${fmtFull(totalCur-totalInv)}`} icon="🎯"
          green={totalCur>=totalInv} red={totalCur<totalInv}
          sub={`${retPct(totalInv,totalCur)}% return`}/>
      </div>
      <Card>
        <Inp placeholder="🔍  Search stocks by name or symbol…" value={search} onChange={e=>setSearch(e.target.value)}/>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(s => (
          <div key={s.symbol}
            style={{background:T.card, border:`1px solid ${s.change>=0?"rgba(52,211,153,0.3)":"rgba(248,113,113,0.3)"}`}}
            className="rounded-2xl p-4 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div style={{color:T.blue2}} className="text-xs font-bold tracking-widest">{s.symbol}</div>
                <div style={{color:T.textSub}} className="text-xs mt-0.5 truncate max-w-[110px]">{s.name}</div>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.change>=0?"bg-emerald-900/50 text-emerald-400":"bg-red-900/50 text-red-400"}`}>
                {s.change>=0?"+":""}{s.change.toFixed(2)}%
              </span>
            </div>
            <div style={{color:T.text}} className="text-xl font-bold mb-3">₹{s.price.toFixed(2)}</div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={s.hist}>
                  <Line type="monotone" dataKey="v" stroke={s.change>=0?"#34D399":"#F87171"} strokeWidth={1.5} dot={false} isAnimationActive={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
      {stockInvs.length>0 && (
        <Card className="p-0">
          <div className="px-5 pt-5 pb-2"><SectionTitle sub="Your family's equity holdings">My Stock Investments</SectionTitle></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <THead cols={["Member","Invested","Current Value","P&L","Return","Year"]}/>
              <tbody>
                {stockInvs.map((inv) => {
                  const pl = inv.currentValue - inv.amount;
                  return (
                    <tr key={inv.id} style={{borderBottom:`1px solid rgba(30,48,80,0.5)`}} className="hover:bg-blue-900/10 transition">
                      <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{memberName(inv.memberId)}</td>
                      <td className="px-5 py-3.5" style={{color:T.textSub}}>{fmtFull(inv.amount)}</td>
                      <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{fmtFull(inv.currentValue)}</td>
                      <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{pl>=0?"+":""}{fmtFull(pl)}</td>
                      <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{retPct(inv.amount,inv.currentValue)}%</td>
                      <td className="px-5 py-3.5" style={{color:T.muted}}>{inv.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────── */
function Dashboard({members, investments}) {
  const totalInv = investments.reduce((s,i)=>s+i.amount, 0);
  const totalCur = investments.reduce((s,i)=>s+i.currentValue, 0);
  const netPL    = totalCur - totalInv;

  const pieData = INV_TYPES.map(t => ({
    name:t, value:investments.filter(i=>i.type===t).reduce((s,x)=>s+x.amount, 0)
  }));

  const memberBar = members.map(m => ({
    name: m.name.split(" ")[0],
    invested: investments.filter(i=>i.memberId===m.id).reduce((s,x)=>s+x.amount, 0),
    current:  investments.filter(i=>i.memberId===m.id).reduce((s,x)=>s+x.currentValue, 0),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-3xl font-bold">Overview</h1>
        <p style={{color:T.textSub}} className="text-sm mt-1">Your family portfolio at a glance</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Invested"  value={fmt(totalInv)} icon="💰"/>
        <StatCard label="Portfolio Value" value={fmt(totalCur)} icon="📈"/>
        <StatCard label="Net Profit/Loss" value={`${netPL>=0?"+":""}${fmt(netPL)}`} icon={netPL>=0?"🟢":"🔴"}
          green={netPL>=0} red={netPL<0} sub={`${retPct(totalInv,totalCur)}% return`}/>
        <StatCard label="Family Members"  value={members.length} icon="👨‍👩‍👧" sub="Active investors"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle sub="By asset class">Investment Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} innerRadius={55} paddingAngle={3}>
                {pieData.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip content={<ChartTip/>}/>
              <Legend formatter={v=><span style={{color:T.textSub, fontSize:"11px"}}>{v}</span>}/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionTitle sub="2021 – 2024">Portfolio Growth</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={PORTFOLIO_GROWTH}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
              <XAxis dataKey="year" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={fmt} tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTip/>}/>
              <Legend formatter={v=><span style={{color:T.textSub,fontSize:"11px"}}>{v}</span>}/>
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#pg)" strokeWidth={2.5} dot={{r:4,fill:"#3B82F6"}} name="Portfolio Value"/>
              <Line type="monotone" dataKey="invested" stroke="#6366F1" strokeWidth={2} strokeDasharray="6 4" dot={{r:3,fill:"#6366F1"}} name="Invested"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <SectionTitle sub="Invested vs current value per member">Member-wise Comparison</SectionTitle>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={memberBar} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
            <XAxis dataKey="name" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
            <YAxis tickFormatter={fmt} tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTip/>}/>
            <Legend formatter={v=><span style={{color:T.textSub,fontSize:"11px"}}>{v}</span>}/>
            <Bar dataKey="invested" fill="#1D4ED8" radius={[4,4,0,0]} name="Invested"/>
            <Bar dataKey="current"  fill="#3B82F6" radius={[4,4,0,0]} name="Current Value"/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ─── FAMILY MEMBERS ─────────────────────────────────────── */
function FamilyMembers({members, setMembers, investments}) {
  const [form, setForm] = useState({name:"", relation:"", age:""});
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const memberInvs = id => investments.filter(i=>i.memberId===id);
  const memberTot  = id => memberInvs(id).reduce((s,x)=>s+x.amount, 0);
  const memberCur  = id => memberInvs(id).reduce((s,x)=>s+x.currentValue, 0);

  const save = () => {
    if (!form.name||!form.relation||!form.age) return;
    const COLORS = ["#3B82F6","#6366F1","#0EA5E9","#38BDF8","#818CF8"];
    if (editId) {
      setMembers(m=>m.map(x=>x.id===editId?{...x,...form,age:+form.age}:x));
      setEditId(null);
    } else {
      const av = form.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
      setMembers(m=>[...m,{id:Date.now(),...form,age:+form.age,avatar:av,color:COLORS[m.length%COLORS.length]}]);
    }
    setForm({name:"",relation:"",age:""});
    setShowForm(false);
  };

  const selMember = selected ? members.find(m=>m.id===selected) : null;
  const selInvs   = selected ? memberInvs(selected) : [];
  const byType    = INV_TYPES.map(t=>({type:t, invs:selInvs.filter(i=>i.type===t)})).filter(x=>x.invs.length>0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-3xl font-bold">Family Members</h1>
          <p style={{color:T.textSub}} className="text-sm mt-1">{members.length} investors — click a card to drill down</p>
        </div>
        <Btn variant="primary" onClick={()=>{setShowForm(true);setEditId(null);setForm({name:"",relation:"",age:""});}}>
          + Add Member
        </Btn>
      </div>

      {showForm && (
        <Card>
          <SectionTitle>{editId?"Edit Member":"Add New Member"}</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Inp label="Full Name"  placeholder="e.g. Priya Kumar" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <Inp label="Relation"   placeholder="Wife, Father…"    value={form.relation} onChange={e=>setForm({...form,relation:e.target.value})}/>
            <Inp label="Age" type="number" placeholder="Age"        value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/>
          </div>
          <div className="flex gap-3">
            <Btn variant="primary" onClick={save}>{editId?"Update":"Add Member"}</Btn>
            <Btn variant="ghost" onClick={()=>setShowForm(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      {/* Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map(m => {
          const tot = memberTot(m.id);
          const cur = memberCur(m.id);
          const pl  = cur - tot;
          const isS = selected===m.id;
          return (
            <div key={m.id} onClick={()=>setSelected(isS?null:m.id)}
              style={{background:T.card, border:`1px solid ${isS?T.blue1:T.border}`, cursor:"pointer"}}
              className={`rounded-2xl p-5 hover:border-blue-600/60 transition-all ${isS?"ring-1 ring-blue-500/40 shadow-lg shadow-blue-900/20":""}`}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div style={{background:m.color, width:44, height:44}} className="rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {m.avatar}
                </div>
                <div className="min-w-0">
                  <div style={{color:T.text}} className="font-semibold text-sm truncate">{m.name}</div>
                  <div style={{color:T.textSub}} className="text-xs">{m.relation} · Age {m.age}</div>
                </div>
              </div>
              {/* Metrics */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span style={{color:T.muted}}>Invested</span>
                  <span style={{color:T.textSub}} className="font-semibold">{fmtFull(tot)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{color:T.muted}}>Current Value</span>
                  <span style={{color:T.blue2}} className="font-bold">{fmtFull(cur)}</span>
                </div>
                {/* Progress bar */}
                <div style={{background:T.border, height:4, borderRadius:99}}>
                  <div style={{background:`linear-gradient(90deg,#3B82F6,#6366F1)`, width:`${Math.min((cur/Math.max(tot,1))*90,100)}%`, height:"100%", borderRadius:99}}/>
                </div>
                <div className={`text-xs font-bold text-right ${pl>=0?"text-emerald-400":"text-red-400"}`}>
                  {pl>=0?"+":""}{fmtFull(pl)} · {retPct(tot,cur)}%
                </div>
              </div>
              {/* Asset mini pills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {INV_TYPES.map(t => {
                  const has = investments.some(i=>i.memberId===m.id && i.type===t);
                  if (!has) return null;
                  const short = {Stocks:"STK","Mutual Funds":"MF",Gold:"GLD","Fixed Deposits":"FD"}[t];
                  return <span key={t} style={{background:"rgba(59,130,246,0.15)", color:T.blue3, fontSize:10}} className="px-2 py-0.5 rounded-full font-semibold border border-blue-800/40">{short}</span>;
                })}
              </div>
              <div className="flex gap-2">
                <button onClick={e=>{e.stopPropagation();setForm({name:m.name,relation:m.relation,age:m.age});setEditId(m.id);setShowForm(true);}}
                  style={{border:`1px solid ${T.border}`, color:T.textSub, flex:1}} className="py-1.5 rounded-lg text-xs hover:border-blue-500 hover:text-blue-300 transition">Edit</button>
                <button onClick={e=>{e.stopPropagation();setMembers(ms=>ms.filter(x=>x.id!==m.id));if(selected===m.id)setSelected(null);}}
                  style={{border:"1px solid rgba(239,68,68,0.3)", color:"#F87171", flex:1}} className="py-1.5 rounded-lg text-xs hover:bg-red-900/20 transition">Remove</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drill-down */}
      {selMember && (
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div style={{background:selMember.color, width:52, height:52}} className="rounded-full flex items-center justify-center text-white font-bold text-base">
              {selMember.avatar}
            </div>
            <div>
              <h3 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-2xl font-bold">{selMember.name}</h3>
              <p style={{color:T.textSub}} className="text-sm">{selMember.relation} · {selInvs.length} investments · Age {selMember.age}</p>
            </div>
          </div>

          {/* Category breakdown cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {byType.map(({type, invs}) => {
              const a = invs.reduce((s,x)=>s+x.amount,0);
              const c = invs.reduce((s,x)=>s+x.currentValue,0);
              const pl = c-a;
              return (
                <div key={type} style={{background:T.surface, border:`1px solid ${T.border}`}} className="rounded-xl p-4">
                  <div className="mb-2"><Pill>{type}</Pill></div>
                  <div style={{color:T.text}} className="text-lg font-bold mt-2">{fmtFull(c)}</div>
                  <div style={{color:T.muted}} className="text-xs">Invested: {fmtFull(a)}</div>
                  <div className={`text-xs font-bold mt-1 ${pl>=0?"text-emerald-400":"text-red-400"}`}>
                    {pl>=0?"+":""}{fmtFull(pl)} ({retPct(a,c)}%)
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <THead cols={["Type","Year","Invested","Current Value","Profit / Loss","Return %"]}/>
              <tbody>
                {selInvs.map(inv => {
                  const pl = inv.currentValue - inv.amount;
                  return (
                    <tr key={inv.id} style={{borderBottom:`1px solid rgba(30,48,80,0.5)`}} className="hover:bg-blue-900/10 transition">
                      <td className="px-5 py-3.5"><Pill>{inv.type}</Pill></td>
                      <td className="px-5 py-3.5" style={{color:T.muted}}>{inv.year}</td>
                      <td className="px-5 py-3.5" style={{color:T.textSub}}>{fmtFull(inv.amount)}</td>
                      <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{fmtFull(inv.currentValue)}</td>
                      <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{pl>=0?"+":""}{fmtFull(pl)}</td>
                      <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{retPct(inv.amount,inv.currentValue)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ─── INVESTMENTS ────────────────────────────────────────── */
function Investments({members, investments, setInvestments}) {
  const [fM,setFM]=useState("all"), [fT,setFT]=useState("all"), [fY,setFY]=useState("all");
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:"",type:"Stocks",amount:"",currentValue:"",year:new Date().getFullYear()});
  const years=[...new Set(investments.map(i=>i.year))].sort();
  const mn = id => members.find(m=>m.id===id)?.name||"—";
  const filtered = investments.filter(i=>(fM==="all"||i.memberId===+fM)&&(fT==="all"||i.type===fT)&&(fY==="all"||i.year===+fY));
  const tI = filtered.reduce((s,i)=>s+i.amount,0);
  const tC = filtered.reduce((s,i)=>s+i.currentValue,0);

  const add = () => {
    if(!form.memberId||!form.amount||!form.currentValue)return;
    setInvestments(p=>[...p,{id:Date.now(),...form,memberId:+form.memberId,amount:+form.amount,currentValue:+form.currentValue,year:+form.year}]);
    setForm({memberId:"",type:"Stocks",amount:"",currentValue:"",year:new Date().getFullYear()});
    setShow(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-3xl font-bold">Investments</h1>
          <p style={{color:T.textSub}} className="text-sm mt-1">{filtered.length} records</p>
        </div>
        <Btn variant="primary" onClick={()=>setShow(!show)}>+ Add Investment</Btn>
      </div>
      {show && (
        <Card>
          <SectionTitle>Add New Investment</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <Sel label="Family Member" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}>
              <option value="">Select member</option>
              {members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </Sel>
            <Sel label="Investment Type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {INV_TYPES.map(t=><option key={t}>{t}</option>)}
            </Sel>
            <Inp label="Year" type="number" value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/>
            <Inp label="Amount Invested (₹)" type="number" placeholder="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
            <Inp label="Current Value (₹)" type="number" placeholder="0" value={form.currentValue} onChange={e=>setForm({...form,currentValue:e.target.value})}/>
          </div>
          <div className="flex gap-3"><Btn variant="primary" onClick={add}>Add</Btn><Btn variant="ghost" onClick={()=>setShow(false)}>Cancel</Btn></div>
        </Card>
      )}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Filtered Invested" value={fmt(tI)} icon="💼"/>
        <StatCard label="Filtered Current"  value={fmt(tC)} icon="📊"/>
        <StatCard label="Filtered P&L" value={`${tC-tI>=0?"+":""}${fmt(tC-tI)}`} icon="🎯" green={tC>=tI} red={tC<tI}/>
      </div>
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Sel label="Member" value={fM} onChange={e=>setFM(e.target.value)}>
            <option value="all">All Members</option>
            {members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
          </Sel>
          <Sel label="Type" value={fT} onChange={e=>setFT(e.target.value)}>
            <option value="all">All Types</option>
            {INV_TYPES.map(t=><option key={t}>{t}</option>)}
          </Sel>
          <Sel label="Year" value={fY} onChange={e=>setFY(e.target.value)}>
            <option value="all">All Years</option>
            {years.map(y=><option key={y}>{y}</option>)}
          </Sel>
        </div>
      </Card>
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <THead cols={["Member","Type","Invested","Current Value","Profit/Loss","Return","Year"]}/>
            <tbody>
              {filtered.map(inv => {
                const pl=inv.currentValue-inv.amount;
                return (
                  <tr key={inv.id} style={{borderBottom:`1px solid rgba(30,48,80,0.5)`}} className="hover:bg-blue-900/10 transition">
                    <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{mn(inv.memberId)}</td>
                    <td className="px-5 py-3.5"><Pill>{inv.type}</Pill></td>
                    <td className="px-5 py-3.5" style={{color:T.textSub}}>{fmtFull(inv.amount)}</td>
                    <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{fmtFull(inv.currentValue)}</td>
                    <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{pl>=0?"+":""}{fmtFull(pl)}</td>
                    <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{retPct(inv.amount,inv.currentValue)}%</td>
                    <td className="px-5 py-3.5" style={{color:T.muted}}>{inv.year}</td>
                  </tr>
                );
              })}
              {!filtered.length && <tr><td colSpan={7} style={{color:T.muted}} className="text-center py-12 text-sm">No records match filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ─── PORTFOLIO PERFORMANCE ──────────────────────────────── */
function Performance({investments}) {
  const tI=investments.reduce((s,i)=>s+i.amount,0);
  const tC=investments.reduce((s,i)=>s+i.currentValue,0);
  const pl=tC-tI;
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-3xl font-bold">Portfolio Performance</h1>
        <p style={{color:T.textSub}} className="text-sm mt-1">Yearly analysis & category breakdown</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Invested"  value={fmtFull(tI)} icon="💼"/>
        <StatCard label="Current Value"   value={fmtFull(tC)} icon="📊"/>
        <StatCard label="Net P&L" value={`${pl>=0?"+":""}${fmtFull(pl)}`} icon="🎯" green={pl>=0} red={pl<0} sub={`${retPct(tI,tC)}% overall`}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle sub="2021 – 2024">Yearly P&L Trend</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={PORTFOLIO_GROWTH}>
              <defs>
                <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
              <XAxis dataKey="year" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={fmt} tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTip/>}/>
              <Legend formatter={v=><span style={{color:T.textSub,fontSize:"11px"}}>{v}</span>}/>
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#ag2)" strokeWidth={2.5} dot={{r:5,fill:"#3B82F6"}} name="Portfolio Value"/>
              <Line type="monotone" dataKey="invested" stroke="#6366F1" strokeWidth={2} strokeDasharray="6 4" dot={{r:4,fill:"#6366F1"}} name="Invested"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionTitle sub="By asset class">Category Performance</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={CAT_PERF} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
              <XAxis dataKey="short" tick={{fill:T.muted,fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tickFormatter={fmt} tick={{fill:T.muted,fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTip/>}/>
              <Legend formatter={v=><span style={{color:T.textSub,fontSize:"11px"}}>{v}</span>}/>
              <Bar dataKey="invested" fill="#1D4ED8" radius={[4,4,0,0]} name="Invested"/>
              <Bar dataKey="current"  fill="#3B82F6" radius={[4,4,0,0]} name="Current Value"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="p-0">
        <div className="px-5 pt-5 pb-2"><SectionTitle sub="Return by category">Category Breakdown</SectionTitle></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <THead cols={["Category","Invested","Current Value","Profit/Loss","Return %"]}/>
            <tbody>
              {CAT_PERF.map(c => {
                const p=c.current-c.invested, r=retPct(c.invested,c.current);
                return (
                  <tr key={c.category} style={{borderBottom:`1px solid rgba(30,48,80,0.5)`}} className="hover:bg-blue-900/10 transition">
                    <td className="px-5 py-3.5"><Pill>{c.category}</Pill></td>
                    <td className="px-5 py-3.5" style={{color:T.textSub}}>{fmtFull(c.invested)}</td>
                    <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{fmtFull(c.current)}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-400">+{fmtFull(p)}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-400">+{r}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ─── HISTORY ────────────────────────────────────────────── */
function History({members, investments, setInvestments}) {
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({memberId:"",type:"Stocks",amount:"",currentValue:"",year:2021});
  const mn = id => members.find(m=>m.id===id)?.name||"—";
  const add = () => {
    if(!form.memberId||!form.amount||!form.currentValue)return;
    setInvestments(p=>[...p,{id:Date.now(),...form,memberId:+form.memberId,amount:+form.amount,currentValue:+form.currentValue,year:+form.year}]);
    setForm({memberId:"",type:"Stocks",amount:"",currentValue:"",year:2021});
    setShow(false);
  };
  const sorted=[...investments].sort((a,b)=>b.year-a.year);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-3xl font-bold">Investment History</h1>
          <p style={{color:T.textSub}} className="text-sm mt-1">All past and current records</p>
        </div>
        <Btn variant="primary" onClick={()=>setShow(!show)}>+ Add Record</Btn>
      </div>
      {show && (
        <Card>
          <SectionTitle>Add Past Investment</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <Sel label="Member" value={form.memberId} onChange={e=>setForm({...form,memberId:e.target.value})}>
              <option value="">Select member</option>
              {members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </Sel>
            <Sel label="Type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {INV_TYPES.map(t=><option key={t}>{t}</option>)}
            </Sel>
            <Inp label="Year" type="number" value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/>
            <Inp label="Amount Invested (₹)" type="number" placeholder="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
            <Inp label="Current Value (₹)" type="number" placeholder="0" value={form.currentValue} onChange={e=>setForm({...form,currentValue:e.target.value})}/>
          </div>
          <div className="flex gap-3"><Btn variant="primary" onClick={add}>Save</Btn><Btn variant="ghost" onClick={()=>setShow(false)}>Cancel</Btn></div>
        </Card>
      )}
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <THead cols={["Year","Member","Type","Invested","Current Value","P&L","Return"]}/>
            <tbody>
              {sorted.map(inv => {
                const pl=inv.currentValue-inv.amount;
                return (
                  <tr key={inv.id} style={{borderBottom:`1px solid rgba(30,48,80,0.5)`}} className="hover:bg-blue-900/10 transition">
                    <td className="px-5 py-3.5">
                      <span style={{background:"rgba(59,130,246,0.15)", color:T.blue2, border:"1px solid rgba(59,130,246,0.3)"}} className="px-2.5 py-1 rounded-lg text-xs font-bold">{inv.year}</span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{mn(inv.memberId)}</td>
                    <td className="px-5 py-3.5"><Pill>{inv.type}</Pill></td>
                    <td className="px-5 py-3.5" style={{color:T.textSub}}>{fmtFull(inv.amount)}</td>
                    <td className="px-5 py-3.5 font-semibold" style={{color:T.text}}>{fmtFull(inv.currentValue)}</td>
                    <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{pl>=0?"+":""}{fmtFull(pl)}</td>
                    <td className={`px-5 py-3.5 font-bold ${pl>=0?"text-emerald-400":"text-red-400"}`}>{retPct(inv.amount,inv.currentValue)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ─── SIDEBAR ────────────────────────────────────────────── */
const NAV = [
  {id:"dashboard",   label:"Overview",        icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>},
  {id:"family",      label:"Family Members",  icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
  {id:"investments", label:"Investments",     icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>},
  {id:"stocks",      label:"Live Stocks",     icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>, live:true},
  {id:"performance", label:"Performance",     icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>},
  {id:"history",     label:"History",         icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>},
];

function Sidebar({active, setActive, collapsed, setCollapsed, onLogout}) {
  return (
    <aside style={{background:T.bg, borderRight:`1px solid ${T.border}`}}
      className={`flex flex-col h-screen sticky top-0 transition-all duration-300 flex-shrink-0 ${collapsed?"w-16":"w-60"}`}>
      <div style={{borderBottom:`1px solid ${T.border}`}} className="flex items-center gap-3 px-4 py-5">
        <div style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)", minWidth:32, minHeight:32}}
          className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {!collapsed && <span style={{fontFamily:"'Playfair Display',serif", color:T.text}} className="text-lg font-bold">Month<span style={{color:T.blue1}}>Vest</span></span>}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const isA = active===item.id;
          return (
            <button key={item.id} onClick={()=>setActive(item.id)}
              style={isA?{background:"rgba(59,130,246,0.15)", color:T.blue2, border:"1px solid rgba(59,130,246,0.3)"}:{color:T.muted, border:"1px solid transparent"}}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition hover:text-blue-300 hover:bg-blue-900/20 ${collapsed?"justify-center":""}`}>
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {!collapsed && item.live && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>}
            </button>
          );
        })}
      </nav>
      <div style={{borderTop:`1px solid ${T.border}`}} className="p-2 space-y-1">
        {!collapsed && (
          <button onClick={onLogout} style={{color:T.muted}} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:text-red-400 hover:bg-red-900/15 transition">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Sign Out</span>
          </button>
        )}
        <button onClick={()=>setCollapsed(!collapsed)}
          style={{color:T.muted, border:`1px solid ${T.border}`}}
          className="w-full p-2.5 rounded-xl text-xs hover:text-blue-300 hover:border-blue-700 transition flex items-center justify-center gap-1">
          {collapsed ? "→" : <><span>←</span><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}

/* ─── TOPBAR ─────────────────────────────────────────────── */
function Topbar({page, investments}) {
  const tC=investments.reduce((s,i)=>s+i.currentValue,0);
  const tI=investments.reduce((s,i)=>s+i.amount,0);
  const r=retPct(tI,tC);
  const title=NAV.find(n=>n.id===page)?.label||"Overview";
  const now=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
  return (
    <header style={{background:"rgba(5,9,15,0.92)", borderBottom:`1px solid ${T.border}`}}
      className="sticky top-0 z-10 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
      <div>
        <h2 style={{color:T.text}} className="text-sm font-bold">{title}</h2>
        <p style={{color:T.muted}} className="text-xs">{now}</p>
      </div>
      <div className="flex items-center gap-4">
        <div style={{background:T.card, border:`1px solid ${T.border}`}} className="hidden sm:flex items-center gap-3 rounded-xl px-4 py-2">
          <div>
            <div style={{color:T.muted}} className="text-xs">Portfolio</div>
            <div style={{color:T.text}} className="text-sm font-bold">{fmt(tC)}</div>
          </div>
          <div style={{width:1, background:T.border}} className="h-8"/>
          <div>
            <div style={{color:T.muted}} className="text-xs">Returns</div>
            <div className="text-sm font-bold text-emerald-400">+{r}%</div>
          </div>
        </div>
        <div style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)"}} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-900/40">
          MK
        </div>
      </div>
    </header>
  );
}

/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  const [screen,    setScreen]    = useState("landing");
  const [authMode,  setAuthMode]  = useState("login");
  const [page,      setPage]      = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [members,   setMembers]   = useState(INIT_MEMBERS);
  const [investments,setInvestments]=useState(INIT_INV);

  const renderPage = () => {
    switch(page) {
      case "dashboard":   return <Dashboard    members={members} investments={investments}/>;
      case "family":      return <FamilyMembers members={members} setMembers={setMembers} investments={investments}/>;
      case "investments": return <Investments  members={members} investments={investments} setInvestments={setInvestments}/>;
      case "stocks":      return <LiveStocksPage investments={investments} members={members}/>;
      case "performance": return <Performance  investments={investments}/>;
      case "history":     return <History      members={members} investments={investments} setInvestments={setInvestments}/>;
      default: return null;
    }
  };

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif"}}>
      <FontLoader/>
      {screen==="landing" && (
        <LandingPage
          onGetStarted={()=>{setAuthMode("register"); setScreen("auth");}}
          onLogin={()=>{setAuthMode("login"); setScreen("auth");}}
        />
      )}
      {screen==="auth" && (
        <>
          <LandingPage onGetStarted={()=>setAuthMode("register")} onLogin={()=>setAuthMode("login")}/>
          <AuthModal mode={authMode} onClose={()=>setScreen("landing")} onSuccess={()=>setScreen("app")}/>
        </>
      )}
      {screen==="app" && (
        <div style={{background:T.bg}} className="flex min-h-screen">
          <Sidebar active={page} setActive={setPage} collapsed={collapsed} setCollapsed={setCollapsed} onLogout={()=>setScreen("landing")}/>
          <div className="flex-1 flex flex-col min-w-0">
            <StockTickerBar/>
            <Topbar page={page} investments={investments}/>
            <main className="flex-1 p-6 overflow-y-auto">{renderPage()}</main>
          </div>
        </div>
      )}
    </div>
  );
}
