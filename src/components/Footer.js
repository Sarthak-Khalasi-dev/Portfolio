/**
 * Footer.js — Site footer
 * - Branding + tagline
 * - Quick nav links
 * - Social icons
 * - Copyright line
 */
import React from 'react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import styles from '../styles/Footer.module.css';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
];

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/Sarthak-Khalasi-dev', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/sarthak-khalasi-73500439b/', label: 'LinkedIn' },
  { icon: <FiTwitter />, href: 'https://x.com/sarthak_2655', label: 'Twitter' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoAccent}>S</span>arthak Khalasi
            </span>
            <p className={styles.tagline}>
              Building elegant digital experiences, one line at a time.
            </p>
          </div>

          {/* Quick links */}
          <nav className={styles.nav}>
            <p className={styles.navTitle}>Navigation</p>
            <ul className={styles.navList}>
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} smooth duration={600} offset={-80} className={styles.navLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className={styles.socialsCol}>
            <p className={styles.navTitle}>Connect</p>
            <div className={styles.socialRow}>
              {socials.map(({ icon, href, label }) => (
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
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Sarthak Khalasi. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <FiHeart className={styles.heart} /> using React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
