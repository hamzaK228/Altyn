import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: { label: string; action: () => void }[];
}

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: 'Здравствуйте! Я **Altyn AI**, ваш персональный финансовый ассистент. \n\nЯ могу помочь вам:\n- Проанализировать рынок золота\n- Подсказать удачный момент для покупки\n- Купить или продать золото (например, скажите: *"Купи мне 5г золота"*)\n\nЧем могу помочь сегодня?',
      timestamp: new Date(),
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    // Add user message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsg,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // Mock AI Response Logic
    setTimeout(() => {
      let aiResponse = 'Я анализирую ваш запрос...';
      let actions: Message['actions'] = undefined;

      const lowerMsg = userMsg.toLowerCase();
      if (lowerMsg.includes('почему') && (lowerMsg.includes('упал') || lowerMsg.includes('вырос'))) {
        aiResponse = 'Цена на золото сегодня изменилась из-за публикации данных по инфляции (CPI) в США. Инфляция оказалась ниже ожиданий, что привело к ослаблению доллара и росту спроса на защитные активы, такие как золото. \n\nНаш индекс настроений показывает **Умеренную жадность (65/100)**.';
      } else if (lowerMsg.includes('купи') || lowerMsg.includes('купить')) {
        aiResponse = 'Конечно. Вижу команду на покупку. Чтобы продолжить, подтвердите операцию. Текущий курс: **9,216 KGS / грамм**.';
        actions = [
          { label: 'Подтвердить покупку на 5000 сом', action: () => alert('Покупка выполнена (Мок)') },
          { label: 'Отмена', action: () => alert('Отменено') }
        ];
      } else if (lowerMsg.includes('портфель') || lowerMsg.includes('совет')) {
         aiResponse = 'Я проанализировал ваш портфель. Вы обычно покупаете золото, когда цена падает на 2-3%. Текущая просадка от пика составляет 1.5%. \n\n**Совет:** Возможно, стоит подождать чуть большей коррекции для оптимальной точки входа.';
      } else {
        aiResponse = 'Спасибо за вопрос! Как ИИ-ассистент, я постоянно учусь. Могу ли я помочь вам с прогнозами или анализом текущего портфеля?';
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        actions,
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-altyn hover:bg-altyn-light text-white rounded-full shadow-gold-glow flex items-center justify-center transition-colors z-50 group"
          >
            <Sparkles size={24} className="group-hover:animate-spin-slow" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] max-h-[85vh] bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Altyn AI</h3>
                  <p className="text-[10px] text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-500"
                >
                  {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-500"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                        msg.role === 'user' ? "bg-gray-200 dark:bg-white/10" : "bg-altyn/20 text-altyn-light"
                      )}>
                        {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                      </div>
                      
                      <div className="space-y-2">
                        <div className={cn(
                          "p-3 rounded-2xl text-sm whitespace-pre-wrap",
                          msg.role === 'user' 
                            ? "bg-gray-100 dark:bg-white/10 rounded-tr-sm" 
                            : "bg-altyn/5 border border-altyn/10 rounded-tl-sm text-slate-700 dark:text-gray-300"
                        )}>
                          {msg.content}
                        </div>
                        
                        {msg.actions && (
                          <div className="flex flex-col gap-2 mt-2">
                            {msg.actions.map((action, i) => (
                              <button
                                key={i}
                                onClick={action.action}
                                className={cn(
                                  "text-xs px-3 py-2 rounded-xl border transition-all text-left font-medium",
                                  i === 0 
                                    ? "bg-altyn text-white border-altyn hover:bg-altyn-light" 
                                    : "bg-transparent border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                                )}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-altyn/20 text-altyn-light flex items-center justify-center shrink-0">
                        <Loader2 size={12} className="animate-spin" />
                      </div>
                      <div className="p-3 bg-altyn/5 border border-altyn/10 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-altyn rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-altyn rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1.5 h-1.5 bg-altyn rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-[#0a0a0f] border-t border-gray-100 dark:border-white/5">
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Спросите ИИ..."
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-altyn resize-none h-12 flex items-center"
                      rows={1}
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-altyn text-white rounded-lg disabled:opacity-50 disabled:grayscale hover:bg-altyn-light transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-gray-400 mt-2">
                    Altyn AI может ошибаться. Проверяйте финансовую информацию.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
