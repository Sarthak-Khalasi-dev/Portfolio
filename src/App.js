/**
 * App.js — Root component
 * Assembles all sections of the portfolio in order.
 * Uses framer-motion for page-level animations.
 */
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/Education';
import Capabilities from './components/Capabilities';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import PreLoader from './components/PreLoader';
import AIAssistant from './components/AIAssistant';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = React.useState(true);

  /* Initialize Lenis for smooth scrolling */
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    /* GSAP Section Reveals */
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App" style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          {loading && <PreLoader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        <div className="glow-aura glow-1" />
        <div className="glow-aura glow-2" />
        <CustomCursor />
        <ScrollProgress />
        {/* ---- Global 3D background — fixed behind ALL sections ---- */}
        <ThreeBackground
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Sticky navigation bar */}
        <Navbar />

        {/* Main sections — each has a unique id for scroll-to navigation */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          <section id="hero"><Hero /></section>
          <section id="about"><About /></section>
          <section id="capabilities"><Capabilities /></section>
          <section id="education"><Education /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="contact"><Contact /></section>
        </main>

        <AIAssistant />

        {/* Site footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
