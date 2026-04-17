import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser, FiZap } from 'react-icons/fi';
import { scroller } from 'react-scroll';
import styles from '../styles/AIAssistant.module.css';

const KNOWLEDGE_BASE = {
  about: "I am Sarthak Khalasi, a specialized MERN stack developer with a strong foundation in C/C++ and a passion for building premium, responsive web experiences. You can find me working on full-stack projects or building flawless frontend clones.",
  skills: "My technical arsenal is heavily focused on the modern web: React, Node.js, Express, and MongoDB. I focus purely on clean logic, and I have a sharp eye for UI/UX using Tailwind CSS and Framer Motion for animations.",
  projects: "I specialize in building high-fidelity clones and interactive apps! Key projects include: \n1. **Netflix Clone** (Full-featured UI)\n2. **Nike Clone** (Premium visual layout)\n3. **Tissot Clone** (Luxury responsive design)\n4. **Stripe Clone** (Corporate UI)\n5. **Meal Explorer** (Dynamic API App)",
  achievements: "I've recently participated in the **OdooXIndus Hackathon** where we built a comprehensive Restaurant POS system. I hold certifications in **Prompt Engineering** and **Web Development** from Sololearn, and successfully qualified for Hack Energy 2.0!",
  contact: "You can reach me via email at sarthakkhalasi1@gmail.com. I'm also active on LinkedIn, Twitter, LeetCode, and GitHub — you can find all my direct links in the contact footer!",
  education: "I'm currently pursuing Computer Engineering and constantly elevating my technical skills through practical, hands-on development.",
  status: "I am actively open for collaborations, freelance work, and opportunities to apply my MERN stack skills and deliver industry-grade software solutions."
};

const SUGGESTIONS = [
  "What are your main skills?",
  "Show me your best projects",
  "Any hackathons or certs?",
  "How can I contact you?",
  "What is your current status?"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hello! I'm Sarthak's virtual assistant. Ask me anything about his work or skills! 👋" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI behavior
    setTimeout(() => {
      let response = "I'm not sure about that specifically, but Sarthak is a high-potential developer skilled in MERN stack. Try asking about his projects or skills!";
      let action = null;

      const lowerText = userText.toLowerCase();
      if (lowerText.includes('sarthak') || lowerText.includes('who are you') || lowerText.includes('about')) response = KNOWLEDGE_BASE.about;
      if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('stack')) response = KNOWLEDGE_BASE.skills;
      if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('built')) {
        response = KNOWLEDGE_BASE.projects;
        action = 'projects';
      }
      if (lowerText.includes('contact') || lowerText.includes('hire') || lowerText.includes('reach') || lowerText.includes('email')) {
        response = KNOWLEDGE_BASE.contact;
        action = 'contact';
      }
      if (lowerText.includes('education') || lowerText.includes('college') || lowerText.includes('school')) {
        response = KNOWLEDGE_BASE.education;
        action = 'about';
      }
      if (lowerText.includes('hackathon') || lowerText.includes('certif') || lowerText.includes('achiev')) {
         response = KNOWLEDGE_BASE.achievements;
         action = 'hackathons';
      }
      if (lowerText.includes('internship') || lowerText.includes('job') || lowerText.includes('status')) response = KNOWLEDGE_BASE.status;

      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);

      if (action) {
        scroller.scrollTo(action, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -80
        });
      }
    }, 1000);
  };

  return (
    <div className={styles.assistantWrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <FiCpu className={styles.headerIcon} />
                <span className={styles.headerText}>Portfolio Assistant</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className={styles.messages} ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`${styles.message} ${styles[msg.type]}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.ai}`}>
                  <span className={styles.typingDot}>...</span>
                </div>
              )}
            </div>

            <div className={styles.suggestions}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className={styles.suggestion} onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>

            <form className={styles.inputArea} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <input
                type="text"
                className={styles.input}
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className={styles.sendBtn}>
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiZap /> : <FiMessageSquare />}
        {!isOpen && <span className={styles.notification} />}
      </button>
    </div>
  );
}
