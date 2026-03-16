/**
 * TiltCard.js — CSS 3D perspective tilt on mouse move
 * Wrap any card content to get a premium 3D hover effect
 */
import React, { useRef, useCallback } from 'react';
import styles from '../styles/TiltCard.module.css';

export default function TiltCard({ children, className = '', intensity = 15 }) {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -intensity;
        const rotateY = ((x - cx) / cx) * intensity;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
        // Shift glare overlay
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;
        card.style.setProperty('--gx', `${gx}%`);
        card.style.setProperty('--gy', `${gy}%`);
    }, [intensity]);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }, []);

    return (
        <div
            ref={cardRef}
            className={`${styles.tiltCard} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div className={styles.glare} aria-hidden />
        </div>
    );
}
