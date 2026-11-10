import React, { useCallback, useState } from "react";
import { copilotTips, initialTasks, personById, threads as initialThreads } from "./data.js";
import { Avatar, Pill, Sheet, Toast } from "./components/ui.jsx";
import Home from "./screens/Home.jsx";
import Explore from "./screens/Explore.jsx";
import Studio from "./screens/Studio.jsx";
import Nexus from "./screens/Nexus.jsx";
import Messages, { ChatThread } from "./screens/Messages.jsx";

const TABS = [
  { id: "Home", icon: "⌂" },
  { id: "Explore", icon: "⌕" },
  { id: "Studio", icon: "▦" },
  { id: "Nexus", icon: "✺" },
  { id: "Messages", icon: "✉" },
];

export default function App() {
  const [tab, setTab] = useState("Home");
  const [sheet, setSheet] = useState(null);           // { type, data }
  const [liked, setLiked] = useState(new Set());
  const [saved, setSaved] = useState(new Set());
  const [tasks, setTasks] = useState(initialTasks);
  const [threads, setThreads] = useState(initialThreads);
  const [draft, setDraft] = useState({ kind: "Insight", text: "" });
  const [toast, setToast] = useState("");

  const notify = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(notify.t);
    notify.t = window.setTimeout(() => setToast(""), 2400);
  }, []);
  const open = (type, data) => setSheet({ type, data });
  const close = useCallback(() => setSheet(null), []);
  const toggle = (setter) => (id) => setter((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const moveTask = (id, from, to) => {
    setTasks((t) => {
      const task = t[from].find((x) => x.id === id);
      return { ...t, [from]: t[from].filter((x) => x.id !== id), [to]: [...t[to], task] };
    });
    notify(to === "done" ? "Task completed ✓" : "Task moved");
  };

  const sendMessage = (id, text) =>
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, unread: 0, messages: [...t.messages, { from: "me", text }] } : t)));

  const openThread = (id) => {
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, unread: 0 } : t)));
    open("thread", id);
  };

  const unread = threads.reduce((n, t) => n + t.unread, 0);
  const screenProps = { open: (type, data) => (type === "thread" ? openThread(data) : open(type, data)), notify };

  return (
    <div className="app">
      <main className="screen">
        <header className="topbar">
          <div>
            <h1>Aetheris</h1>
            <p className="muted">Where research meets collaboration</p>
          </div>
          <button className="profile-btn" onClick={() => open("me")} aria-label="Your profile"><Avatar id="me" size={40} /></button>
        </header>

        {tab === "Home" && <Home {...screenProps} liked={liked} toggleLike={toggle(setLiked)} saved={saved} toggleSave={toggle(setSaved)} />}
        {tab === "Explore" && <Explore {...screenProps} />}
        {tab === "Studio" && <Studio {...screenProps} tasks={tasks} moveTask={moveTask} />}
        {tab === "Nexus" && <Nexus {...screenProps} />}
        {tab === "Messages" && <Messages {...screenProps} threads={threads} />}
      </main>

      <button className="fab" onClick={() => open("copilot")} aria-label="Open Aether AI copilot">AI</button>

      <nav className="tabbar" aria-label="Main">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? "tab--on" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
            <span className="tab__icon">{t.icon}</span>
            <span className="tab__label">{t.id}</span>
            {t.id === "Messages" && unread > 0 && <span className="tab__dot">{unread}</span>}
          </button>
        ))}
      </nav>

      {sheet && (
        <SheetContent sheet={sheet} close={close} notify={notify} threads={threads} sendMessage={sendMessage}
          draft={draft} setDraft={setDraft} open={open} />
      )}
      <Toast message={toast} />
      <p className="disclaimer">Prototype with fictional data</p>
    </div>
  );
}

