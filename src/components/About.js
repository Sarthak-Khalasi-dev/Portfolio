/**
 * About.js — Personal introduction section
 * - Animated profile avatar with decorative ring
 * - Short bio text with highlighted keywords
 * - Stats bar (projects, experience, technologies)
 * - Social/contact quick links
 * - Framer-motion scroll-triggered animations
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import styles from '../styles/About.module.css';

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '0+', label: 'Years Experience' },
  { value: '15+', label: 'Technologies Used' },
];

function AnimatedSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>

          {/* ---- Left: Avatar + stats ---- */}
          <AnimatedSection className={styles.avatarCol}>
            {/* Profile image placeholder (replace src with real photo) */}
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing} />
              <div className={styles.avatar}>
                {/* Profile Photo */}
                <img 
                  src="/assets/profile.png" 
                  alt="Sarthak Khalasi" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                />
              </div>
              {/* Decorative floating badge */}
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                Available for work
              </div>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {stats.map(({ value, label }) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ---- Right: Bio text ---- */}
          <div className={styles.textCol}>
            <AnimatedSection delay={0.1}>
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Building things for the <span className="gradient-text">web</span>
              </h2>
              <div className="divider" />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className={styles.bio}>
                Hey! I'm <strong>Sarthak Khalasi</strong> — a passionate full-stack developer
                based in India. I love turning complex problems into simple, beautiful, and
                intuitive digital solutions.
              </p>
              <p className={styles.bio}>
                My journey into tech started with pure curiosity, tinkering with HTML pages
                and wondering how the internet worked. That curiosity grew into a deep love
                for software engineering — from crafting pixel-perfect UIs to designing
                scalable backend architectures.
              </p>
              <p className={styles.bio}>
                When I'm not coding, you'll find me exploring design systems, contributing
                to open-source, or writing about software on my blog. I'm always excited
                about projects that{' '}
                <em className={styles.highlight}>make a real difference</em> in people's lives.
              </p>
            </AnimatedSection>

            {/* Info grid */}
            <AnimatedSection delay={0.3} className={styles.infoGrid}>
              {[
                { label: 'Name', value: 'Sarthak Khalasi' },
                { label: 'Email', value: 'sarthak@example.com' },
                { label: 'Location', value: 'India' },
                { label: 'Study', value: 'B.Tech — CS & Engineering' },
              ].map(({ label, value }) => (
                <div key={label} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{label}</span>
                  <span className={styles.infoValue}>{value}</span>
                </div>
              ))}
            </AnimatedSection>

            {/* Quick links */}
            <AnimatedSection delay={0.4} className={styles.actions}>
              <a
                href="/resume.pdf"
                download
                className="btn btn-primary"
              >
                <FiDownload /> Download Resume
              </a>
              <div className={styles.socialRow}>
                {[
                  { icon: <FiGithub />, href: 'https://github.com/Sarthak-Khalasi-dev', label: 'GitHub' },
                  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/sarthak-khalasi-73500439b/', label: 'LinkedIn' },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={styles.socialIcon}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
