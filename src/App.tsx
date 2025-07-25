import React, { useEffect, useState } from "react";
import produkte from "./produkte";

type Produkt = {
  artikelnummer: string;
  name: string;
  beschreibung: string;
  preis_netto: number;
  kategorie: string;
};

const App = () => {
  const [ausgewählteProdukte, setAusgewählteProdukte] = useState<Produkt[]>([]);

  const toggleProdukt = (produkt: Produkt) => {
    setAusgewählteProdukte(prev =>
      prev.find(p => p.artikelnummer === produkt.artikelnummer)
        ? prev.filter(p => p.artikelnummer !== produkt.artikelnummer)
        : [...prev, produkt]
    );
  };

  const gesamtpreis = ausgewählteProdukte.reduce((sum, p) => sum + p.preis_netto, 0);
  const gesamtpreisBrutto = gesamtpreis * 1.2;

  const kategorien = [...new Set(produkte.map(p => p.kategorie))];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Produktzuweisung</h1>
      <div className="flex">
        <div className="w-2/3 pr-6">
          <h2 className="text-xl font-semibold mb-4">Zugewiesene Produkte</h2>
          <div className="space-y-2">
            {ausgewählteProdukte.map(p => (
              <div key={p.artikelnummer} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-bold">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.artikelnummer}</div>
                  <div className="text-sm text-gray-600">{p.beschreibung}</div>
                  <div className="text-sm mt-1">{p.preis_netto.toFixed(2)} € netto<br /><span className="text-gray-500 text-xs">{(p.preis_netto * 1.2).toFixed(2)} € inkl. MwSt.</span></div>
                </div>
                <button onClick={() => toggleProdukt(p)} className="text-red-500 text-lg">✕</button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right font-semibold">
            Gesamt: {gesamtpreis.toFixed(2)} € netto / {(gesamtpreisBrutto).toFixed(2)} € inkl. MwSt.
          </div>
        </div>
        <div className="w-1/3 border-l pl-6 h-[70vh] overflow-y-scroll">
          {kategorien.map(kat => (
            <div key={kat} className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{kat}</h3>
              <div className="space-y-2">
                {produkte.filter(p => p.kategorie === kat && !ausgewählteProdukte.find(a => a.artikelnummer === p.artikelnummer)).map(p => (
                  <div key={p.artikelnummer} onClick={() => toggleProdukt(p)} className="p-4 border rounded-lg bg-white hover:bg-blue-50 cursor-pointer">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-sm text-gray-500">{p.artikelnummer}</div>
                    <div className="text-sm mt-1">{p.preis_netto.toFixed(2)} € netto<br /><span className="text-gray-500 text-xs">{(p.preis_netto * 1.2).toFixed(2)} € inkl. MwSt.</span></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
