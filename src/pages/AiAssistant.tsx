import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, User, Send, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export default function AiAssistant() {
  const [activeTab, setActiveTab] = useState<'fan' | 'organizer'>('organizer');

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistants</h1>
        <p className="text-muted mt-1">Local Mock Intelligence Agent</p>
      </div>
      
      <div className="flex space-x-2 mb-4 bg-surface/50 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('organizer')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'organizer' ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
        >
          Organizer Assistant
        </button>
        <button 
          onClick={() => setActiveTab('fan')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'fan' ? 'bg-secondary text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
        >
          Fan Assistant
        </button>
      </div>

      <ChatInterface context={activeTab} />
    </div>
  );
}

function ChatInterface({ context }: { context: 'fan' | 'organizer' }) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: `Hello! I'm the AI ${context === 'fan' ? 'Fan' : 'Organizer'} Assistant. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when context changes
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: `Hello! I'm the AI ${context === 'fan' ? 'Fan' : 'Organizer'} Assistant. How can I help you today?` }
    ]);
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context
        })
      });
      
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'model', content: data.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: '**Notice**: The application is running in local mock mode. The server might not be running. Try restarting the local dev server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex-1 flex flex-col min-h-0 border-white/10 bg-surface/30 backdrop-blur-xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary ml-3' : 'bg-secondary/20 mr-3 border border-secondary/30'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-primary-foreground" /> : <Bot className="w-4 h-4 text-secondary" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/20' : 'bg-surface border border-white/5 text-gray-200 rounded-tl-sm shadow-sm'}`}>
                  <div className="prose prose-invert max-w-none text-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="flex max-w-[80%] flex-row">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mr-3">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-surface border border-white/10 rounded-tl-sm flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-surface/50 border-t border-white/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={context === 'organizer' ? "Ask for schedule, predictions, or operational advice..." : "Ask about seats, food, or parking..."}
            className="w-full bg-surface border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 rounded-full bg-primary text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
