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
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import styles from '../styles/Hero.module.css';

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
      <motion.div
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p variants={itemVariants} className={styles.greeting}>
          <span className={styles.wave}>👋</span> Hi there, I'm
        </motion.p>

        {/* Name */}
        <motion.h1 variants={itemVariants} className={styles.name}>
          Sarthak <span className={styles.nameAccent}>Khalasi</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div variants={itemVariants} className={styles.roleWrap}>
          <span className={styles.roleStatic}>I'm a </span>
          <span className={styles.role}>{displayed}</span>
          <span className={styles.cursor}>|</span>
        </motion.div>

        {/* Short bio */}
        <motion.p variants={itemVariants} className={styles.bio}>
          I craft elegant digital experiences — from pixel-perfect interfaces to
          robust backend systems. Passionate about clean code and meaningful products.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className={styles.ctas}>
          <Link to="projects" smooth duration={700} offset={-80}>
            <button className={`btn btn-primary ${styles.btnHero}`}>
              View My Work
            </button>
          </Link>
          <Link to="contact" smooth duration={700} offset={-80}>
            <button className={`btn btn-outline ${styles.btnHero}`}>
              Get In Touch
            </button>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className={styles.socials}>
          {[
            { icon: <FiGithub />, href: 'https://github.com/Sarthak-Khalasi-dev', label: 'GitHub' },
            { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/sarthak-khalasi-73500439b/', label: 'LinkedIn' },
            { icon: <FiTwitter />, href: 'https://x.com/sarthak_2655', label: 'Twitter' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={styles.socialLink}
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </motion.div>

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
