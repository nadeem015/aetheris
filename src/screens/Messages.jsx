import React, { useState } from "react";
import { personById, rooms } from "../data.js";
import { Avatar, Card, SectionTitle } from "../components/ui.jsx";

export function ChatThread({ thread, onSend }) {
  const [text, setText] = useState("");
  const send = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(thread.id, text.trim());
      setText("");
    }
  };
  return (
    <div className="chat">
      <div className="chat__list">
        {thread.messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from === "me" ? "bubble--me" : ""}`}>{m.text}</div>
        ))}
      </div>
      <form className="chat__form" onSubmit={send}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message…" aria-label="Message" />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}

export default function Messages({ threads, open }) {
  return (
    <>
      <SectionTitle>Direct messages</SectionTitle>
      {threads.map((t) => {
        const p = personById(t.id);
        return (
          <Card key={t.id} onClick={() => open("thread", t.id)}>
            <div className="author">
              <Avatar id={t.id} />
              <div className="grow">
                <strong>{p.name}</strong>
                <small className="muted ellipsis">{t.messages[t.messages.length - 1].text}</small>
              </div>
              {t.unread > 0 && <span className="badge">{t.unread}</span>}
            </div>
          </Card>
        );
      })}

      <SectionTitle>Lab rooms</SectionTitle>
      {rooms.map((r) => (
        <Card key={r.id} onClick={() => open("room", r)}>
          <h3>{r.name}</h3>
          <p className="muted">{r.members} members · {r.docs.length} shared docs</p>
        </Card>
      ))}
    </>
  );
}
