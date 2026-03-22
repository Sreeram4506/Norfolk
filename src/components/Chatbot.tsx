import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { siteConfig, aboutConfig, collectionsConfig, exhibitionsConfig, visitConfig } from '../config';

const CHAT_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const API_KEY = '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';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your AI assistant for Norfolk Development. How can I help you today with your construction or development needs?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // System prompt based on site data
  const systemPrompt: Message = {
    role: 'system',
    content: `You are the official AI assistant for Norfolk Development, a premium construction and development company based in Norfolk, Virginia.
    
    Context about Norfolk Development:
    - ${siteConfig.description}
    - Founded ${aboutConfig.label}.
    - Headline: ${aboutConfig.headline}
    - Services: ${collectionsConfig.collections.map(c => c.title).join(', ')}.
    - Key Projects: ${exhibitionsConfig.exhibitions.map(e => e.title).join(', ')}.
    - Contact Info: ${visitConfig.infoCards.find(c => c.title === 'Visit Our Office')?.content.replace(/<br \/>/g, ', ')} or hello@norfolk-dev.com.
    
    Guidelines:
    - Be professional, knowledgeable, and helpful.
    - Keep responses concise and focused on construction/development services.
    - If you don't know something, suggest they contact our team directly.
    - Maintain a premium tone that matches our brand.
    - Do not mention that you are an AI or using a specific model unless asked.`
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-405b-instruct',
          messages: [systemPrompt, ...messages, userMessage],
          temperature: 0.7,
          max_tokens: 512,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or reach out to us at hello@norfolk-dev.com."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(chatWindowRef.current, 
        { 
          opacity: 0, 
          y: 20, 
          scale: 0.95,
          transformOrigin: 'bottom right'
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.4, 
          ease: 'power3.out' 
        }
      );
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-[9999] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] max-h-[70vh] bg-[#1a1a1a] border border-white/20 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-none border border-white/20">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-tight uppercase">Norfolk Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 bg-[#050505]">
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'user' ? 'bg-white text-modo-black border-white' : 'bg-white/10 text-white border-white/20'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div 
                  className={`max-w-[75%] p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-white/10 border border-white/10 text-white' 
                      : 'bg-[#1a1a1a] border border-white/5 text-white/90'
                  } relative border border-white/10`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-3">
                <div className="w-8 h-8 flex-shrink-0 bg-white/10 text-white border border-white/20 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-[#1a1a1a] border border-white/5 p-3 text-white/60 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest">Processing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#050505] border border-white/40 p-3 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/40 rounded-none w-full block"
              />
              <button 
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-white text-[#050505] p-3 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-[10px] text-white/30 mt-3 uppercase tracking-tighter text-center italic">
              AI-driven insights for Norfolk Development
            </p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 bg-white text-[#050505] flex items-center justify-center shadow-xl transition-all duration-300 transform border border-white/20 hover:scale-110 active:scale-95 group relative ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="flex flex-col items-center justify-center leading-none">
            <span className="text-xl font-bold tracking-tighter">ND</span>
            <span className="text-[7px] uppercase tracking-[0.2em] font-medium mt-0.5 opacity-60">AI</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
