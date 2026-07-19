import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Printer, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, visitors: 2400 },
  { name: 'Tue', revenue: 3000, visitors: 1398 },
  { name: 'Wed', revenue: 2000, visitors: 9800 },
  { name: 'Thu', revenue: 2780, visitors: 3908 },
  { name: 'Fri', revenue: 1890, visitors: 4800 },
  { name: 'Sat', revenue: 2390, visitors: 3800 },
  { name: 'Sun', revenue: 3490, visitors: 4300 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-primary w-8 h-8" />
            Analytics & Reports
          </h1>
          <p className="text-gray-400 mt-1">Exportable insights and historical data</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-md hover:bg-white/5 transition-colors text-sm">
            <Calendar className="w-4 h-4" />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Weekly Performance</CardTitle>
            <div className="flex gap-2">
              <button className="p-1.5 bg-surface rounded text-gray-400 hover:text-white"><Filter className="w-4 h-4" /></button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                <Bar dataKey="visitors" fill="#10B981" radius={[4, 4, 0, 0]} name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Match Day Summary', date: 'Oct 24, 2026', size: '2.4 MB' },
                { name: 'Financial Overview Q3', date: 'Oct 01, 2026', size: '5.1 MB' },
                { name: 'Security Incident Log', date: 'Sep 28, 2026', size: '1.2 MB' },
                { name: 'Food & Bev Sales', date: 'Sep 15, 2026', size: '3.8 MB' }
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg hover:bg-surface/60 transition-colors border border-transparent hover:border-white/5 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-md">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{report.name}</h4>
                      <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View All Archive
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
