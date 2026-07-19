import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, MapPin, Coffee, Star, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function FanPortal() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-gradient-to-r from-secondary/20 to-primary/10 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Welcome back, Alex!</h1>
          <p className="text-gray-300 mt-2 text-lg">Ready for the big match today?</p>
        </div>
        <div className="relative z-10 hidden sm:block">
          <div className="w-20 h-20 bg-surface border-2 border-white/20 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-2xl font-bold text-gray-400">AM</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Match Day</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:border-primary/40 transition-colors cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary/20 rounded-xl text-primary">
                <Ticket className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold bg-success/20 text-success px-2 py-1 rounded-full uppercase tracking-wider">Valid</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Eagles vs Falcons</h3>
            <p className="text-sm text-gray-400 mb-4">Today, 19:00 • Main Stadium</p>
            
            <div className="flex gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase">Gate</p>
                <p className="font-mono font-semibold text-lg">2B</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Section</p>
                <p className="font-mono font-semibold text-lg">114</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Seat</p>
                <p className="font-mono font-semibold text-lg">42</p>
              </div>
            </div>

            <button className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              View QR Ticket
            </button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="hover:bg-white/5 transition-colors cursor-pointer group">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-xl text-secondary border border-white/5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Parking Pass</h4>
                  <p className="text-sm text-gray-400">Zone C, Spot 124</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </CardContent>
          </Card>

          <Card className="hover:bg-white/5 transition-colors cursor-pointer group">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-xl text-warning border border-white/5">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Food & Beverage</h4>
                  <p className="text-sm text-gray-400">Order ahead to skip lines</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-500">Fan Rewards</h4>
                  <p className="text-sm text-amber-500/80">1,250 Points • Gold Tier</p>
                </div>
              </div>
              <button className="text-xs font-semibold bg-amber-500 text-black px-3 py-1.5 rounded-full hover:bg-amber-400 transition-colors">Redeem</button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Buy Tickets', icon: Ticket },
          { label: 'Top Up Card', icon: CreditCard },
          { label: 'Find Seat', icon: MapPin },
          { label: 'Live Chat', icon: Star }
        ].map((action, i) => (
          <motion.button 
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-surface/50 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <action.icon className="w-6 h-6 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
