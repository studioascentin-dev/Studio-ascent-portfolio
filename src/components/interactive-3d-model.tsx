"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function Interactive3DModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Geometry & Material
    const icoGeometry = new THREE.IcosahedronGeometry(2, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
        color: 0x9333ea, // purple-600
        metalness: 0.7,
        roughness: 0.2,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    const wireframeMaterial = new THREE.MeshStandardMaterial({
        color: 0xe879f9, // fuchsia-400
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const wireframe = new THREE.Mesh(icoGeometry, wireframeMaterial);
    wireframe.scale.set(1.001, 1.001, 1.001);
    scene.add(wireframe);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333ea, 30, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xdb2777, 30, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x3b82f6, 15, 100);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
        const { left, top, width, height } = currentMount.getBoundingClientRect();
        mouseX = ((event.clientX - left) / width) * 2 - 1;
        mouseY = -((event.clientY - top) / height) * 2 + 1;
    };
    currentMount.addEventListener('mousemove', handleMouseMove);


    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      // Slow down auto-rotation when user is interacting
      controls.autoRotate = !controls.manualStart;
      
      // Subtle mouse follow effect
      icosahedron.rotation.y += (mouseX * 0.5 - icosahedron.rotation.y) * 0.02;
      icosahedron.rotation.x += (mouseY * 0.5 - icosahedron.rotation.x) * 0.02;

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if(currentMount) {
        currentMount.removeEventListener('mousemove', handleMouseMove);
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose of Three.js objects
      icoGeometry.dispose();
      icoMaterial.dispose();
      wireframeMaterial.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
