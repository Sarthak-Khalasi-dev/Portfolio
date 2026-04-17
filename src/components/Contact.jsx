/**
 * Contact.js — Contact / reach out section
 * Uses Formspree for email delivery — NO account or API key required.
 * Messages go directly to sarthakkhalasi1@gmail.com
 *
 * To activate:
 *  1. Submit a form once. You will receive an email asking to activate the form.
 *  2. After confirming, all subsequent messages will arrive at your email.
 */
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiMapPin, FiClock, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import styles from '../styles/Contact.module.css';

/* ── FormSubmit endpoint ── */
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/sarthakkhalasi1@gmail.com';

const contactInfo = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'sarthakkhalasi1@gmail.com',
    href: 'mailto:sarthakkhalasi1@gmail.com',
  },
  {
    icon: <FiMail />,
    label: 'LinkedIn',
    value: 'Sarthak Khalasi',
    href: 'https://www.linkedin.com/in/sarthak-khalasi-73500439b/',
  },
  {
    icon: <FiMail />,
    label: 'GitHub',
    value: 'Sarthak-Khalasi-dev',
    href: 'https://github.com/Sarthak-Khalasi-dev',
  },
  {
    icon: <FiMapPin />,
    label: 'Location',
    value: 'Gujarat, India',
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  /* Field-level validation */
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    setStatus('sending');
    try {
      // Replace these placeholders with your actual EmailJS credentials
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        to_name: 'Sarthak Khalasi',
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      };

      // We dynamically import emailjs to keep bundle size small if this component isn't rendered
      const emailjs = await import('@emailjs/browser');
      
      const res = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      if (res.status === 200) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  }

  return (
    <div className={`section ${styles.contact}`}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label"><FiMail /> Contact</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* ---- Info cards ---- */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className={styles.infoText}>
              I'm currently open to new opportunities — freelance, full-time, or interesting
              collaborations. If you have a project that needs a passionate developer, let's talk!
            </p>

            <div className={styles.infoCards}>
              {contactInfo.map(({ icon, label, value, href }) => (
                <div key={label} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{icon}</span>
                  <div>
                    <span className={styles.infoLabel}>{label}</span>
                    {href
                      ? <a href={href} className={styles.infoValue}>{value}</a>
                      : <span className={styles.infoValue}>{value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <blockquote className={styles.quote}>
              "The best code is the code that hasn't been written yet — but the second best is
              code you're proud to ship."
            </blockquote>
          </motion.div>

          {/* ---- Contact form ---- */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Row: Name + Email */}
              <div className={styles.row}>
                <div className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}>
                  <label className={styles.label} htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}>
                  <label className={styles.label} htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              {/* Message */}
              <div className={`${styles.field} ${errors.message ? styles.fieldError : ''}`}>
                <label className={styles.label} htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.textarea}`}
                />
                {errors.message && <span className={styles.error}>{errors.message}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={status === 'sending' || status === 'sent'}
              >
                {status === 'sending' && <><span className={styles.spinner} /> Sending...</>}
                {status === 'sent' && <><FiCheck /> Message Sent!</>}
                {status === 'error' && <><FiAlertCircle /> Try Again</>}
                {!status && <><FiSend /> Send Message</>}
              </button>

              {status === 'sent' && (
                <motion.p
                  className={styles.successMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✨ Thank you! Your message has been delivered. I'll reply within 24 hours!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className={styles.errorMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ⚠️ Could not send. Please email me directly at{' '}
                  <a href="mailto:sarthakkhalasi1@gmail.com" style={{ color: 'var(--accent-primary)' }}>
                    sarthakkhalasi1@gmail.com
                  </a>
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
