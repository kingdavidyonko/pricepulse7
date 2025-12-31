import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

function colorForInflation(pct: number | null) {
  if (pct === null || pct === undefined) return '#71717a'; // zinc-500
  if (pct > 5) return '#f43f5e'; // rose-500
  if (pct > 2) return '#f59e0b'; // amber-500
  if (pct > 0) return '#10b981'; // emerald-500
  return '#10b981';
}

export default function MapView({ aggregates, onCountrySelect }: any) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {aggregates && aggregates.map((a: any, idx: number) => (
        <CircleMarker
          key={`${a.iso2}-${idx}`}
          center={[a.lat || 0, a.lng || 0]}
          radius={8}
          pathOptions={{
            color: colorForInflation(a.inflation_pct_vs_prev_week),
            fillColor: colorForInflation(a.inflation_pct_vs_prev_week),
            fillOpacity: 0.5,
            weight: 2
          }}
          eventHandlers={{
            click: () => onCountrySelect && onCountrySelect(a)
          }}
        >
          <Popup className="custom-popup">
            <div className="p-3 bg-zinc-950 text-white min-w-[150px] rounded-lg">
              <h4 className="font-bold text-sm mb-1">{a.country_name}</h4>
              <div className="text-xs text-zinc-400 mb-3">
                Inflation: <span className="font-bold font-mono" style={{ color: colorForInflation(a.inflation_pct_vs_prev_week) }}>
                  {a.inflation_pct_vs_prev_week ? (a.inflation_pct_vs_prev_week > 0 ? '+' : '') + a.inflation_pct_vs_prev_week.toFixed(2) + '%' : 'N/A'}
                </span>
              </div>
              <button
                onClick={() => onCountrySelect && onCountrySelect(a)}
                className="w-full bg-white text-zinc-950 text-[10px] font-bold py-1.5 rounded uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                Focus Region
              </button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
