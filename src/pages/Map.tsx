import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map as MapIcon, Navigation, Maximize, ShieldAlert, Navigation2, LogIn, LogOut, Ticket, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function StadiumMap() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MapIcon className="text-primary w-8 h-8" />
            Interactive Stadium Layout
          </h1>
          <p className="text-gray-400 mt-1">Real-time geospatial overview of facilities and routing</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-surface border border-white/10 rounded-md hover:bg-white/5 transition-colors">
            <Maximize className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-14rem)] overflow-hidden relative border-white/10">
             {/* Map Background Simulation */}
             <div className="absolute inset-0 bg-[#0a0f1c] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_1px,transparent_1px)]" style={{ backgroundSize: '30px 30px' }} />
             
             {/* Map Controls */}
             <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
               <div className="bg-surface/80 backdrop-blur border border-white/10 rounded-lg p-1 flex flex-col gap-1">
                 <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">+</button>
                 <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">-</button>
               </div>
               <button className="bg-surface/80 backdrop-blur border border-white/10 p-2 rounded-lg text-primary hover:bg-primary/20 transition-colors">
                 <Navigation className="w-5 h-5" />
               </button>
             </div>

             {/* Legend */}
             <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur border border-white/10 p-4 rounded-xl z-20">
               <h4 className="text-sm font-semibold mb-3">Map Legend</h4>
               <div className="space-y-2 text-xs text-gray-300">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success/80" /> Entry Gates</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-danger/80" /> Emergency Routes</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary/80" /> Medical Centers</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning/80" /> Food Courts</div>
               </div>
             </div>

             <div className="absolute inset-0 flex items-center justify-center p-12">
               {/* Central Pitch */}
               <div className="w-full max-w-3xl aspect-[1.8/1] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-green-800/10 border-2 border-white/10 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-[90%] h-[80%] border border-white/20 rounded-full flex items-center justify-center">
                       <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center">
                         <div className="w-2 h-2 bg-white/50 rounded-full" />
                       </div>
                    </div>
                  </div>

                  {/* Nodes */}
                  <MapNode top="5%" left="50%" icon={LogIn} color="bg-success" label="North Gate 1" />
                  <MapNode top="95%" left="50%" icon={LogOut} color="bg-success" label="South Gate 2" />
                  <MapNode top="50%" left="5%" icon={LogIn} color="bg-success" label="East Gate 3" />
                  <MapNode top="50%" left="95%" icon={LogIn} color="bg-warning" label="West Gate 4 (Crowded)" pulse />

                  <MapNode top="20%" left="20%" icon={Ticket} color="bg-secondary" label="VIP Lounge" />
                  <MapNode top="80%" left="80%" icon={ShieldAlert} color="bg-primary" label="Medical A" />
                  <MapNode top="20%" left="80%" icon={Navigation2} color="bg-danger" label="Fire Exit 1" />
                  <MapNode top="80%" left="20%" icon={Users} color="bg-warning" label="Food Court" />
               </div>
             </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Zone Status</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <ZoneItem name="North Wing" status="Clear" density="Low" color="text-success" />
                <ZoneItem name="South Wing" status="Moderate" density="Med" color="text-warning" />
                <ZoneItem name="East Wing" status="Clear" density="Low" color="text-success" />
                <ZoneItem name="West Wing" status="Crowded" density="High" color="text-danger" alert />
                <ZoneItem name="Pitch Level" status="Restricted" density="-" color="text-gray-400" />
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Active Routes</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4 text-sm">
                <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                  <h4 className="font-semibold text-danger flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Emergency Route Alpha</h4>
                  <p className="text-gray-400 mt-1">Cleared for medical transport from Section 112 to West Exit.</p>
                </div>
                <div className="p-3 bg-surface/50 border border-white/10 rounded-lg">
                  <h4 className="font-semibold text-primary flex items-center gap-2"><Navigation2 className="w-4 h-4" /> VIP Escort</h4>
                  <p className="text-gray-400 mt-1">Active from North Gate to VIP Lounge. Expect minor delays.</p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function MapNode({ top, left, icon: Icon, color, label, pulse = false }: any) {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-30" style={{ top, left }}>
      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg ${color} ${pulse ? 'animate-pulse' : ''}`}>
         {pulse && <div className={`absolute inset-0 rounded-full ${color} animate-ping opacity-75`} />}
         <Icon className="w-5 h-5 relative z-10" />
      </div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
        {label}
      </div>
    </div>
  );
}

function ZoneItem({ name, status, density, color, alert }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface/40 rounded-lg border border-white/5">
      <div>
        <h4 className="font-medium text-sm">{name}</h4>
        <p className={`text-xs ${color} flex items-center gap-1 mt-0.5`}>
          {alert && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
          {status}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">Density</p>
        <p className="text-sm font-semibold">{density}</p>
      </div>
    </div>
  );
}
