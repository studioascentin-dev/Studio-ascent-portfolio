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
    camera.position.set(0, 0, 5);

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
    controls.target.set(0, 0, 0);

    // Material
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x9333ea, // primary color
        metalness: 0.7,
        roughness: 0.3,
    });
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
    
    // Face Group
    const face = new THREE.Group();

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.5, 64, 64), headMaterial);
    face.add(head);

    // Eyes
    const eyeGroup = new THREE.Group();
    const eyeRadius = 0.4;
    const pupilRadius = 0.2;

    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(eyeRadius, 32, 32), eyeMaterial);
    leftEye.position.set(-0.6, 0.2, 1.2);
    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(pupilRadius, 32, 32), pupilMaterial);
    leftPupil.position.z = eyeRadius;
    leftEye.add(leftPupil);
    
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(eyeRadius, 32, 32), eyeMaterial);
    rightEye.position.set(0.6, 0.2, 1.2);
    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(pupilRadius, 32, 32), pupilMaterial);
    rightPupil.position.z = eyeRadius;
    rightEye.add(rightPupil);

    eyeGroup.add(leftEye);
    eyeGroup.add(rightEye);
    face.add(eyeGroup);
    
    scene.add(face);


    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333ea, 50, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xdb2777, 50, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x3b82f6, 30, 100);
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
      
      controls.autoRotate = !controls.manualStart;
      
      // Face and eye look at cursor
      face.rotation.y += (mouseX * 0.3 - face.rotation.y) * 0.05;
      face.rotation.x += (-mouseY * 0.3 - face.rotation.x) * 0.05;
      leftEye.rotation.y = rightEye.rotation.y = mouseX * 0.5;
      leftEye.rotation.x = rightEye.rotation.x = -mouseY * 0.5;


      // Make the light pulse
      pointLight1.intensity = Math.sin(elapsedTime * 1.5) * 20 + 40;
      pointLight2.intensity = Math.cos(elapsedTime * 2) * 20 + 40;

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
      (leftEye.geometry as THREE.SphereGeometry).dispose();
      (rightEye.geometry as THREE.SphereGeometry).dispose();
      (leftPupil.geometry as THREE.SphereGeometry).dispose();
      (rightPupil.geometry as THREE.SphereGeometry).dispose();

      headMaterial.dispose();
      eyeMaterial.dispose();
      pupilMaterial.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
