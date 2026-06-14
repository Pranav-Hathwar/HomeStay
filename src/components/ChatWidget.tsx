import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react';
import { siteConfig, whatsappUrl } from '../data/site';
import { INTENTS, GREETING, FALLBACK, matchIntent } from '../data/chatbot';

type Msg = { from: 'bot' | 'user'; text: string; handoff?: boolean };

const CHIPS = INTENTS.filter((i) => i.chip);

export default function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [msgs, open, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open]);

  function respond(userText: string) {
    const intent = matchIntent(userText);
    setMsgs((m) => [
      ...m,
      { from: 'user', text: userText },
      intent
        ? { from: 'bot', text: intent.answer, handoff: intent.handoff }
        : { from: 'bot', text: FALLBACK, handoff: true },
    ]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setInput('');
    respond(t);
  }

  return (
    <>
      {/* Launcher — sits above the mobile sticky bar, clear of it on desktop */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        className="glass-strong fixed bottom-24 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full text-gold-bright shadow-glow lg:bottom-6 lg:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-ink bg-gold-bright" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
          />
        )}
        {open && (
          <motion.div
            key="chat-panel"
            role="dialog"
            aria-label="Chat with Mungaru Homestays"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="glass-strong fixed bottom-40 right-4 z-[70] flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[28px] shadow-glow lg:bottom-24 lg:right-6"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-line/40 bg-moss/40 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold-bright">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg text-fog">{siteConfig.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-dim">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Typically replies on WhatsApp
                </div>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-sm bg-gold/20 text-fog'
                        : 'rounded-bl-sm border border-line/50 bg-card/80 text-fog/90'
                    }`}
                  >
                    {m.text}
                    {m.handoff && (
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2.5 flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-3 py-2 text-xs font-semibold text-gold-bright transition hover:bg-gold/25"
                      >
                        Chat on WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-line/40 px-4 pt-3">
              {CHIPS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => respond(c.label)}
                  className="rounded-full border border-line/60 bg-ink/30 px-3 py-1.5 text-xs text-dim transition hover:border-gold/40 hover:text-fog"
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the stay…"
                aria-label="Type your message"
                className="flex-1 rounded-full border border-line/60 bg-moss/40 px-4 py-2.5 text-sm text-fog outline-none transition placeholder:text-faint focus:border-gold/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-gold/20 text-gold-bright transition hover:bg-gold/30"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
