import React, { useEffect, useState } from 'react';
import { Camera, Infocircled, Info, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import TrendChart from './TrendChart';
import { exportSnapshot } from '../utils/exportSnapshot';
import { rollingAverage } from '../utils/rollingAverage';
import WorldBankClient from '../utils/WorldBankClient';

export default function CountryDetailEnhanced({ country, series }: any) {
  const [wbData, setWbData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (country?.iso2) {
      setLoading(true);
      WorldBankClient.getCountrySummary(country.iso2).then(data => {
        setWbData(data);
        setLoading(false);
      });
    }
  }, [country?.iso2]);

  const rolling = rollingAverage(series.map((s: any) => Number(s.median_price_usd || 0)), 4);
  const avg = series.length ? series.reduce((a: any, b: any) => a + Number(b.median_price_usd || 0), 0) / series.length : null;
  const confidence = series.length ? (series[0].confidence_score || null) : null;
  const submissions_count = series.length ? series.reduce((a: any, b: any) => (a + (b.sample_count || 0)), 0) : 0;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col h-full animate-fade-in country-detail-container">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{country?.name || 'Country'}</h3>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">{country?.iso2}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-white/5 rounded text-[10px] text-zinc-400 font-medium cursor-help uppercase tracking-wider" title="World Bank CPI updates monthly. PricePulse updates in real time.">
          <Info size={12} /> Real-time vs Official
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">PricePulse Avg</span>
          <div className="text-2xl font-bold text-white tracking-tight">${avg ? avg.toFixed(2) : 'N/A'}</div>
          <p className="text-[10px] text-zinc-500 mt-1">{submissions_count} submissions</p>
        </div>

        {wbData?.inflation && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Annual Inflation (WB)</span>
            <div className="text-2xl font-bold text-white tracking-tight">{wbData.inflation.value.toFixed(1)}%</div>
            <p className="text-[10px] text-zinc-500 mt-1">Reported: {wbData.inflation.date}</p>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-[250px] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Price Trend Analysis</h4>
          <span className="text-[10px] text-zinc-600 font-mono">Conf: {confidence ? (confidence * 100).toFixed(0) + '%' : 'N/A'}</span>
        </div>
        <div className="h-[200px] w-full relative">
          <TrendChart
            data={series}
            wbData={wbData?.history?.cpi?.slice().reverse()}
            labelP="PricePulse"
            labelW="Official CPI"
          />
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={async () => {
            const blob = await exportSnapshot(document.querySelector('.country-detail-container') as HTMLElement);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `${country?.iso2 || 'country'}_snapshot.png`;
            a.click();
          }}
          className="flex-1 bg-white text-zinc-950 font-bold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5 active:scale-[0.98] transition-transform"
        >
          <Camera size={16} />
          Export Snapshot
        </button>
      </div>
    </div>
  );
}
