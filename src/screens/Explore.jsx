import React, { useState } from "react";
import { grants, papers, people } from "../data.js";
import { Avatar, Card, Pill, SectionTitle } from "../components/ui.jsx";

export default function Explore({ open }) {
  const [q, setQ] = useState("");
  const match = (s) => s.toLowerCase().includes(q.trim().toLowerCase());
  const foundPeople = people.filter((p) => match(p.name + p.role + p.tags.join(" ")));
  const foundPapers = papers.filter((p) => match(p.title + p.authors + p.venue));

  return (
    <>
      <input className="search" placeholder="Search researchers, papers, topics…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />

      <SectionTitle>Discover researchers</SectionTitle>
      <div className="h-scroll">
        {foundPeople.map((p) => (
          <Card key={p.id} onClick={() => open("profile", p)} className="mini-card">
            <Avatar id={p.id} size={48} />
            <strong>{p.name}</strong>
            <small className="muted">{p.role}</small>
          </Card>
        ))}
        {foundPeople.length === 0 && <p className="muted">No researchers match “{q}”.</p>}
      </div>

      <SectionTitle>Trending papers</SectionTitle>
      {foundPapers.map((p) => (
        <Card key={p.id} onClick={() => open("paper", p)}>
          <Pill tone="blue">{p.venue}</Pill>
          <h3>{p.title}</h3>
          <small className="muted">{p.authors}</small>
        </Card>
      ))}

      <SectionTitle>Grant radar</SectionTitle>
      {grants.map((g) => (
        <Card key={g.id} onClick={() => open("grant", g)}>
          <div className="row-between">
            <h3>{g.name}</h3>
            <Pill tone={g.match === "High" ? "green" : "amber"}>{g.match} match</Pill>
          </div>
          <p className="muted">{g.amount} · closes {g.deadline}</p>
        </Card>
      ))}
    </>
  );
}
