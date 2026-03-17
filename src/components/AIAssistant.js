import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser, FiZap } from 'react-icons/fi';
import { scroller } from 'react-scroll';
import styles from '../styles/AIAssistant.module.css';

const KNOWLEDGE_BASE = {
  about: "I am Sarthak Khalasi, a first-year Computer Engineering student at Swaminarayan University. I'm a specialized MERN stack developer with a strong foundation in C/C++ and a passion for building premium web experiences.",
  skills: "My technical arsenal includes React, Node.js, Next.js, and Express on the backend. I use MongoDB for databases and am proficient in C and C++ for logic building. I also have an eye for UI/UX using Tailwind CSS and Framer Motion.",
  projects: "I've built several high-impact projects: \n1. **Meal Explorer** (API Integration) - A dynamic recipe discovery app.\n2. **Tissot Clone** - A luxury brand frontend clone.\n3. **Stripe Clone** - Pixel-perfect corporate UI recreation.\n4. **HubSpot Academy** - Educational portal frontend.",
  contact: "You can reach me via email at sarthakkhalasi1@gmail.com. I'm also active on LinkedIn and GitHub — you can find the links in the contact section at the bottom!",
  education: "I'm currently pursuing my B.Tech in Computer Engineering (2025-2029). I completed my Higher Secondary at Lancer Army school.",
  status: "I am currently open for internships and collaborative opportunities where I can apply my MERN stack skills and learn more about industry-grade software engineering."
};

const SUGGESTIONS = [
  "Tell me about Sarthak",
  "Show your projects",
  "What are your skills?",
  "How can I contact you?",
  "Tell me about your education"
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
      if (lowerText.includes('sarthak') || lowerText.includes('who are you')) response = KNOWLEDGE_BASE.about;
      if (lowerText.includes('skill')) response = KNOWLEDGE_BASE.skills;
      if (lowerText.includes('project') || lowerText.includes('work')) {
        response = KNOWLEDGE_BASE.projects;
        action = 'projects';
      }
      if (lowerText.includes('contact') || lowerText.includes('hire') || lowerText.includes('reach')) {
        response = KNOWLEDGE_BASE.contact;
        action = 'contact';
      }
      if (lowerText.includes('education') || lowerText.includes('college') || lowerText.includes('school')) {
        response = KNOWLEDGE_BASE.education;
        action = 'education';
      }
      if (lowerText.includes('internship') || lowerText.includes('job')) response = KNOWLEDGE_BASE.status;

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
