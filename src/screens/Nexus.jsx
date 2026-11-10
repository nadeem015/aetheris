import React, { useState } from "react";
import { people } from "../data.js";
import { Avatar, Card, Pill, SectionTitle } from "../components/ui.jsx";

export default function Nexus({ open, notify }) {
  const [deck, setDeck] = useState(people);
  const [connected, setConnected] = useState([]);
  const current = deck[0];

  const decide = (accept) => {
    if (accept) {
      setConnected((c) => [...c, current.id]);
      notify(`Connection request sent to ${current.name}`);
    }
    setDeck((d) => d.slice(1));
  };

  // Simple radial collaboration graph: "you" in the centre.
  const cx = 160, cy = 120, r = 88;
  return (
    <>
      <Card className="card--dark graph-card">
        <h3>Nexus graph</h3>
        <svg viewBox="0 0 320 240" className="graph" role="img" aria-label="Collaboration graph">
          {people.map((p, i) => {
            const a = (i / people.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
            const isOn = connected.includes(p.id);
            return (
              <g key={p.id} onClick={() => open("profile", p)} className="graph__node">
                <line x1={cx} y1={cy} x2={x} y2={y} stroke={isOn ? p.color : "#6b7280"} strokeWidth={isOn ? 3 : 1.5} strokeDasharray={isOn ? "0" : "4 4"} />
                <circle cx={x} cy={y} r={20} fill={p.color} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="#fff">{p.fit}%</text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={26} fill="#fff" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">You</text>
        </svg>
        <small>Tap a node for the profile · solid lines = connected</small>
      </Card>

      <SectionTitle>AI matchmaking</SectionTitle>
      {current ? (
        <Card className="match">
          <div className="match__top">
            <Avatar id={current.id} size={64} />
            <Pill tone="green">{current.fit}% fit</Pill>
          </div>
          <h3>{current.name}</h3>
          <p className="muted">{current.role} · {current.org}</p>
          <p>{current.bio}</p>
          <div className="tags">{current.tags.map((t) => <Pill key={t}>{t}</Pill>)}</div>
          <div className="match__actions">
            <button className="btn btn--ghost" onClick={() => decide(false)}>Skip</button>
            <button className="btn" onClick={() => decide(true)}>Connect</button>
          </div>
        </Card>
      ) : (
        <Card>
          <h3>You're all caught up 🎉</h3>
          <p className="muted">{connected.length} new connection{connected.length === 1 ? "" : "s"} today.</p>
          <button className="btn" onClick={() => { setDeck(people); setConnected([]); }}>Start over</button>
        </Card>
      )}
    </>
  );
}
