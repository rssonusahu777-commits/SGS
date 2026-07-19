import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Map, AlertTriangle, Radio, CheckCircle2, Megaphone, Activity, Cctv, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateIncidents } from '@/lib/mockData';

export default function SafetyCenter() {
  const [announcementPrompt, setAnnouncementPrompt] = useState('');
  const [generatedAnnouncement, setGeneratedAnnouncement] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    setIncidents(generateIncidents(6));
  }, []);

  const handleGenerate = async () => {
    if (!announcementPrompt) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: announcementPrompt })
      });
      const data = await res.json();
      setGeneratedAnnouncement(data.data.announcement);
    } catch (err) {
      setGeneratedAnnouncement('Error generating announcement.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldAlert className="text-danger w-8 h-8" />
            AI Safety Center
          </h1>
          <p className="text-gray-400 mt-1">Live monitoring and emergency response</p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <div className="text-sm text-gray-400">Security Staff</div>
            <div className="text-xl font-bold flex items-center gap-2 justify-end"><Users className="w-4 h-4 text-primary" /> 245 / 300</div>
          </div>
          <div className="border-l border-white/10 pl-6">
            <div className="text-sm text-gray-400">Current Risk Score</div>
            <div className="text-2xl font-bold text-success animate-pulse flex items-center gap-2"><Activity className="w-5 h-5" /> LOW (12/100)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Incidents */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="h-[calc(100vh-14rem)] flex flex-col">
            <CardHeader className="pb-3 border-b border-white/5 shrink-0">
              <CardTitle className="text-lg flex items-center justify-between">
                Live Incident Feed
                <span className="bg-danger/20 text-danger text-xs px-2 py-1 rounded-full animate-pulse border border-danger/30 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-danger" />
                  {incidents.filter(i => i.status === 'active').length} Active
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="divide-y divide-white/5">
                {incidents.map(inc => (
                  <motion.div key={inc.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {inc.status === 'active' ? (
                          <AlertTriangle className="w-4 h-4 text-danger animate-pulse" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        )}
                        <span className="font-medium text-sm">{inc.type}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{inc.time}</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
                      <span>{inc.location}</span>
                      <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        inc.priority === 'critical' ? 'bg-danger/20 text-danger' : 
                        inc.priority === 'high' ? 'bg-warning/20 text-warning' : 
                        'bg-surface text-gray-400'
                      }`}>{inc.priority}</span>
                    </div>
                    {inc.status === 'active' && (
                      <div className="bg-danger/5 text-danger/90 text-xs p-2.5 rounded border border-danger/20 flex gap-2">
                        <div className="w-1 h-full bg-danger rounded-full shrink-0" />
                        <p>AI: Dispatching nearest security unit. Est arrival: 2 mins.</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Map / Density */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-danger/20 relative">
            <div className="bg-danger/10 p-4 border-b border-danger/20 flex items-start gap-4">
              <div className="p-2 bg-danger/20 rounded-full shrink-0 mt-1">
                <AlertTriangle className="text-danger w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-danger">AI Density Alert: Gate 4</h4>
                <p className="text-sm text-danger/80 mt-1">Crowd density is exceeding safe limits (4.2 pax/sqm). Suggest opening auxiliary exits.</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="danger" className="h-8 shadow-[0_0_15px_rgba(239,68,68,0.3)]">Open Gate 5</Button>
                  <Button size="sm" variant="outline" className="h-8 border-danger/50 text-danger hover:bg-danger/20">Deploy Staff</Button>
                </div>
              </div>
            </div>
            <div className="h-[400px] bg-slate-900/50 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px' }} />
              <Map className="w-24 h-24 text-gray-600 opacity-10 absolute" />
              
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                 {/* Simulated Heatmap overlays */}
                 <div className="w-full h-full max-w-2xl relative rounded-3xl border border-white/10 bg-surface/30 p-4 backdrop-blur-md shadow-2xl">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-success/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-warning/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                    <div className="absolute bottom-8 right-12 w-48 h-48 bg-danger/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '2s' }} />
                    
                    {/* Simulated points of interest */}
                    <div className="absolute bottom-16 right-24 bg-danger text-white text-[10px] font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(239,68,68,0.8)] z-10">Gate 4 (Crowded)</div>
                    <div className="absolute top-1/3 left-1/3 bg-surface/80 border border-white/20 text-gray-300 text-[10px] font-bold px-2 py-1 rounded z-10 flex items-center gap-1"><Cctv className="w-3 h-3" /> Cam 12</div>
                 </div>
              </div>
            </div>
          </Card>

          {/* AI Announcement Generator */}
          <Card className="bg-gradient-to-br from-surface to-surface/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-secondary" />
                AI Announcement Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Describe the situation:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={announcementPrompt}
                    onChange={(e) => setAnnouncementPrompt(e.target.value)}
                    placeholder="e.g. Gate 4 is crowded, direct fans to Gate 5"
                    className="flex-1 bg-background/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                  <Button onClick={handleGenerate} disabled={isGenerating || !announcementPrompt} className="bg-secondary text-background hover:bg-cyan-400 px-6">
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Generating
                      </div>
                    ) : 'Generate'}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {generatedAnnouncement && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    className="bg-black/30 border border-secondary/30 rounded-lg p-5 relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/50" />
                    <p className="text-sm leading-relaxed text-gray-200">{generatedAnnouncement}</p>
                    <div className="flex gap-2 mt-5">
                      <Button size="sm" variant="outline" className="h-8 text-xs bg-surface/50 border-white/10 hover:bg-white/10 hover:text-white">Copy Text</Button>
                      <Button size="sm" className="h-8 text-xs bg-success/20 hover:bg-success/30 text-success border border-success/30 flex items-center gap-2 transition-colors">
                        <Radio className="w-3.5 h-3.5" />
                        Broadcast Audio
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
