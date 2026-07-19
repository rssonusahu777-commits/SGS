import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, Bot } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-5xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary mb-8 text-sm font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Local Mock Edition
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
          Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Stadium Operations</span> <br/>
          & AI Management
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-10 font-light">
          Streamline live events, enhance physical security with simulated real-time insights, and provide premium fan experiences without external dependencies.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="h-14 text-lg px-8 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-primary text-white hover:bg-primary/90 transition-all hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]">
              Access Workspace
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-14 text-lg px-8 rounded-full border-border hover:bg-surface-hover">
            Explore Capabilities
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-24 w-full relative z-10">
        {[
          { icon: Shield, title: 'AI Safety Center', desc: 'Simulated real-time crowd density and incident prediction.' },
          { icon: Activity, title: 'Live Operations', desc: 'Manage gates, parking, and metrics live.' },
          { icon: Zap, title: 'Tournament Logic', desc: 'Automated fixtures and bracket generation.' },
          { icon: Bot, title: 'Smart Assistants', desc: 'Local simulated AI for fans, staff, and organizers.' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            className="p-6 rounded-3xl border border-white/5 bg-surface/30 backdrop-blur-xl text-left hover:bg-surface/60 transition-all hover:-translate-y-1 hover:border-white/10 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 tracking-tight">{feature.title}</h3>
            <p className="text-sm text-muted">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Background Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}
