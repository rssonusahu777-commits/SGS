import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [role, setRole] = useState('organizer');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'fan') {
      navigate('/fan-portal');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">SafeStadium AI</h1>
          <p className="text-gray-400 mt-2">Sign in to access your operations portal</p>
        </div>

        <Card className="backdrop-blur-xl border-white/10 bg-surface/50">
          <CardHeader>
            <CardTitle className="text-center text-lg">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
                >
                  <option value="organizer">Organizer</option>
                  <option value="admin">Stadium Admin</option>
                  <option value="security">Security Staff</option>
                  <option value="fan">Fan</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <input 
                  type="email" 
                  defaultValue="demo@safestadium.ai"
                  className="w-full bg-surface border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Password</label>
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full bg-surface border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              
              <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
