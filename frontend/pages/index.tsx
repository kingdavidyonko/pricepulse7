import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Activity,
  ArrowRight,
  PlayCircle,
  LayoutDashboard,
  Globe,
  Wheat,
  Factory,
  FileText,
  TrendingUp,
  Search,
  Bell,
  ChevronRight,
  Menu,
  Droplet,
  Milk,
  Egg,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Maximize2
} from 'lucide-react';
import ApiClient from '../src/ApiClient';
import ProductSelector from '../src/components/ProductSelector';
import CountryDetailEnhanced from '../src/components/CountryDetailEnhanced';

const MapView = dynamic(() => import('../src/components/MapView'), { ssr: false });

export default function Home() {
  const [page, setPage] = useState<'landing' | 'dashboard'>('landing');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState('commodities');

  // Dashboard Specific State
  const [aggregates, setAggregates] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState('rice');
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    ApiClient.getLatestAggregates().then(data => {
      if (!data || data.length === 0) {
        setAggregates([
          { country_name: 'Nigeria', iso2: 'NG', lat: 9.082, lng: 8.675, inflation_pct_vs_prev_week: 12.5 },
          { country_name: 'Brazil', iso2: 'BR', lat: -14.235, lng: -51.925, inflation_pct_vs_prev_week: 4.2 },
          { country_name: 'United Kingdom', iso2: 'GB', lat: 55.378, lng: -3.436, inflation_pct_vs_prev_week: 2.1 }
        ]);
      } else {
        setAggregates(data);
      }
    });
  }, []);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    // Fetch series for this country/product - Mock for demo
    setSeries([
      { week_start: '2023-10-01', median_price_usd: 1.2, sample_count: 45, confidence_score: 0.85 },
      { week_start: '2023-10-08', median_price_usd: 1.25, sample_count: 50, confidence_score: 0.88 },
      { week_start: '2023-10-15', median_price_usd: 1.32, sample_count: 42, confidence_score: 0.82 },
      { week_start: '2023-10-22', median_price_usd: 1.35, sample_count: 55, confidence_score: 0.91 }
    ]);
  };

  const togglePage = (p: 'landing' | 'dashboard') => {
    setLoading(true);
    setTimeout(() => {
      setPage(p);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">
      <Head>
        <title>PricePulse | Global Commodities</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Initial Loading State */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="loader"></div>
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Fetching Market Data</span>
          </div>
        </div>
      )}

      {/* LANDING PAGE */}
      {page === 'landing' && (
        <div className="min-h-screen relative grid-bg flex flex-col animate-fade-in">
          {/* Header */}
          <header className="fixed top-0 w-full z-40 glass-panel">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <Activity size={16} color="black" strokeWidth={2} />
                </div>
                <span className="text-lg font-semibold text-white tracking-tight">PricePulse</span>
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <a href="#" className="hover:text-white transition-colors">Global Maps</a>
                <a href="#" className="hover:text-white transition-colors">Food Security</a>
                <a href="#" className="hover:text-white transition-colors">API</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Log in</button>
                <button onClick={() => togglePage('dashboard')} className="bg-white text-black text-sm font-medium px-4 py-2 rounded shadow-lg shadow-white/10 hover:bg-zinc-200 transition-colors tracking-tight flex items-center gap-2 font-semibold">
                  View Prices
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </header>

          {/* Hero */}
          <main className="flex-grow flex items-center justify-center pt-24 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-8 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Commodity Feed
              </div>
              <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-[1.1] mb-6">
                Global food prices <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">tracked in real-time.</span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                Monitor the pulse of essential commodities. From rice paddies in Asia to wheat fields in Europe, get decision-grade data on the world's food supply.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => togglePage('dashboard')} className="w-full sm:w-auto h-12 px-8 rounded bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                  Explore Dashboard
                </button>
                <button className="w-full sm:w-auto h-12 px-8 rounded border border-zinc-800 bg-zinc-900/50 text-zinc-300 font-medium hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
                  <PlayCircle size={18} />
                  Market Report
                </button>
              </div>

              {/* Abstract Chart Graphic (Static representation for landing) */}
              <div className="mt-20 glass-panel rounded-t-xl border-b-0 p-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-20"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800/50 rounded-lg overflow-hidden">
                  <div className="bg-zinc-900 p-6 flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 font-mono">Rice (Global Avg)</span>
                    <div className="text-2xl text-white font-medium tracking-tight">$17.40 <span className="text-sm text-zinc-500">cwt</span></div>
                  </div>
                  <div className="bg-zinc-900 p-6 flex flex-col gap-2 border-l border-white/5">
                    <span className="text-xs text-zinc-500 font-mono">Wheat (Bread)</span>
                    <div className="text-2xl text-white font-medium tracking-tight">$598.2 <span className="text-sm text-zinc-500">bu</span></div>
                  </div>
                  <div className="bg-zinc-900 p-6 flex flex-col gap-2 border-l border-white/5">
                    <span className="text-xs text-zinc-500 font-mono">Milk Solids</span>
                    <div className="text-2xl text-white font-medium tracking-tight">$16.80 <span className="text-sm text-zinc-500">cwt</span></div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Marquee Footer */}
          <div className="border-t border-white/5 py-3 bg-zinc-950 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span className="mx-4"><span className="text-white">Rice (Thai 5%)</span> $650/MT <span className="text-emerald-500">▲ 1.2%</span></span>
              <span className="mx-4"><span className="text-white">Milk (US Class III)</span> $15.80 <span className="text-rose-500">▼ 0.4%</span></span>
              <span className="mx-4"><span className="text-white">Bread (EU Wheat)</span> €230/MT <span className="text-emerald-500">▲ 0.1%</span></span>
              <span className="mx-4"><span className="text-white">Eggs (Large DOZ)</span> $3.20 <span className="text-emerald-500">▲ 2.3%</span></span>
              <span className="mx-4"><span className="text-white">Palm Oil</span> MYR 3,900 <span className="text-rose-500">▼ 1.1%</span></span>
              {/* Repeat for seamless loop */}
              <span className="mx-4"><span className="text-white">Rice (Thai 5%)</span> $650/MT <span className="text-emerald-500">▲ 1.2%</span></span>
              <span className="mx-4"><span className="text-white">Milk (US Class III)</span> $15.80 <span className="text-rose-500">▼ 0.4%</span></span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD APPLICATION */}
      {page === 'dashboard' && (
        <div className="flex h-screen overflow-hidden bg-zinc-950 animate-fade-in shadow-2xl">
          {/* Sidebar */}
          <aside className={`w-64 flex-shrink-0 border-r border-white/5 bg-zinc-950 flex flex-col ${sidebarOpen ? 'absolute inset-y-0 left-0 z-50 w-64' : 'hidden md:flex'}`}>
            <div className="h-16 flex items-center px-6 border-b border-white/5">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => togglePage('landing')}>
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <Activity size={12} color="black" />
                </div>
                <span className="text-base font-semibold text-white tracking-tight">PricePulse</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3">
              <div className="mb-8">
                <div className="px-3 mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">Markets</div>
                <nav className="space-y-0.5">
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-zinc-900 text-white border border-white/5">
                    <LayoutDashboard size={16} />
                    <span className="text-sm font-medium">Overview</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors">
                    <Globe size={16} />
                    <span className="text-sm font-medium">Regional Map</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors">
                    <Wheat size={16} />
                    <span className="text-sm font-medium">Agriculture</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors">
                    <Factory size={16} />
                    <span className="text-sm font-medium">Processing</span>
                  </a>
                </nav>
              </div>

              <div className="mb-8">
                <div className="px-3 mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">Analysis</div>
                <nav className="space-y-0.5">
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors">
                    <FileText size={16} />
                    <span className="text-sm font-medium">Supply Reports</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors">
                    <TrendingUp size={16} />
                    <span className="text-sm font-medium">Forecasts</span>
                  </a>
                </nav>
              </div>
            </div>

            <div className="p-4 border-t border-white/5">
              <button className="flex items-center gap-3 px-2 py-2 w-full rounded-md hover:bg-zinc-900 transition-colors group">
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-700 to-amber-600 flex items-center justify-center text-xs text-white font-bold uppercase transition-transform group-hover:scale-110">JD</div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-sm text-zinc-200 font-medium group-hover:text-white truncate">John Doe</span>
                  <span className="text-xs text-zinc-500 truncate">Agri-Trader Pro</span>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            {/* Mobile Header */}
            <div className="md:hidden h-14 border-b border-white/5 flex items-center justify-between px-4 bg-zinc-950 sticky top-0 z-40">
              <div className="flex items-center gap-2">
                <Activity size={16} color="white" />
                <span className="font-semibold text-white">PricePulse</span>
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-zinc-400 p-2">
                <Menu size={24} />
              </button>
            </div>

            {/* Topbar */}
            <div className="hidden md:flex h-16 border-b border-white/5 items-center justify-between px-8 bg-zinc-950/80 backdrop-blur-sm z-20 sticky top-0">
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="hover:text-zinc-300 cursor-pointer transition-colors" onClick={() => togglePage('landing')}>Home</span>
                <ChevronRight size={14} />
                <span className="text-white font-medium">Global Tracker</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input type="text" placeholder="Search country..." className="bg-zinc-900 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all w-64 placeholder:text-zinc-600" />
                </div>
                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all">
                  <Bell size={14} />
                </button>
              </div>
            </div>

            {/* Dashboard Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
              {/* Header section with Selectors */}
              <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Market Overview</h2>
                  <p className="text-zinc-500">Live inflation data for staple commodities across {aggregates.length} countries.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <ProductSelector selected={selectedProduct} onSelect={setSelectedProduct} />

                  <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-white/5">
                    <button
                      onClick={() => setActiveIndicator('commodities')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeIndicator === 'commodities' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      Staples
                    </button>
                    <button
                      onClick={() => setActiveIndicator('official')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeIndicator === 'official' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      Official CPI
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Map & Analysis Grid */}
              <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 mb-8">
                {/* Map Section */}
                <div className="2xl:col-span-2 glass-panel rounded-2xl overflow-hidden border border-white/5 h-[500px] md:h-[600px] relative">
                  <MapView aggregates={aggregates} onCountrySelect={handleCountrySelect} />
                  <div className="absolute bottom-6 left-6 z-[1000] glass-panel px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 flex items-center gap-3 pointer-events-none">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low Inflation</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> High Pressure</span>
                  </div>
                </div>

                {/* Detailed Analysis Section */}
                <div className="flex flex-col gap-6">
                  {selectedCountry ? (
                    <div className="h-full">
                      <CountryDetailEnhanced country={selectedCountry} series={series} />
                    </div>
                  ) : (
                    <div className="flex-1 glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-white/5 group transition-all hover:bg-white/[0.02]">
                      <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Globe size={32} className="text-zinc-700" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Select a Region</h3>
                      <p className="text-zinc-500 max-w-[240px] leading-relaxed">
                        Click on a country in the map to reveal detailed price trends and inflation analysis.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats & Watchlist row */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                <div className="lg:col-span-3 glass-panel rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-semibold text-white">Global Price Averages</h3>
                    <div className="flex items-center gap-2 bg-zinc-900 rounded p-1">
                      <button className="px-2 py-1 text-[10px] font-bold text-white bg-zinc-800 rounded">1W</button>
                      <button className="px-2 py-1 text-[10px] font-bold text-zinc-600">1M</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.02] bg-white/[0.01]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Wheat size={12} className="text-amber-500" /> Rice
                      </span>
                      <div className="text-2xl font-bold text-white tracking-tight">$1.24/kg</div>
                      <span className="text-xs text-emerald-500 flex items-center gap-1 font-mono font-bold">+2.4% <ArrowUpRight size={12} /></span>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.02] bg-white/[0.01]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Droplet size={12} className="text-yellow-500" /> Oil
                      </span>
                      <div className="text-2xl font-bold text-white tracking-tight">$2.15/L</div>
                      <span className="text-xs text-rose-500 flex items-center gap-1 font-mono font-bold">-0.8% <ArrowDownRight size={12} /></span>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.02] bg-white/[0.01]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Milk size={12} className="text-blue-400" /> Milk
                      </span>
                      <div className="text-2xl font-bold text-white tracking-tight">$1.10/L</div>
                      <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono font-bold">0.0% <Minus size={12} /></span>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/[0.02] bg-white/[0.01]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Egg size={12} className="text-white" /> Eggs
                      </span>
                      <div className="text-2xl font-bold text-white tracking-tight">$3.12/dz</div>
                      <span className="text-xs text-emerald-500 flex items-center gap-1 font-mono font-bold">+5.2% <ArrowUpRight size={12} /></span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="text-sm font-semibold text-white">Sudden Spikes</h3>
                    <TrendingUp size={14} className="text-rose-500 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between p-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                      <span className="text-sm text-zinc-400">Argentina (Bread)</span>
                      <span className="text-xs font-bold text-rose-500 font-mono">+24%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                      <span className="text-sm text-zinc-400">Turkey (Sugar)</span>
                      <span className="text-xs font-bold text-rose-500 font-mono">+18%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                      <span className="text-sm text-zinc-400">Nigeria (Rice)</span>
                      <span className="text-xs font-bold text-rose-500 font-mono">+12%</span>
                    </div>
                    <button className="w-full py-3 text-xs text-zinc-500 hover:text-white transition-colors bg-zinc-950">View Heatmap</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
