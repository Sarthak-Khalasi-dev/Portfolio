import {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5,
  SiNodedotjs, SiMongodb, SiFirebase, SiMysql,
  SiGit, SiGithub, SiPostman, SiVercel, SiNetlify, SiDocker
} from 'react-icons/si';
import { FiCode } from 'react-icons/fi';

export const projectsData = [

  {
    id: 4,
    title: 'Meal Explorer',
    description: 'Dynamic recipe discovery app fetching culinary data from an API. Search and explore diverse global cuisines.',
    tags: ['React', 'REST API', 'JavaScript'],
    category: 'Frontend Projects',
    github: 'https://github.com/Sarthak-Khalasi-dev/Meal-Explorer',
    live: 'https://mealexplorervlone.netlify.app',
    image: '/assets/meal-explorer.png',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a2e1a 50%, #0a2d0a 100%)',
    accentColor: '#68d391',
    featured: true,
    keyLearnings: 'Learned efficient API state management and asynchronous data fetching in React.'
  },
  {
    id: 1,
    title: 'Tissot Clone',
    description: 'A meticulously crafted clone of the Tissot watch website, featuring a responsive design and smooth user interface.',
    tags: ['React', 'CSS', 'Frontend'],
    category: 'Clones',
    github: 'https://github.com/Sarthak-Khalasi-dev/tissot',
    live: 'https://tissotc.netlify.app',
    image: '/assets/tissot-clone.png',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accentColor: '#61dafb',
    featured: true,
    keyLearnings: 'Mastered responsive layouts and complex CSS animations for premium brand aesthetics.'
  },
  {
    id: 2,
    title: 'Stripe Clone',
    description: 'A pixel-perfect replica of the Stripe platform. It showcases advanced CSS techniques and intricate animations.',
    tags: ['React', 'CSS Animations', 'UI/UX'],
    category: 'Clones',
    github: 'https://github.com/Sarthak-Khalasi-dev/stripe-clone',
    live: 'https://stripe-clown.netlify.app',
    image: '/assets/stripe-clone.png',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    accentColor: '#c8a96e',
    featured: false,
    keyLearnings: 'Deep dive into Framer Motion and layered CSS for clean, corporate-grade interactivity.'
  },

  {
    id: 9,
    title: 'Nike Clone',
    description: 'A pixel-perfect UI clone of an electric Nike concept, featuring vibrant colors, smooth micro-interactions, and a premium aesthetic.',
    tags: ['React', 'CSS', 'UI/UX'],
    category: 'Clones',
    github: 'https://github.com/Sarthak-Khalasi-dev',
    live: 'https://nikeclone01.netlify.app/',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776420243/Screenshot_2026-04-17_153335_kbyqij.png',
    gradient: 'linear-gradient(135deg, #0f4c81 0%, #1e6fa3 50%, #2087c9 100%)',
    accentColor: '#4db8ff',
    featured: true,
    keyLearnings: 'Focused on crafting a dynamic, high-end visual experience with rich color palettes and interactive product displays.'
  },
  {
    id: 10,
    title: 'Netflix Clone',
    description: 'A full-featured clone of the Netflix streaming interface with dynamic content loading, immersive movie displays, and a sleek dark mode UI.',
    tags: ['React', 'CSS', 'API Integration'],
    category: 'Clones',
    github: 'https://github.com/Sarthak-Khalasi-dev/netflix-clone',
    live: 'https://roaring-llama-9f6265.netlify.app/',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776421507/Screenshot_2026-04-17_155313_mddf6b.png',
    gradient: 'linear-gradient(135deg, #000000 0%, #430d0d 50%, #e50914 100%)',
    accentColor: '#e50914',
    featured: true,
    keyLearnings: 'Mastered fetching dynamic data from endpoints and structuring deeply nested, overlapping UI components for a premium streaming feel.'
  }
];

