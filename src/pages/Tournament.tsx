import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, GitMerge, Sparkles, MapPin } from 'lucide-react';
import { generateTournaments, generateMatches } from '@/lib/mockData';
import { motion } from 'motion/react';

export default function Tournament() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    setMatches(generateMatches(10));
    setTournaments(generateTournaments(1));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="text-primary w-8 h-8" />
            Tournament Operations
          </h1>
          <p className="text-gray-400 mt-1">Manage schedules, teams, and brackets for {tournaments[0]?.name || 'Current Tournament'}</p>
        </div>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white">
          <Sparkles className="w-4 h-4" />
          AI Auto-Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-primary/10 w-24 h-24 rounded-full blur-xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Registered Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{tournaments[0]?.teamsCount || 16}</div>
            <p className="text-sm text-gray-400 mt-1">4 Groups of {Math.floor((tournaments[0]?.teamsCount || 16) / 4)}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 border-secondary/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-secondary/10 w-24 h-24 rounded-full blur-xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Total Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{matches.length * 3}</div>
            <p className="text-sm text-gray-400 mt-1">12 completed, {matches.length * 3 - 12} remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-success/5 border-success/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-success/10 w-24 h-24 rounded-full blur-xl" />
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-success" />
              Current Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight">Knockouts</div>
            <p className="text-sm text-gray-400 mt-1">Quarter Finals Phase</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fixtures & Results</CardTitle>
            <div className="flex gap-2">
              <input type="text" placeholder="Search team..." className="bg-surface border border-white/10 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 font-medium">Match</th>
                    <th className="py-3 px-4 font-medium">Time</th>
                    <th className="py-3 px-4 font-medium">Venue</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {matches.map((match, i) => (
                    <motion.tr 
                      key={match.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold">{match.teamA}</div>
                          <div className="px-2 py-0.5 bg-surface rounded text-xs font-mono border border-white/10">
                            {match.status === 'Upcoming' ? 'VS' : `${match.scoreA} - ${match.scoreB}`}
                          </div>
                          <div className="font-semibold">{match.teamB}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300">
                        {new Date(match.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        <div className="text-xs text-gray-500">{new Date(match.time).toLocaleDateString()}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          {match.venue}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full border ${
                          match.status === 'Upcoming' ? 'bg-primary/20 text-primary border-primary/20' : 
                          match.status === 'Live' ? 'bg-success/20 text-success border-success/20 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                          'bg-surface text-gray-400 border-white/10'
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button size="sm" variant="ghost" className="h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Edit</Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Points Table (Group A)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { team: 'Eagles', p: 3, w: 2, d: 1, l: 0, pts: 7 },
                 { team: 'Falcons', p: 3, w: 2, d: 0, l: 1, pts: 6 },
                 { team: 'Lions', p: 3, w: 1, d: 1, l: 1, pts: 4 },
                 { team: 'Tigers', p: 3, w: 0, d: 0, l: 3, pts: 0 },
               ].map((t, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-6 text-center font-bold text-gray-500">{i + 1}</div>
                      <div className="font-semibold">{t.team}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-gray-400 w-4 text-center">{t.p}</div>
                      <div className="font-bold w-6 text-right text-primary">{t.pts}</div>
                    </div>
                 </div>
               ))}
             </div>
             <div className="mt-4 text-xs text-gray-500 flex justify-between px-2">
               <span>P: Played</span>
               <span>Pts: Points</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
