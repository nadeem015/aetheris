import React from "react";
import { personById } from "../data.js";
import { Avatar, Card, SectionTitle } from "../components/ui.jsx";

const COLUMNS = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];
const NEXT = { todo: "doing", doing: "done", done: "todo" };

export default function Studio({ tasks, moveTask, open }) {
  const total = Object.values(tasks).flat().length;
  return (
    <>
      <Card onClick={() => open("command")} className="card--dark">
        <h3>Workspace command center</h3>
        <p>Roadmap · Experiments · Docs</p>
        <div className="progress progress--light"><span style={{ width: `${(tasks.done.length / total) * 100}%` }} /></div>
        <small>{tasks.done.length} of {total} tasks done</small>
      </Card>

      <SectionTitle>Kanban <small className="muted">tap a task to move it</small></SectionTitle>
      <div className="kanban">
        {COLUMNS.map(([key, label]) => (
          <div key={key} className="kanban__col">
            <h4>{label} <span>{tasks[key].length}</span></h4>
            {tasks[key].map((t) => (
              <button key={t.id} className={`task task--${key}`} onClick={() => moveTask(t.id, key, NEXT[key])}>
                <span>{t.title}</span>
                <span className="task__meta"><Avatar id={t.owner} size={20} /> {personById(t.owner).name.split(" ").slice(-1)}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <Card onClick={() => open("whiteboard")}>
        <h3>Innovation whiteboard</h3>
        <p className="muted">Sticky notes and sketches from the last brainstorm</p>
      </Card>
    </>
  );
}
