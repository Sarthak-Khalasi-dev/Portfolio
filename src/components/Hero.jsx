/**
 * Hero.js — Full-viewport landing section with 3D Three.js background
 * Features:
 * - THREE.js floating particles + wireframe geometry (ThreeBackground)
 * - Animated name reveal using framer-motion
 * - Animated subtitle with typewriter-style word cycling
 * - CTA buttons (scroll to projects / contact)
 * - Decorative grid + radial glow background
 * - Floating scroll indicator at the bottom
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiArrowDown } from 'react-icons/hi';

import Magnetic from './Magnetic';
import styles from '../styles/Hero.module.css';
import gsap from 'gsap';

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Open Source Contributor', 'Problem Solver'];

/* Framer-motion variants */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  /* Typewriter effect */
  useEffect(() => {
    const current = roles[roleIndex];
    let timer;
    if (typing) {
      if (charIndex < current.length) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 60);
      } else {
        timer = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 35);
      } else {
        setRoleIndex(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timer);
  }, [charIndex, typing, roleIndex]);

  /* GSAP Entrance Animation */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
    tl.fromTo(`.${styles.name}`, { x: -100, opacity: 0 }, { x: 0, opacity: 1, delay: 0.5 })
      .fromTo(`.${styles.nameAccent}`, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
      .fromTo(`.${styles.greeting}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=1')
      .fromTo(`.${styles.ctas}`, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(1.7)' }, '-=1');
  }, []);

  return (
    <div className={styles.hero}>
      {/* ---- Decorative background ---- */}
      <div className={styles.grid} aria-hidden />
      <div className={styles.glow} aria-hidden />
      <div className={styles.glow2} aria-hidden />

      {/* ---- 3D floating ring decoration ---- */}
      <div className={styles.ring3d} aria-hidden>
        <div className={styles.ring3dInner} />
      </div>

      {/* ---- Content ---- */}
      <div className={`container ${styles.innerContent}`}>
        <motion.div
          className={styles.textContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p variants={itemVariants} className={styles.greeting}>
            <span className={styles.accentBar} />
            Hello, I am
          </motion.p>

          {/* Name */}
          <motion.h1 variants={itemVariants} className={styles.name}>
            Sarthak <br />
            <span className={styles.nameAccent}>Khalasi</span>
          </motion.h1>

          {/* Animated role */}
          <motion.div variants={itemVariants} className={styles.roleWrap}>
            <span className={styles.roleStatic}>I'm a </span>
            <span className={styles.role}>{displayed}</span>
            <span className={styles.cursor}>|</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className={styles.ctas} style={{ marginTop: '2rem' }}>
            <Magnetic>
              <Link to="projects" smooth duration={700} offset={-80}>
                <button className={`btn btn-primary ${styles.btnHero}`}>
                  View Projects
                </button>
              </Link>
            </Magnetic>
            <Magnetic>
              <button 
                className={`btn btn-outline ${styles.btnHero} ${styles.btnHeroResume}`}
                onClick={(e) => { 
                  e.preventDefault(); 
                  window.open('https://drive.google.com/file/d/1glv38S0foYU_XBmK3HJfzhjobf2NOxEz/view', '_blank'); 
                }}
              >
                Resume
              </button>
            </Magnetic>
          </motion.div>


        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className={styles.imageContent}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.avatarWrap}>
            <div className={styles.avatarRing} />
            <div className={styles.avatar}>
              <img 
                src="/assets/profile.png" 
                alt="Sarthak Khalasi" 
              />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Open to Work
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <Link to="about" smooth duration={600} offset={-80}>
          <HiArrowDown className={styles.scrollArrow} />
        </Link>
      </motion.div>
    </div>
  );
}
