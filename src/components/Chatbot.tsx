'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const SUGGESTIONS = {
  ru: ['О предприятии', 'Авиационные отделения', 'Техника и вертолёты', 'Контакты'],
  kz: ['Кәсіпорын туралы', 'Авиациялық бөлімшелер', 'Техника мен тікұшақтар', 'Байланыс'],
  en: ['About the Enterprise', 'Aviation Branches', 'Equipment and Helicopters', 'Contacts'],
};

export function Chatbot() {
  const t = useTranslations();
  const locale = useLocale() as 'ru' | 'kz' | 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; time: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const openChat = () => {
    setIsOpen(true);
    if (!welcomed) {
      setWelcomed(true);
      setTimeout(() => {
        setMessages([{ role: 'bot', text: t('chatbot.welcome'), time: getTime() }]);
      }, 300);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text, time: getTime() }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locale }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply, time: getTime() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: t('chatbot.error'), time: getTime() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-7 right-7 z-50 font-sans">
      {/* Chat Window */}
      <div className={`absolute bottom-[72px] right-0 w-[360px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18),0_0_0_1px_rgba(26,58,40,0.08)] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-forest px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">🚁</div>
          <div className="flex-1">
            <div className="text-[13.5px] font-extrabold text-white tracking-tight">{t('chatbot.title')}</div>
            <div className="text-[11px] text-white/45 mt-px flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {t('chatbot.subtitle')}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-[340px] min-h-[200px] bg-sky2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
              <div className={`px-3.5 py-2.5 rounded-xl text-[13.5px] leading-relaxed break-words ${msg.role === 'user' ? 'bg-forest text-white rounded-br-sm' : 'bg-sky text-text rounded-bl-sm'}`}>
                {msg.text}
              </div>
              <div className={`text-[10px] text-black/30 mt-1 px-0.5 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="self-start bg-sky px-3.5 py-3 rounded-xl rounded-bl-sm flex gap-1 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-text-dim animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-text-dim animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-text-dim animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-3 flex flex-wrap gap-1.5 bg-sky2">
            {SUGGESTIONS[locale].map((sug, i) => (
              <button key={i} onClick={() => sendMessage(sug)} className="bg-transparent border border-forest/20 text-forest-mid px-3 py-1 text-[12px] font-bold rounded-full cursor-pointer hover:bg-forest hover:text-white hover:border-forest transition-colors text-left">
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex border-t border-forest/10 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder={t('chatbot.placeholder')}
            className="flex-1 bg-transparent border-none px-4 py-3.5 text-[13.5px] text-text outline-none"
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping} className="w-12 flex items-center justify-center bg-forest text-white border-none cursor-pointer hover:bg-forest-mid disabled:opacity-50 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button onClick={() => isOpen ? setIsOpen(false) : openChat()} className="w-[60px] h-[60px] rounded-full bg-forest text-white border-none cursor-pointer flex items-center justify-center shadow-[0_4px_24px_rgba(26,58,40,0.35)] hover:scale-105 hover:shadow-[0_8px_32px_rgba(26,58,40,0.4)] transition-all relative z-10">
        {!isOpen && !welcomed && (
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber rounded-full border-2 border-white animate-pulse" />
        )}
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-7 h-7">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
