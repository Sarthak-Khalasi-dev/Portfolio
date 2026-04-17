/**
 * Navbar.js — Responsive navigation bar
 * - Logo / name on the left
 * - Nav links on the right (desktop)
 * - Hamburger menu for mobile
 * - Scroll-aware: adds backdrop blur + border after scrolling 60px
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import styles from '../styles/Navbar.module.css';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Education', to: 'education' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Certifications', to: 'certificates' },
  { label: 'Hackathons', to: 'hackathons' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Track scroll position to apply sticky styles */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="hero" smooth duration={600} offset={-80} className={styles.logo}>
          <img src="https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776427702/s_logo_ppghaa.png" alt="Sarthak Khalasi Logo" className={styles.logoImg} />
        </Link>

        {/* ---- Desktop links ---- */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                className={styles.link}
                activeClass={styles.linkActive}
                spy
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---- Mobile hamburger ---- */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* ---- Mobile menu overlay ---- */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
