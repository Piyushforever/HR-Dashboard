import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Sankey
} from "recharts";
import {
  Users, Activity, TrendingUp, TrendingDown, ShieldCheck,
  AlertTriangle, DollarSign, Gauge, Building2, Lock, ChevronDown
} from "lucide-react";

const BLUE = "#0054A6";
const BLUE_DARK = "#002F5F";
const GREEN = "#1E9E6A";
const AMBER = "#FF7A00";
const RED = "#D64545";
const INK = "#12233B";
const MUTE = "#6B7A8D";
const LINE = "#E2E9F2";
const BG = "#F2F6FB";

const deptHealth = [
  { name: "Operations", score: 82 },
  { name: "Technology", score: 76 },
  { name: "Sales", score: 74 },
  { name: "Finance", score: 70 },
  { name: "HR", score: 68 },
  { name: "Admin", score: 65 },
];

const monthlyTrend = [
  { m: "Jan", score: 71, participation: 42 },
  { m: "Feb", score: 73, participation: 48 },
  { m: "Mar", score: 74, participation: 55 },
  { m: "Apr", score: 76, participation: 61 },
  { m: "May", score: 77, participation: 66 },
  { m: "Jun", score: 78, participation: 68 },
];

const burnout = [
  { m: "Jan", index: 42 },
  { m: "Feb", index: 44 },
  { m: "Mar", index: 47 },
  { m: "Apr", index: 45 },
  { m: "May", index: 43 },
  { m: "Jun", index: 41 },
];

const riskBands = [
  { name: "Low risk", value: 58, color: GREEN },
  { name: "Moderate", value: 30, color: AMBER },
  { name: "High risk", value: 12, color: RED },
];

const conditions = [
  { name: "Prediabetes", detected: 18, undetected: 9 },
  { name: "Hypertension", detected: 14, undetected: 11 },
  { name: "Obesity", detected: 22, undetected: 6 },
  { name: "Anxiety", detected: 8, undetected: 15 },
  { name: "High cholesterol", detected: 12, undetected: 8 },
];

const heatmap = [
  ["Operations", 82, 68, 41],
  ["Technology", 76, 72, 47],
  ["Sales", 74, 59, 52],
  ["Finance", 70, 64, 44],
  ["HR", 68, 71, 38],
  ["Admin", 65, 55, 49],
];

function Stat({ icon: Icon, label, value, delta, up, good }) {
  const deltaColor = good === undefined ? BLUE : good ? GREEN : RED;
  return (
    <div style={{ background: "#fff", border: "1px solid " + LINE, borderRadius: 14, padding: 18, flex: 1, minWidth: 180 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "#EAF2FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} color={BLUE} />
        </div>
        <span style={{ fontSize: 13, color: MUTE }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: INK }}>{value}</span>
        {delta && (
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 13, fontWeight: 700, color: deltaColor }}>
            {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{delta}
          </span>
        )}
      </div>
    </div>
  );
}

