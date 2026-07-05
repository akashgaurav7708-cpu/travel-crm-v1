import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';

const reportCards = [
  { title: 'Total Revenue', value: '$142,500', change: '+12.5%', trend: 'up' },
  { title: 'Average Booking Value', value: '$3,850', change: '+5.2%', trend: 'up' },
  { title: 'Lead Conversion Rate', value: '24.8%', change: '-1.4%', trend: 'down' },
  { title: 'Active Customers', value: '842', change: '+8.1%', trend: 'up' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Reports & Analytics</h2>
          <p className="text-slate-500">Analyze your business performance and growth.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reportCards.map((card) => (
          <div key={card.title} className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              <div className={`flex items-center text-xs font-bold ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {card.change}
                {card.trend === 'up' ? <ArrowUpRight className="ml-0.5 h-3 w-3" /> : <ArrowDownRight className="ml-0.5 h-3 w-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-slate-400">
          <TrendingUp className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-sm font-medium italic">Revenue Over Time Chart Placeholder</p>
          <p className="text-xs text-slate-400 mt-1">(Integration with Chart.js or Recharts recommended)</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col items-center justify-center text-slate-400">
          <PieChart className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-sm font-medium italic">Destinations Distribution</p>
          <div className="mt-6 w-full space-y-4 px-4 text-slate-600">
             <div>
                <div className="flex justify-between text-xs mb-1">
                   <span>Europe</span>
                   <span>45%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-xs mb-1">
                   <span>Asia</span>
                   <span>30%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-xs mb-1">
                   <span>Americas</span>
                   <span>25%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500" style={{ width: '25%' }}></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
