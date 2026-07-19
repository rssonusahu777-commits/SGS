import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, Shield, Bell, Palette, Globe, Key, Lock, Database, AlertTriangle, Check, Upload, Smartphone, Monitor, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tabs = [
  { id: 'profile', label: 'Profile Settings', icon: User },
  { id: 'organization', label: 'Organization', icon: Building },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'localization', label: 'Language & Time', icon: Globe },
  { id: 'roles', label: 'Role & Permissions', icon: Users },
  { id: 'api', label: 'API & AI Settings', icon: Key },
  { id: 'privacy', label: 'Privacy & Data', icon: Database },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-400 mt-2 text-sm">Manage your account, organization, and application preferences.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-gray-300 border-white/10 hover:bg-white/5">Cancel</Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-white min-w-[100px]"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving
              </div>
            ) : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
        <div className="space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-surface/50 border border-transparent'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && <ProfileSettings />}
              {activeTab === 'organization' && <OrganizationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'appearance' && <AppearanceSettings />}
              {activeTab === 'localization' && <LocalizationSettings />}
              {activeTab === 'roles' && <RoleSettings />}
              {activeTab === 'api' && <ApiSettings />}
              {activeTab === 'privacy' && <PrivacySettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 flex items-center gap-2 bg-surface border border-success/30 shadow-2xl px-4 py-3 rounded-lg z-50"
          >
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-success" />
            </div>
            <p className="text-sm font-medium">Settings saved successfully.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Setting Sections ---

function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription className="text-gray-400">Update your account's profile information and email address.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-white/10">
          <div className="w-24 h-24 rounded-full bg-surface border-2 border-white/10 flex items-center justify-center overflow-hidden relative group">
            <span className="text-2xl font-bold text-gray-500">AS</span>
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Upload className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="border-white/10 text-gray-300">Change Avatar</Button>
              <Button size="sm" variant="ghost" className="text-danger hover:text-danger/80 hover:bg-danger/10">Remove</Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">First Name</label>
            <input type="text" defaultValue="Alex" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Last Name</label>
            <input type="text" defaultValue="Smith" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email Address</label>
          <input type="email" defaultValue="alex.smith@safestadium.ai" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Phone Number</label>
          <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
      </CardContent>
    </Card>
  );
}

function OrganizationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Details</CardTitle>
        <CardDescription className="text-gray-400">Manage your stadium and organization information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Organization Name</label>
          <input type="text" defaultValue="SafeStadium Global" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Primary Stadium</label>
          <select className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-gray-200">
            <option>Main Metropolitan Stadium</option>
            <option>Olympic Arena</option>
            <option>Grand Sports Complex</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Total Capacity</label>
            <input type="number" defaultValue="60000" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Number of Gates</label>
            <input type="number" defaultValue="12" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Preferences</CardTitle>
          <CardDescription className="text-gray-400">Manage your password and authentication settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-200 border-b border-white/10 pb-2">Change Password</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2 text-xs">Update Password</Button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-200">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-surface border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border-transparent"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription className="text-gray-400">Manage devices currently logged into your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/50 border border-white/5 rounded-lg">
            <div className="flex items-center gap-4">
              <Monitor className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium">MacOS • Chrome</p>
                <p className="text-xs text-gray-500 mt-0.5">San Francisco, US • Active now</p>
              </div>
            </div>
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Current</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface/30 border border-white/5 rounded-lg">
            <div className="flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-300">iOS • Safari</p>
                <p className="text-xs text-gray-500 mt-0.5">San Francisco, US • Last active 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-danger hover:text-danger/80 text-xs">Revoke</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription className="text-gray-400">Configure how you receive alerts and reports.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <NotificationToggle title="Security Alerts" desc="Critical incidents, breaches, and emergency protocols." checked={true} />
        <NotificationToggle title="Operational Updates" desc="Gate changes, parking status, and crowd warnings." checked={true} />
        <NotificationToggle title="Daily Reports" desc="Automated summaries of attendance and revenue." checked={false} />
        <NotificationToggle title="Marketing & News" desc="Product updates and SafeStadium AI announcements." checked={false} />
      </CardContent>
    </Card>
  );
}

