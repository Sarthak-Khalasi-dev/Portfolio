import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategoriesData } from '../data/portfolioData';
import styles from '../styles/Skills.module.css';

// Flatten skills for diagram
const allSkills = skillCategoriesData.flatMap(cat => 
  cat.skills.map(skill => ({ ...skill, category: cat.category }))
);

const getProficiencyValue = (prof) => {
  if (prof === 'Advanced') return 90;
  if (prof === 'Intermediate') return 60;
  if (prof === 'Beginner') return 30;
  return 50;
};

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(
    allSkills.find(s => s.name === 'React') || allSkills[0]
  );
  
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveSkill(prev => {
        const currentIndex = allSkills.findIndex(s => s.name === prev.name);
        return allSkills[(currentIndex + 1) % allSkills.length];
      });
    }, 3000); // Rotates every 3 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlay]);
  
  const [radius, setRadius] = useState({ x: 220, y: 240 });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setRadius({ x: 140, y: 160 }); // Fit perfectly on small mobile
      } else if (window.innerWidth < 768) {
        setRadius({ x: 170, y: 190 }); // Tablet scaling
      } else {
        setRadius({ x: 220, y: 240 }); // Full desktop size
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-50px' });

  // Render Category Stats dynamically based on actual data
  const categoryStats = skillCategoriesData.map(cat => ({
    name: cat.category,
    count: cat.skills.length,
    color: cat.color
  }));

  return (
    <div 
      className={`section ${styles.skills}`} 
      id="skills"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="container">
        <motion.div
           ref={headerRef}
           className={styles.header}
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">My <span className="gradient-text">Tech Stack</span></h2>
        </motion.div>

        <div className={styles.dashboardGrid}>
          {/* LEFT: Dashboard details */}
          <div className={styles.detailsPanel}>
             <motion.div 
               key={activeSkill.name} // re-animate when skill changes
               className={styles.activeCard}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4 }}
             >
               <div className={styles.cardHeader}>
                  <div className={styles.iconBox} style={{ '--skill-color': activeSkill.color }}>
                     {activeSkill.icon}
                  </div>
                  <div className={styles.titleArea}>
                     <h3>{activeSkill.name}</h3>
                     <span style={{ color: activeSkill.color }}>{activeSkill.category}</span>
                  </div>
               </div>

               <p className={styles.description}>{activeSkill.description}</p>

               <div className={styles.proficiencySection}>
                 <div className={styles.proficiencyHeader}>
                    <span>Proficiency</span>
                    <span style={{ color: activeSkill.color }}>{activeSkill.proficiency}</span>
                 </div>
                 <div className={styles.barBg}>
                    <motion.div 
                      className={styles.barFill} 
                      style={{ backgroundColor: activeSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${getProficiencyValue(activeSkill.proficiency)}%` }}
                      transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
                    />
                 </div>
               </div>
             </motion.div>

             {/* Category Stats Summary */}
             <div className={styles.categoryStats}>
               {categoryStats.map((cat) => (
                 <div className={styles.statBox} key={cat.name}>
                    <div className={styles.statHeader}>
                      {/* Using the category's first skill icon or just text */}
                      {cat.name}
                    </div>
                    <div className={styles.statCount} style={{ color: cat.color }}>
                      {cat.count}
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* RIGHT: Circular Diagram */}
          <div className={styles.diagramPanel}>
              <svg className={styles.svgLines}>
                {allSkills.map((skill, index) => {
                   const angle = Math.PI - (index * (Math.PI / (allSkills.length - 1)));
                   const xPos = Math.cos(angle) * radius.x;
                   const yPos = Math.sin(angle) * radius.y;
                   const isSelected = activeSkill.name === skill.name;
                   return (
                     <line 
                       key={`line-${index}`}
                       x1="50%" y1="calc(100% - 40px)" 
                       x2={`calc(50% + ${xPos}px)`} y2={`calc(100% - ${40 + yPos}px)`} 
                       stroke={isSelected ? activeSkill.color : "rgba(200, 169, 110, 0.15)"} 
                       strokeWidth={isSelected ? "2" : "1"} 
                       style={{ transition: 'all 0.4s ease' }}
                     />
                   )
                })}
             </svg>
             
             {/* Orbiting Nodes */}
             {allSkills.map((skill, index) => {
                const angle = Math.PI - (index * (Math.PI / (allSkills.length - 1)));
                const xPos = Math.cos(angle) * radius.x;
                const yPos = Math.sin(angle) * radius.y;
                const isSelected = activeSkill.name === skill.name;
                
                return (
                  <motion.div 
                    key={skill.name}
                    className={`${styles.orbitNode} ${isSelected ? styles.orbitActive : ''}`}
                    style={{ 
                      '--node-color': skill.color,
                      left: '50%',
                      bottom: '40px' 
                    }}
                    onClick={() => setActiveSkill(skill)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                       opacity: 1, 
                       scale: isSelected ? 1.25 : 1,
                       x: xPos - 25, // offset half of width (50px / 2 = 25px)
                       y: -yPos + 25
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.03 }}
                  >
                    {skill.icon}
                    {isSelected && (
                       <span className={styles.orbitTooltip}>{skill.name}</span>
                    )}
                  </motion.div>
                )
             })}
             
             {/* Center Node (Always on top) */}
             <div className={styles.centerNode} style={{ '--skill-color': activeSkill.color }}>
                {activeSkill.icon}
                <span>{activeSkill.proficiency}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
