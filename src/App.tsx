import { useState } from "react";

const produkte = [
  {
    artikelnummer: "101",
    name: "Microsoft 365 Business Standard",
    beschreibung: "Cloudlösung mit Office-Paket",
    preis: 10.5,
    kategorie: "3 - Cloud Services",
    farbe: "#DCFCE7",
  },
  {
    artikelnummer: "202",
    name: "xVoIP Benutzerlizenz",
    beschreibung: "VoIP-Telefonielösung",
    preis: 5.99,
    kategorie: "2 - Managed Services",
    farbe: "#DBEAFE",
  },
  {
    artikelnummer: "301",
    name: "Supportvertrag BASIS",
    beschreibung: "E-Mail & Telefonsupport",
    preis: 50.0,
    kategorie: "5 - Support-Verträge",
    farbe: "#FFEDD5",
  },
  {
    artikelnummer: "401",
    name: "Domain .at",
    beschreibung: "Jahresgebühr für .at Domain",
    preis: 14.99,
    kategorie: "7 - Domains",
    farbe: "#FCE7F3",
  },
];

export default function ProduktverwaltungApp() {
  const [zugewiesen, setZugewiesen] = useState<string[]>([]);

  const toggleProdukt = (nummer: string) => {
    setZugewiesen((prev) =>
      prev.includes(nummer)
        ? prev.filter((n) => n !== nummer)
        : [...prev, nummer]
    );
  };

  const ausgewählteProdukte = produkte.filter((p) => zugewiesen.includes(p.artikelnummer));
  const verfügbareProdukte = produkte.filter((p) => !zugewiesen.includes(p.artikelnummer));

  const summe = ausgewählteProdukte.reduce((sum, p) => sum + p.preis, 0);

  return (
    <div className="grid grid-cols-3 gap-4 p-6 font-sans">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Zugewiesene Produkte</h1>
        <div className="space-y-4">
          {ausgewählteProdukte.map((produkt) => (
            <div
              key={produkt.artikelnummer}
              className="flex justify-between items-center border rounded-2xl p-4 shadow bg-white"
            >
              <div>
                <h2 className="font-semibold">{produkt.name}</h2>
                <p className="text-sm text-gray-500">{produkt.beschreibung}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{produkt.preis.toFixed(2)} €</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => toggleProdukt(produkt.artikelnummer)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-lg font-semibold">
          Monatliche Gesamtsumme: {summe.toFixed(2)} €
        </div>
      </div>

      <div className="col-span-1">
        <h2 className="text-xl font-bold mb-2">Produkte</h2>
        <div className="overflow-y-auto max-h-[70vh] space-y-3">
          {verfügbareProdukte.map((produkt) => (
            <div
              key={produkt.artikelnummer}
              className="cursor-pointer border rounded-2xl p-4 shadow hover:shadow-md transition"
              style={{ backgroundColor: produkt.farbe }}
              onClick={() => toggleProdukt(produkt.artikelnummer)}
            >
              <div className="text-sm text-gray-700 font-medium">
                {produkt.name}
              </div>
              <div className="text-xs text-gray-500">#{produkt.artikelnummer}</div>
              <div className="text-sm font-semibold mt-1">{produkt.preis.toFixed(2)} €</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
