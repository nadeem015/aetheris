import React from "react";
import { featured, personById, posts, stories } from "../data.js";
import { Avatar, Card, Pill, SectionTitle } from "../components/ui.jsx";

export default function Home({ open, liked, toggleLike, saved, toggleSave }) {
  return (
    <>
      <div className="stories" role="list">
        <button className="story" onClick={() => open("compose")}>
          <span className="story__ring story__ring--add">＋</span>
          <small>Add</small>
        </button>
        {stories.map((s) => (
          <button key={s.id} className="story" onClick={() => open("story", s)} role="listitem">
            <span className="story__ring" style={{ background: `linear-gradient(45deg, ${s.color}, #ec4899)` }}>{s.label[0]}</span>
            <small>{s.label}</small>
          </button>
        ))}
      </div>

      <Card onClick={() => open("compose")} className="card--hero">
        <h3>Create Studio ＋</h3>
        <p>Share an insight · Publish a project · Start a discussion</p>
      </Card>

      <SectionTitle>Featured innovation</SectionTitle>
      <Card onClick={() => open("project", featured)}>
        <div className="row-between">
          <div>
            <h3>{featured.title}</h3>
            <p className="muted">{featured.tagline}</p>
          </div>
          <Pill tone="green">Live pilot</Pill>
        </div>
        <div className="progress"><span style={{ width: `${featured.progress}%` }} /></div>
        <div className="row-between">
          <div className="avatars">{featured.team.map((id) => <Avatar key={id} id={id} size={28} />)}</div>
          <small className="muted">{featured.progress}% of milestones</small>
        </div>
      </Card>

      <SectionTitle>Research feed</SectionTitle>
      {posts.map((post) => {
        const author = personById(post.author);
        const isLiked = liked.has(post.id);
        return (
          <Card key={post.id}>
            <div className="author">
              <Avatar id={post.author} />
              <div>
                <strong>{author.name}</strong>
                <small className="muted">{author.role} · {post.time}</small>
              </div>
            </div>
            <button className="link-block" onClick={() => open("post", post)}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </button>
            <div className="actions">
              <button className={`chip ${isLiked ? "chip--on" : ""}`} onClick={() => toggleLike(post.id)} aria-pressed={isLiked}>
                {isLiked ? "♥" : "♡"} {post.likes + (isLiked ? 1 : 0)}
              </button>
              <button className="chip" onClick={() => open("post", post)}>💬 {post.comments.length}</button>
              <button className="chip" onClick={() => open("post", post)}>📎 {post.citations} citations</button>
              <button className={`chip ${saved.has(post.id) ? "chip--on" : ""}`} onClick={() => toggleSave(post.id)}>
                {saved.has(post.id) ? "★ Saved" : "☆ Save"}
              </button>
            </div>
          </Card>
        );
      })}
    </>
  );
}
