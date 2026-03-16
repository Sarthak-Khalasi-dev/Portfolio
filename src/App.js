/**
 * App.js — Root component
 * Assembles all sections of the portfolio in order.
 * Uses framer-motion for page-level animations.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ position: 'relative' }}>
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
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="contact"><Contact /></section>
        </main>

        {/* Site footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
