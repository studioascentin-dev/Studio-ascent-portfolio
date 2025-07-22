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
    camera.position.set(0, 1, 5);

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
    controls.autoRotateSpeed = 0.5;
    controls.target.set(0, 1, 0);

    // Material
    const material = new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        metalness: 0.8,
        roughness: 0.2,
    });
    
    // Human Model Group
    const human = new THREE.Group();

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
    head.position.y = 2.5;

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.5), material);
    torso.position.y = 1.25;

    // Arms
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.1, 1.2), material);
    leftArm.position.set(-0.75, 1.5, 0);
    leftArm.rotation.z = Math.PI / 8;
    
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.1, 1.2), material);
    rightArm.position.set(0.75, 1.5, 0);
    rightArm.rotation.z = -Math.PI / 8;
    
    // Legs
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 1.5), material);
    leftLeg.position.set(-0.3, -0.25, 0);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 1.5), material);
    rightLeg.position.set(0.3, -0.25, 0);
    
    human.add(head);
    human.add(torso);
    human.add(leftArm);
    human.add(rightArm);
    human.add(leftLeg);
    human.add(rightLeg);
    
    scene.add(human);


    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333ea, 50, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xdb2777, 50, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x3b82f6, 25, 100);
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
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Slow down auto-rotation when user is interacting
      controls.autoRotate = !controls.manualStart;
      
      // Subtle mouse follow effect
      human.rotation.y += (mouseX * 0.5 - human.rotation.y) * 0.02;
      
      // Make the model bob up and down
      human.position.y = Math.sin(elapsedTime * 2) * 0.1;

      // Make the light pulse
      pointLight1.intensity = Math.sin(elapsedTime * 2) * 20 + 40;
      pointLight2.intensity = Math.cos(elapsedTime * 1.5) * 20 + 40;

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
      // Dispose geometries
      (head.geometry as THREE.SphereGeometry).dispose();
      (torso.geometry as THREE.BoxGeometry).dispose();
      (leftArm.geometry as THREE.CylinderGeometry).dispose();
      (rightArm.geometry as THREE.CylinderGeometry).dispose();
      (leftLeg.geometry as THREE.CylinderGeometry).dispose();
      (rightLeg.geometry as THREE.CylinderGeometry).dispose();

      material.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
