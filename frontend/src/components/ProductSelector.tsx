import React from 'react';

const products = [
  { slug: 'rice', name: 'Rice', icon: '🍚' },
  { slug: 'bread', name: 'Bread', icon: '🍞' },
  { slug: 'milk', name: 'Milk', icon: '🥛' },
  { slug: 'eggs', name: 'Eggs', icon: '🥚' },
  { slug: 'oil', name: 'Cooking Oil', icon: '🛢️' }
];

export default function ProductSelector({ selected, onSelect }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Track Commodity</label>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {products.map(p => (
          <button
            key={p.slug}
            onClick={() => onSelect(p.slug)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
              ${selected === p.slug
                ? 'bg-white text-zinc-950 border-white shadow-lg shadow-white/5'
                : 'bg-zinc-900/50 text-zinc-400 border-white/5 hover:bg-zinc-900 hover:text-white'
              }
            `}
          >
            <span className="text-sm">{p.icon}</span>
            <span className="truncate">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