function SheetContent({ sheet, close, notify, threads, sendMessage, draft, setDraft, open }) {
  const { type, data } = sheet;
  const done = (msg) => { close(); notify(msg); };

  switch (type) {
    case "compose":
      return (
        <Sheet title="Create Studio" onClose={close}>
          <div className="segmented">
            {["Insight", "Project", "Discussion"].map((k) => (
              <button key={k} className={draft.kind === k ? "on" : ""} onClick={() => setDraft({ ...draft, kind: k })}>{k}</button>
            ))}
          </div>
          <textarea rows={5} placeholder={`Share your ${draft.kind.toLowerCase()}…`} value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })} aria-label="Post text" />
          <button className="btn btn--full" disabled={!draft.text.trim()}
            onClick={() => { setDraft({ kind: draft.kind, text: "" }); done(`${draft.kind} published (prototype)`); }}>
            Publish {draft.kind.toLowerCase()}
          </button>
        </Sheet>
      );
    case "story":
      return (
        <Sheet title={data.label} onClose={close}>
          <div className="story-view" style={{ background: `linear-gradient(160deg, ${data.color}, #111827)` }}>
            <p>Today in {data.label}: three new preprints, one open dataset and a call for reviewers.</p>
          </div>
        </Sheet>
      );
    case "project":
      return (
        <Sheet title={data.title} onClose={close}>
          <p>{data.tagline}</p>
          <h4>Milestones</h4>
          <ul className="checklist">
            {data.milestones.map((m) => <li key={m.label} className={m.done ? "done" : ""}>{m.done ? "✓" : "○"} {m.label}</li>)}
          </ul>
          <h4>Collaborators</h4>
          <div className="people-list">
            {data.team.map((id) => (
              <button key={id} className="person" onClick={() => open("profile", personById(id))}>
                <Avatar id={id} size={32} /> {personById(id).name}
              </button>
            ))}
          </div>
          <h4>Outcomes</h4>
          <ul>{data.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
          <button className="btn btn--full" onClick={() => done("Request to join sent")}>Request to join</button>
        </Sheet>
      );
    case "post":
      return (
        <Sheet title={data.title} onClose={close}>
          <p>{data.body}</p>
          <h4>{data.comments.length} comments</h4>
          {data.comments.map((c, i) => (
            <div key={i} className="comment"><Avatar id={c.author} size={28} /><div><strong>{personById(c.author).name}</strong><p>{c.text}</p></div></div>
          ))}
          <p className="muted">📎 Cited by {data.citations} papers</p>
        </Sheet>
      );
    case "profile":
      return (
        <Sheet title={data.name} onClose={close}>
          <div className="profile-head"><Avatar id={data.id} size={64} /><div><strong>{data.role}</strong><p className="muted">{data.org}</p><Pill tone="green">{data.fit}% collaboration fit</Pill></div></div>
          <p>{data.bio}</p>
          <div className="tags">{data.tags.map((t) => <Pill key={t}>{t}</Pill>)}</div>
          <button className="btn btn--full" onClick={() => done(`Connection request sent to ${data.name}`)}>Connect</button>
        </Sheet>
      );
    case "paper":
      return (
        <Sheet title={data.title} onClose={close}>
          <Pill tone="blue">{data.venue}</Pill>
          <p className="muted">{data.authors}</p>
          <h4>Abstract</h4>
          <p>{data.abstract}</p>
          <button className="btn btn--full" onClick={() => done("Saved to your library")}>Save to library</button>
        </Sheet>
      );
    case "grant":
      return (
        <Sheet title={data.name} onClose={close}>
          <p><strong>{data.amount}</strong> · closes {data.deadline}</p>
          <p>{data.detail}</p>
          <button className="btn btn--full" onClick={() => done("Grant draft created in Studio")}>Start application</button>
        </Sheet>
      );
    case "command":
      return (
        <Sheet title="Workspace command center" onClose={close}>
          <div className="stat-grid">
            <div><b>3</b><small>active experiments</small></div>
            <div><b>12</b><small>docs</small></div>
            <div><b>Q1</b><small>next milestone</small></div>
            <div><b>6</b><small>members</small></div>
          </div>
          <h4>Roadmap</h4>
          <ul className="checklist"><li className="done">✓ Data collection</li><li className="done">✓ Model v1</li><li>○ City pilot</li><li>○ Paper submission</li></ul>
        </Sheet>
      );
    case "whiteboard":
      return (
        <Sheet title="Innovation whiteboard" onClose={close}>
          <div className="whiteboard">
            {["Gamify bin sorting?", "Partner with schools", "Open API for cities", "Edge model on bins", "Deposit + app combo"].map((n, i) => (
              <div key={n} className="sticky" style={{ transform: `rotate(${(i % 3) - 1}deg)` }}>{n}</div>
            ))}
          </div>
        </Sheet>
      );
    case "thread": {
      const t = threads.find((x) => x.id === data);
      return (
        <Sheet title={personById(t.id).name} onClose={close}>
          <ChatThread thread={t} onSend={sendMessage} />
        </Sheet>
      );
    }
    case "room":
      return (
        <Sheet title={data.name} onClose={close}>
          <p className="muted">{data.members} members</p>
          <h4>Shared documents</h4>
          {data.docs.map((d) => <button key={d} className="doc" onClick={() => notify(`Opening “${d}” (prototype)`)}>📄 {d}</button>)}
        </Sheet>
      );
    case "copilot":
      return (
        <Sheet title="Aether AI copilot" onClose={close}>
          {copilotTips.map((t) => <div key={t.text} className="tip"><span>{t.icon}</span><p>{t.text}</p></div>)}
          <p className="muted small">Suggestions in this prototype are scripted examples.</p>
        </Sheet>
      );
    case "me":
      return (
        <Sheet title="Your profile" onClose={close}>
          <div className="profile-head"><Avatar id="me" size={64} /><div><strong>Researcher</strong><p className="muted">Waste2Worth · ML</p></div></div>
          <p className="muted">Profile editing is not part of this prototype.</p>
        </Sheet>
      );
    default:
      return null;
  }
}
