
import React, { useState } from "react";
import produkte from "./produkte";

type Produkt = {
  Artikelnummer: number;
  Beschreibung: string;
  "VK-Preis": number;
  "Preis Brutto": number;
  Warengruppe: string;
  Farbe: string;
};

export default function ProduktverwaltungApp() {
  const [ausgewählte, setAusgewählte] = useState<Produkt[]>([]);

  const toggleProdukt = (artikelnummer: number) => {
    const bereitsAusgewählt = ausgewählte.find(p => p.Artikelnummer === artikelnummer);
    if (bereitsAusgewählt) {
      setAusgewählte(ausgewählte.filter(p => p.Artikelnummer !== artikelnummer));
    } else {
      const produkt = produkte.find(p => p.Artikelnummer === artikelnummer);
      if (produkt) setAusgewählte([...ausgewählte, produkt]);
    }
  };

  const istAusgewählt = (artikelnummer: number) =>
    ausgewählte.some(p => p.Artikelnummer === artikelnummer);

  const summe = ausgewählte.reduce((acc, p) => acc + (p["VK-Preis"] || 0), 0).toFixed(2);

  return (
    <div className="flex h-screen">
      <aside className="w-1/3 overflow-y-auto p-4 bg-gray-50 border-r">
        {produkte.map(p => (
          !istAusgewählt(p.Artikelnummer) && (
            <div
              key={p.Artikelnummer}
              className="mb-2 cursor-pointer rounded-xl p-3 shadow hover:shadow-md"
              style={{ backgroundColor: p.Farbe }}
              onClick={() => toggleProdukt(p.Artikelnummer)}
            >
              <div className="text-sm text-gray-600">{p.Artikelnummer}</div>
              <div className="font-semibold">{p.Beschreibung}</div>
              <div className="text-sm">{p["VK-Preis"].toFixed(2)} €</div>
              <div className="text-xs text-gray-500">{p["Preis Brutto"].toFixed(2)} € inkl. MwSt.</div>
            </div>
          )
        ))}
      </aside>

      <main className="flex-1 p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Zugewiesene Produkte</h1>
        <div className="flex flex-wrap gap-4">
          {ausgewählte.map(p => (
            <div
              key={p.Artikelnummer}
              className="border rounded-xl p-4 shadow relative"
              style={{ backgroundColor: p.Farbe }}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                onClick={() => toggleProdukt(p.Artikelnummer)}
              >
                ✕
              </button>
              <div className="text-sm text-gray-600">{p.Artikelnummer}</div>
              <div className="font-semibold">{p.Beschreibung}</div>
              <div className="text-sm">{p["VK-Preis"].toFixed(2)} €</div>
              <div className="text-xs text-gray-500">{p["Preis Brutto"].toFixed(2)} € inkl. MwSt.</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-xl font-semibold">
          Monatliche Summe: {summe} €
        </div>
      </main>
    </div>
  );
}
