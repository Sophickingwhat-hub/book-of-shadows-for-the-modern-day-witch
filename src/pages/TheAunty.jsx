import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import MessageBubble from '../components/MessageBubble';

export default function TheAunty() {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initConversation = async () => {
      const conv = await base44.agents.createConversation({
        agent_name: 'the_aunty',
        metadata: { name: 'Chat with The Aunty' }
      });
      setConversationId(conv.id);
      setMessages(conv.messages || []);
    };
    initConversation();
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversationId, (data) => {
      setMessages(data.messages);
      setSending(false);
    });
    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return;
    setSending(true);
    const userMessage = input;
    setInput('');
    
    const conversation = await base44.agents.getConversation(conversationId);
    await base44.agents.addMessage(conversation, {
      role: 'user',
      content: userMessage
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-800/60 border-2 border-purple-700 rounded-xl p-6">
          <h1 className="text-4xl font-serif text-amber-100 mb-2 text-center">✨ The Aunty ✨</h1>
          <p className="text-purple-200 text-center mb-6">Your wise hippie crone guide</p>

          <div className="bg-slate-900/50 rounded-lg p-4 h-[500px] overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-lg px-4 py-2">
                  <Loader2 className="w-5 h-5 text-purple-300 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask The Aunty anything..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1"
              rows={2}
            />
            <Button onClick={handleSend} disabled={sending || !input.trim()} className="bg-purple-600 hover:bg-purple-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}