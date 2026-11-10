import React, { useEffect } from "react";
import { personById } from "../data.js";

export function Avatar({ id, size = 40 }) {
  const p = personById(id);
  const initials = p ? p.name.replace("Dr. ", "").replace("Prof. ", "").split(" ").map((w) => w[0]).slice(0, 2).join("") : "Me";
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: p ? p.color : "#111827" }} aria-hidden="true">
      {initials}
    </span>
  );
}

export function Card({ children, onClick, className = "", ...rest }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag className={`card ${onClick ? "card--tap" : ""} ${className}`} onClick={onClick} {...rest}>
      {children}
    </Tag>
  );
}

export function Pill({ children, tone = "violet" }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}

export function SectionTitle({ children, action }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {action}
    </div>
  );
}

export function Sheet({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" />
        <div className="sheet__head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="sheet__body">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ message }) {
  return <div className={`toast ${message ? "toast--show" : ""}`} role="status">{message}</div>;
}
