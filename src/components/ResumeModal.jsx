import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume-modal', handleOpen);
    return () => window.removeEventListener('open-resume-modal', handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', 
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)'
        }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0}} 
            animate={{scale: 1, opacity: 1}} 
            exit={{scale: 0.9, opacity:0}} 
            style={{
              width: '90%', height: '90%', background: '#111', 
              borderRadius: '12px', overflow: 'hidden', position: 'relative',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button 
              onClick={() => setIsOpen(false)} 
              style={{
                position: 'absolute', top: '15px', right: '15px', 
                background: 'rgba(255,255,255,0.1)', color: 'white', 
                border: 'none', borderRadius: '50%', padding: '10px', 
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <FiX size={24} />
            </button>
            {/* The resume should be hosted or placed in public/assets. 
                Using a generic filler PDF source. You should replace this with a local PDF. */}
            <iframe 
              src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" 
              width="100%" 
              height="100%" 
              style={{border: 'none'}}
              title="Resume Viewer"
            ></iframe>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
