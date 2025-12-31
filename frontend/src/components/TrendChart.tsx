import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

export default function TrendChart({ data, wbData, labelP = 'PricePulse', labelW = 'World Bank CPI' }: any) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');
    if (!ctx) return;

    const gradientRice = ctx.createLinearGradient(0, 0, 0, 200);
    gradientRice.addColorStop(0, 'rgba(251, 191, 36, 0.2)'); // Amber
    gradientRice.addColorStop(1, 'rgba(251, 191, 36, 0)');

    const datasets = [
      {
        label: labelP,
        data: data.map((d: any) => d.median_price_usd || d.value || 0),
        borderColor: '#fbbf24', // Amber 400
        backgroundColor: gradientRice,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#09090b',
        pointBorderColor: '#fbbf24',
        pointHoverBackgroundColor: '#fff',
        fill: true,
      }
    ];

    if (wbData && wbData.length > 0) {
      datasets.push({
        label: labelW,
        data: wbData.map((d: any) => d.value),
        borderColor: '#52525b', // Zinc 600
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [6, 4],
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      } as any);
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d: any) => d.week_start || d.date || ''),
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true,
              pointStyle: 'circle',
              color: '#71717a',
              font: { size: 10, weight: 'bold' as any }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(9, 9, 11, 0.9)',
            titleColor: '#fff',
            bodyColor: '#a1a1aa',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            titleFont: { size: 12, weight: 'bold' as any },
            bodyFont: { size: 11 }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#52525b', font: { size: 10 } }
          },
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#52525b', font: { size: 10 } }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [data, wbData, labelP, labelW]);

  return <canvas ref={ref} />;
}