export const hackathonsData = [
  {
    id: 101,
    title: 'OdooXIndus Hackathon',
    level: 'Organised by OdooXIndus',
    type: 'offline',
    problem: 'Build a Restaurant Point-of-Sale (POS) system capable of handling end-to-end order management, payment processing, and kitchen coordination — all within a single integrated platform.',
    solution: 'We developed a fully integrated POS system using Odoo\'s framework that streamlined order intake, connected directly to the kitchen display, and handled multiple payment methods. The system featured real-time order tracking, auto-updating kitchen tickets, split-bill support, and a manager dashboard for analytics and inventory management.',
    outcome: 'Participant',
    badge: 'Participants',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776416544/Screenshot_2026-04-06_110930_aoa3hm.png',
    images: [
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776416544/Screenshot_2026-04-06_110930_aoa3hm.png',
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414031/odooXindus_certificate_j6cvtf.jpg',
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776427038/hack-1_hwtj5p.jpg',
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776427058/hack-2_ynuxxk.jpg'
    ],
    github: 'https://github.com/dhyeyptl10/POS---INDUS',
    demo: '#',
  },
  {
    id: 102,
    title: 'Hack Energy 2.0',
    level: 'Organised by HackGyanVerse',
    type: 'online',
    problem: 'Design an innovative solution that leverages technology to address energy consumption challenges, promote sustainable energy practices, and contribute to a greener future.',
    solution: 'We proposed an AI-powered smart energy monitoring dashboard that tracks real-time electricity usage across households, identifies high-consumption patterns using ML algorithms, and suggests actionable recommendations. The platform also gamifies energy saving by rewarding eco-friendly behaviour with redeemable points.',
    outcome: 'Qualifier',
    badge: 'Qualifier',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414446/Screenshot_2026-04-17_135634_krrvre.png',
    images: [
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414446/Screenshot_2026-04-17_135634_krrvre.png',
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776427038/hack-1_hwtj5p.jpg',
      'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776427058/hack-2_ynuxxk.jpg'
    ],
    github: '',
    demo: '#',
  },
];

export const skillCategoriesData = [
  {
    category: 'Frontend',
    color: '#61dafb',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61dafb', proficiency: 'Advanced', description: 'Building complex interactive user interfaces with modern hooks and state management.' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e', proficiency: 'Advanced', description: 'Deep understanding of ES6+, closures, and asynchronous programming.' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4', proficiency: 'Advanced', description: 'Rapid UI prototyping and creating responsive scalable design systems.' },
      { name: 'HTML/CSS', icon: <SiHtml5 />, color: '#e34f26', proficiency: 'Advanced', description: 'Semantic markups, accessibility standards, and robust CSS architectures.' },
    ],
  },
  {
    category: 'Backend',
    color: '#68d391',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#68a063', proficiency: 'Intermediate', description: 'Building scalable backend APIs and event-driven architecture.' },
    ],
  },
  {
    category: 'Database',
    color: '#f6ad55',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248', proficiency: 'Intermediate', description: 'NoSQL document structures and complex aggregation pipelines.' },
    ],
  },
  {
    category: 'Tools & DevOps',
    color: '#b794f4',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#f05032', proficiency: 'Advanced', description: 'Version control, branching strategies, and team collaboration.' },
      { name: 'GitHub', icon: <SiGithub />, color: '#333333', proficiency: 'Advanced', description: 'Repository management, continuous integration, and actions.' },
      { name: 'Postman', icon: <SiPostman />, color: '#ff6c37', proficiency: 'Advanced', description: 'API testing, documentation, and endpoint visualization.' },
    ],
  },
];

export const certificatesData = [
  {
    id: 197,
    title: 'Web Development',
    issuer: 'Sololearn',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776415274/webdevelop_certi_k9ftlp.jpg',
    link: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776415274/webdevelop_certi_k9ftlp.jpg',
    date: '2026',
    verified: true,
    description: 'Earned the Web Development certification, demonstrating knowledge and applied skills in crafting modern full-stack web experiences.'
  },
  {
    id: 198,
    title: 'Prompt Engineering',
    issuer: 'Sololearn',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414969/Screenshot_2026-04-17_140516_zeyabw.png',
    link: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414969/Screenshot_2026-04-17_140516_zeyabw.png',
    date: '2026',
    verified: true,
    description: 'Earned the Prompt Engineering certification, demonstrating expertise in crafting optimized AI framework instructions.'
  },
  {
    id: 199,
    title: 'Hack Energy 2.0 Qualifier',
    issuer: 'HackGyanVerse',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414446/Screenshot_2026-04-17_135634_krrvre.png',
    link: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414446/Screenshot_2026-04-17_135634_krrvre.png',
    date: '2026',
    verified: true,
    description: 'Awarded for successfully qualifying the PPT Round of Hack Energy 2.0.'
  },
  {
    id: 200,
    title: 'Odoo x Indus Hackathon \'26',
    issuer: 'Odoo & Indus University',
    image: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414031/odooXindus_certificate_j6cvtf.jpg',
    link: 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776414031/odooXindus_certificate_j6cvtf.jpg', 
    date: 'April 2026',
    verified: true,
    description: 'Participation in the Odoo x Indus University Hackathon organized by CSE Department, IITE.'
  }
];