function NotificationToggle({ title, desc, checked }: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h4 className="text-sm font-medium text-gray-200">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{desc}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
        <div className="w-11 h-6 bg-surface border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border-transparent"></div>
      </label>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription className="text-gray-400">Customize the look and feel of your dashboard.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-primary bg-background rounded-lg p-3 cursor-pointer text-center">
              <div className="w-full h-16 bg-surface rounded mb-2 border border-white/10"></div>
              <span className="text-xs font-medium text-primary">Dark (Cosmic)</span>
            </div>
            <div className="border border-white/10 bg-[#f8fafc] rounded-lg p-3 cursor-pointer text-center opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-full h-16 bg-white rounded mb-2 border border-gray-200 shadow-sm"></div>
              <span className="text-xs font-medium text-gray-600">Light</span>
            </div>
            <div className="border border-white/10 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-lg p-3 cursor-pointer text-center opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-full h-16 bg-white/5 rounded mb-2 border border-white/10 shadow-sm"></div>
               <span className="text-xs font-medium text-gray-400">System</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LocalizationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language & Region</CardTitle>
        <CardDescription className="text-gray-400">Set your preferred language and time zone.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Language</label>
          <select className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-gray-200">
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Time Zone</label>
          <select className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-gray-200">
            <option>Pacific Time (PT) - US & Canada</option>
            <option>Eastern Time (ET) - US & Canada</option>
            <option>Central European Time (CET)</option>
            <option>Coordinated Universal Time (UTC)</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}

function RoleSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role & Permissions</CardTitle>
        <CardDescription className="text-gray-400">View your assigned role and system permissions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-primary">System Administrator</h4>
            <p className="text-sm text-primary/80 mt-1">You have full access to all SafeStadium AI features.</p>
          </div>
          <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">Active Role</span>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-200 border-b border-white/10 pb-2">Your Permissions</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                 <Check className="w-3 h-3 text-success" />
               </div>
               <span className="text-sm text-gray-300">Manage Tournaments</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                 <Check className="w-3 h-3 text-success" />
               </div>
               <span className="text-sm text-gray-300">Issue Emergency Alerts</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                 <Check className="w-3 h-3 text-success" />
               </div>
               <span className="text-sm text-gray-300">View Financial Reports</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                 <Check className="w-3 h-3 text-success" />
               </div>
               <span className="text-sm text-gray-300">Manage User Roles</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                 <Check className="w-3 h-3 text-success" />
               </div>
               <span className="text-sm text-gray-300">Configure AI Settings</span>
             </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-4">Note: Your role is managed by your organization's Identity Provider. Contact IT to request changes.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ApiSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription className="text-gray-400">Manage settings for the Local Mock Intelligence Agent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3 text-sm text-primary/90">
            <Lock className="w-5 h-5 shrink-0" />
            <p>The application is currently running in full local mock mode. No external API keys are required for AI features.</p>
          </div>
          
          <div className="space-y-2 opacity-50 pointer-events-none">
            <label className="text-sm font-medium text-gray-300">External AI Service Key (Disabled)</label>
            <div className="flex gap-2">
              <input type="password" defaultValue="Not required in mock mode" disabled className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm font-mono text-gray-500" />
            </div>
            <p className="text-xs text-gray-500">External LLM integration is disabled in this environment.</p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium text-gray-200 mb-4">SafeStadium Webhook Endpoints</h4>
            <div className="flex items-center justify-between p-3 bg-surface/50 border border-white/10 rounded-lg">
               <div className="font-mono text-xs text-gray-400">http://localhost:3000/api/webhooks/incidents</div>
               <Button variant="ghost" size="sm" className="h-6 text-xs">Copy</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Data</CardTitle>
          <CardDescription className="text-gray-400">Manage your data retention and privacy policies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <NotificationToggle title="Telemetry & Usage Data" desc="Share anonymous usage data to help improve SafeStadium AI." checked={true} />
           <NotificationToggle title="AI Training Contribution" desc="Allow your anonymized incident reports to be used to improve Local Mock AI's stadium safety models." checked={false} />
           
           <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-medium text-gray-200 mb-2">Export Data</h4>
              <p className="text-xs text-gray-500 mb-4">Download a complete copy of all your organizational data, including incident logs, attendance records, and user profiles in JSON format.</p>
              <Button variant="outline" className="border-white/10">Request Data Archive</Button>
           </div>
        </CardContent>
      </Card>

      <Card className="border-danger/30 bg-danger/5">
        <CardHeader>
          <CardTitle className="text-danger flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all associated organization data. This action cannot be undone.</p>
           <Button variant="danger" className="bg-danger hover:bg-danger/90">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
