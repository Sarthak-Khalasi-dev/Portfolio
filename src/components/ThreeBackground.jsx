/**
 * ThreeBackground.js — Vanilla Three.js particle/geometry canvas
 * Uses useEffect + useRef to manually manage the Three.js scene.
 * Compatible with React 18 (no @react-three/fiber needed).
 * Theme: dark gold (#c8a96e) + soft rose (#d4a0b5)
 */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ style }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        /* ---- Renderer ---- */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        /* ---- Scene + Camera ---- */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 10;

        /* ---- Particles field ---- */
        const particleCount = 1800;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 28;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xc8a96e,
            size: 0.055,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.65,
            depthWrite: false,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        /* ---- Wireframe torus-knot ---- */
        const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 16);
        const torusKnotMat = new THREE.MeshBasicMaterial({
            color: 0xc8a96e,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });
        const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
        torusKnot.position.set(4.5, 0, -6);
        scene.add(torusKnot);

        /* ---- Wireframe icosahedron ---- */
        const icoGeo = new THREE.IcosahedronGeometry(1.4, 0);
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0xd4a0b5,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        ico.position.set(-5, 1.5, -5);
        scene.add(ico);

        /* ---- Floating rings ---- */
        const makeRing = (color, pos, opacity) => {
            const geo = new THREE.TorusGeometry(0.9, 0.03, 16, 80);
            const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(...pos);
            scene.add(mesh);
            return mesh;
        };
        const ring1 = makeRing(0xc8a96e, [2, -2, -3], 0.25);
        const ring2 = makeRing(0xd4a0b5, [-3, 2, -4], 0.20);
        const ring3 = makeRing(0xc8a96e, [0, 3, -7], 0.15);

        /* ---- Animation loop ---- */
        let animId;
        const clock = new THREE.Clock();
        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            particles.rotation.y = t * 0.04;
            particles.rotation.x = Math.sin(t * 0.02) * 0.08;

            torusKnot.rotation.x = t * 0.18;
            torusKnot.rotation.y = t * 0.12;
            torusKnot.position.y = Math.sin(t * 0.5) * 0.4;

            ico.rotation.x = t * 0.22;
            ico.rotation.z = t * 0.15;
            ico.position.y = 1.5 + Math.cos(t * 0.4) * 0.5;

            ring1.rotation.x = t * 0.3;
            ring1.rotation.y = t * 0.18;
            ring1.position.y = -2 + Math.sin(t * 0.6) * 0.3;

            ring2.rotation.x = t * 0.2;
            ring2.rotation.y = t * 0.12;
            ring2.position.y = 2 + Math.cos(t * 0.5) * 0.3;

            ring3.rotation.x = t * 0.15;
            ring3.rotation.y = t * 0.09;

            renderer.render(scene, camera);
        };
        animate();

        /* ---- Resize handler ---- */
        const handleResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        /* ---- Cleanup ---- */
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
            renderer.dispose();
            particleGeo.dispose();
            particleMat.dispose();
            torusKnotGeo.dispose();
            torusKnotMat.dispose();
            icoGeo.dispose();
            icoMat.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                ...style,
            }}
        />
    );
}