function Panel({ title, children, note, style }) {
  return (
    <div style={{ background: "#fff", border: "1px solid " + LINE, borderRadius: 14, padding: 18, ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{title}</span>
        {note && <span style={{ fontSize: 11, color: MUTE, display: "flex", alignItems: "center", gap: 4 }}><Lock size={11} />{note}</span>}
      </div>
      {children}
    </div>
  );
}

function heatColor(v, type) {
  if (type === "burnout") {
    if (v >= 47) return "#F7D9D9";
    if (v >= 43) return "#FBEBD3";
    return "#D9F0E4";
  }
  if (v >= 75) return "#D9F0E4";
  if (v >= 68) return "#FBEBD3";
  return "#F7D9D9";
}

export default function App() {
  const [period, setPeriod] = useState("This quarter");
  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid " + LINE, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="Bajaj Health" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>Bajaj Finserv Health</div>
            <div style={{ fontSize: 12, color: MUTE }}>HR wellness dashboard</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid " + LINE, borderRadius: 9, padding: "8px 12px", fontSize: 13, color: INK }}>
            <Building2 size={14} color={MUTE} /> All departments
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid " + LINE, borderRadius: 9, padding: "8px 12px", fontSize: 13, color: INK }}>
            {period} <ChevronDown size={14} color={MUTE} />
          </div>
        </div>
      </div>

      <div style={{ padding: 24, maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
          <Stat icon={Gauge} label="Corporate health score" value="78%" delta="8 pts" up good />
          <Stat icon={Users} label="Participation rate" value="68%" delta="12%" up good />
          <Stat icon={Activity} label="Engagement score" value="74%" delta="9 pts" up good />
          <Stat icon={ShieldCheck} label="Predicted claims risk" value="Low" delta="15%" up={false} good />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Department health score" note="Aggregated, min 25 employees">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={deptHealth} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={LINE} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#F0F5FB" }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {deptHealth.map((d, i) => <Cell key={i} fill={d.score >= 75 ? GREEN : d.score >= 68 ? BLUE : AMBER} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Risk distribution" note="Anonymized">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={riskBands} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {riskBands.map((r, i) => <Cell key={i} fill={r.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
              {riskBands.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: r.color }} />
                  <span style={{ color: MUTE, flex: 1 }}>{r.name}</span>
                  <span style={{ fontWeight: 700, color: INK }}>{r.value}%</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Health score and participation trend">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={LINE} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke={BLUE} strokeWidth={2.5} dot={{ r: 3 }} name="Health score" />
                <Line type="monotone" dataKey="participation" stroke={GREEN} strokeWidth={2.5} dot={{ r: 3 }} name="Participation %" />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Department burnout index" note="Aggregated, min 100 employees">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={burnout} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="bo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={AMBER} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={AMBER} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={LINE} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <YAxis domain={[30, 60]} tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="index" stroke={AMBER} strokeWidth={2.5} fill="url(#bo)" />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Chronic condition prevalence" note="% of workforce">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={conditions} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={LINE} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: MUTE }} axisLine={false} tickLine={false} width={100} />
                <Tooltip />
                <Bar dataKey="detected" stackId="a" fill={BLUE} name="Detected" radius={[0, 0, 0, 0]} />
                <Bar dataKey="undetected" stackId="a" fill={AMBER} name="Estimated undetected" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: BLUE }} />Detected</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: AMBER }} />Estimated undetected</span>
            </div>
          </Panel>

          <Panel title="Department heatmap" note="Health · Participation · Burnout">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 4, fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", color: MUTE, fontWeight: 600, padding: "4px 8px" }}>Department</th>
                    <th style={{ color: MUTE, fontWeight: 600, padding: "4px 8px" }}>Health</th>
                    <th style={{ color: MUTE, fontWeight: 600, padding: "4px 8px" }}>Participation</th>
                    <th style={{ color: MUTE, fontWeight: 600, padding: "4px 8px" }}>Burnout</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmap.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: "8px", fontWeight: 600, color: INK }}>{row[0]}</td>
                      <td style={{ padding: "8px", textAlign: "center", background: heatColor(row[1], "health"), borderRadius: 6, fontWeight: 700, color: INK }}>{row[1]}</td>
                      <td style={{ padding: "8px", textAlign: "center", background: heatColor(row[2], "health"), borderRadius: 6, fontWeight: 700, color: INK }}>{row[2]}%</td>
                      <td style={{ padding: "8px", textAlign: "center", background: heatColor(row[3], "burnout"), borderRadius: 6, fontWeight: 700, color: INK }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <Panel title="Wellness ROI statement" style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              ["Program spend", "24 lakh", MUTE],
              ["Modelled claims saved", "12.6 lakh", GREEN],
              ["Absenteeism value", "38 lakh", GREEN],
              ["Attrition value", "52 lakh", GREEN],
            ].map((c, i) => (
              <div key={i} style={{ padding: 14, background: BG, borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: MUTE }}>{c[0]}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: c[2] }}>{c[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 14, background: "#E9F8F0", border: "1px solid #BEEAD4", borderRadius: 10, fontSize: 13, color: "#12694A", lineHeight: 1.5 }}>
            Individual employee data is never shown on this dashboard. All figures are aggregated with a minimum cohort of 25 employees, and 100 for anything related to mental health. Financial figures are modelled estimates for illustration.
          </div>
        </Panel>
      </div>
    </div>
  );
}
