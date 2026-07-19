import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertTriangle, CarFront, Ticket, Activity, TrendingUp, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { generateMatches, generateIncidents } from '@/lib/mockData';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    // Generate static mock data on mount
    setAttendanceData([
      { time: '14:00', count: 5000 },
      { time: '15:00', count: 12000 },
      { time: '16:00', count: 25000 },
      { time: '17:00', count: 40000 },
      { time: '18:00', count: 52000 },
      { time: '19:00', count: 58245 },
    ]);
    
    setRevenueData([
      { category: 'Tickets', amount: 1200000 },
      { category: 'F&B', amount: 450000 },
      { category: 'Merch', amount: 200000 },
      { category: 'Parking', amount: 80000 },
    ]);

    setLiveMatches(generateMatches(3));
    setIncidents(generateIncidents(4));

    // Simulate live updates
    const interval = setInterval(() => {
      setAttendanceData(prev => {
        const last = prev[prev.length - 1];
        if (!last) return prev;
        const newCount = last.count + Math.floor(Math.random() * 50) - 20;
        return [...prev.slice(0, -1), { ...last, count: newCount }];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Live Operations Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time overview of stadium metrics</p>
        </div>
        <div className="flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full border border-success/20">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="font-medium text-sm">System Normal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Current Attendance" value={attendanceData[attendanceData.length - 1]?.count.toLocaleString() || '0'} total="Capacity: 60,000" icon={Users} color="text-primary" />
        <MetricCard title="Active Incidents" value={incidents.filter(i => i.status === 'active').length.toString()} total="Resolved today: 15" icon={AlertTriangle} color="text-danger" />
        <MetricCard title="Parking Status" value="85%" total="Zone C Available" icon={CarFront} color="text-secondary" />
        <MetricCard title="Total Revenue" value="$1.93M" total="+12% from last event" icon={DollarSign} color="text-success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Attendance Flow</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <YAxis dataKey="category" type="category" stroke="var(--color-muted)" width={80} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                />
                <Bar dataKey="amount" fill="#06B6D4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveMatches.map((match, idx) => (
                <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }} className="flex justify-between items-center p-4 rounded-lg bg-surface/50 border border-white/5">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-sm">{match.teamA}</span>
                    <span className="font-semibold text-sm">{match.teamB}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-background rounded-md px-3 py-1 font-mono text-lg font-bold border border-white/10">
                      <span>{match.scoreA}</span>
                      <div className="w-full h-px bg-white/10 my-1" />
                      <span>{match.scoreB}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-muted">{match.venue}</span>
                      <span className={`text-xs font-medium ${match.status === 'Live' ? 'text-success animate-pulse' : 'text-muted'}`}>{match.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.map((incident, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-lg bg-surface/50 border border-white/5 hover:bg-surface-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${incident.status === 'active' ? 'bg-danger animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                    <div>
                      <p className="text-sm font-medium">{incident.type}</p>
                      <p className="text-xs text-muted">{incident.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-300">{incident.time}</p>
                    <p className={`text-xs uppercase ${incident.priority === 'high' || incident.priority === 'critical' ? 'text-danger' : 'text-warning'}`}>{incident.priority}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, total, icon: Icon, color }: any) {
  return (
    <Card className="overflow-hidden relative group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 ${color}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-muted text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            <p className="text-xs text-muted mt-2 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-success" />
              {total}
            </p>
          </div>
          <div className={`p-3 rounded-xl bg-surface/50 shadow-sm border border-white/5 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
