import React, { useState } from "react";
import AddApplicativo from "./components/AddApplicativo";
import ApplicativiList from "./components/ApplicativiList";

export default function App() {
  const [applicativi, setApplicativi] = useState([]);

  const handleAdd = (nuovo) => {
    setApplicativi((prev) => [nuovo, ...prev]);
  };

  const handleUpdate = (aggiornato) => {
    setApplicativi((prev) =>
      prev.map((item) => (item.id === aggiornato.id ? aggiornato : item))
    );
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Guida Interattiva</h1>
        <p>Gestisci i tuoi applicativi (Esercizio / Collaudo)</p>
      </header>

      <main className="app-main">
        <section className="left">
          <AddApplicativo onAdd={handleAdd} />
        </section>
        <section className="right">
          <ApplicativiList items={applicativi} onUpdate={handleUpdate} />
        </section>
      </main>

      <footer className="app-footer">
        <small>© 2025 Guida Interattiva — React + Vite</small>
      </footer>
    </div>
  );
}
