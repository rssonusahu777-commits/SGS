import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Trophy, ShieldAlert, Bot, Settings as SettingsIcon, LogOut, Map, FileText, UserCircle, Menu, X } from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tournament from './pages/Tournament';
import SafetyCenter from './pages/SafetyCenter';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import StadiumMap from './pages/Map';
import Reports from './pages/Reports';
import FanPortal from './pages/FanPortal';
import Settings from './pages/Settings';

function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tournament', path: '/tournament', icon: Trophy },
    { name: 'Safety Center', path: '/safety', icon: ShieldAlert },
    { name: 'AI Assistants', path: '/ai-assistants', icon: Bot },
    { name: 'Stadium Map', path: '/map', icon: Map },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Fan Portal', path: '/fan-portal', icon: UserCircle },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-64 flex-shrink-0 bg-surface/30 border-r border-border h-full flex flex-col p-4 z-10 backdrop-blur-xl">
      <div className="flex items-center justify-between space-x-3 mb-8 px-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">SafeStadium</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto pb-4 scrollbar-hide">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
              location.pathname.startsWith(item.path)
                ? 'bg-white/10 text-white shadow-sm border border-white/5'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className={`w-4 h-4 ${location.pathname.startsWith(item.path) ? 'text-primary' : 'opacity-70'}`} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <Link to="/" onClick={onClose} className="flex items-center space-x-3 px-3 py-2.5 text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all mt-auto w-full text-left text-sm font-medium">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </Link>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthRoute = location.pathname === '/' || location.pathname === '/login';

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-background">
        <PageWrapper>{children}</PageWrapper>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex md:hidden bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            >
              <Sidebar onClose={() => setMobileMenuOpen(false)} />
            </motion.div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-2xl flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-muted hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-medium text-muted capitalize hidden sm:block">
              {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-sm font-bold text-primary">
              AS
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <PageWrapper>{children}</PageWrapper>
        </main>
      </div>
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="p-4 md:p-8 min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/safety" element={<SafetyCenter />} />
          <Route path="/ai-assistants" element={<AiAssistant />} />
          <Route path="/map" element={<StadiumMap />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/fan-portal" element={<FanPortal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}
