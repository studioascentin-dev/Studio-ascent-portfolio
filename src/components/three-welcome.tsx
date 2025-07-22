"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function ThreeWelcome() {
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
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;


    // Camera Model
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);

    // Camera Body
    const bodyGeometry = new THREE.BoxGeometry(2.5, 1.5, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.8,
        roughness: 0.4,
    });
    const cameraBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    cameraGroup.add(cameraBody);

    // Camera Lens
    const lensGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const lensMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.9,
        roughness: 0.2,
    });
    const cameraLens = new THREE.Mesh(lensGeometry, lensMaterial);
    cameraLens.position.z = 0.5;
    cameraLens.rotation.x = Math.PI / 2;
    cameraGroup.add(cameraLens);

    // Lens Glass
    const glassGeometry = new THREE.CircleGeometry(0.4, 32);
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaff,
        metalness: 0.1,
        roughness: 0.1,
        transparent: true,
        opacity: 0.5
    });
    const lensGlass = new THREE.Mesh(glassGeometry, glassMaterial);
    lensGlass.position.z = 1.01;
    cameraGroup.add(lensGlass);
    
    // Viewfinder
    const viewfinderGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const viewfinder = new THREE.Mesh(viewfinderGeometry, bodyMaterial);
    viewfinder.position.set(-0.9, 0.9, 0);
    cameraGroup.add(viewfinder);

    // Button
    const buttonGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
    const buttonMaterial = new THREE.MeshStandardMaterial({
        color: 0xffa500,
        metalness: 0.5,
        roughness: 0.8,
    });
    const shutterButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    shutterButton.position.set(0.9, 0.8, 0);
    cameraGroup.add(shutterButton);


    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffa500, 20, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff7f50, 20, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xffd700, 10, 100);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);


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
      controls.update();
      cameraGroup.rotation.y += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if(currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose of Three.js objects
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      lensGeometry.dispose();
      lensMaterial.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      viewfinderGeometry.dispose();
      buttonGeometry.dispose();
      buttonMaterial.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-10" />;
}
