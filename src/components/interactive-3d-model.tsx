"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// To load your own model, you would use a loader like GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    // #region --- How to load your own 3D Model ---
    // 1. Place your 3D model file (e.g., `myFace.glb`) in the `/public` directory.
    // 2. Uncomment the `GLTFLoader` import at the top of this file.
    // 3. Uncomment the code block below.

    
    const loader = new GLTFLoader();
    loader.load(
      '/my-model.glb', // Path to your model in the /public folder
      (gltf) => {
        const model = gltf.scene;
        // You might need to scale, position, or rotate your model
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        
        // Add the loaded model to the scene
        scene.add(model);
      },
      undefined, // Optional: onProgress callback
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );
    
    // 4. Comment out or remove the "Icosahedron" section below.
    // #endregion

    
    // #region --- Icosahedron (Current Implementation) ---
    /*
    const icoGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
        color: 0xf2691d, // primary color
        metalness: 0.7,
        roughness: 0.3,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);
    
    const wireframeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const wireframe = new THREE.Mesh(icoGeometry, wireframeMaterial);
    wireframe.scale.set(1.001, 1.001, 1.001);
    scene.add(wireframe);
    */
    // #endregion


    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf2691d, 50, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xdb2777, 50, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x3b82f6, 30, 100);
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
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      controls.autoRotate = !controls.manualStart;
      
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
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose geometries
      // icoGeometry.dispose();

      // Dispose materials
      // icoMaterial.dispose();
      // wireframeMaterial.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
