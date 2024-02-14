"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* @typescript-eslint/no-unsafe-member-access, @typescript-eslint/ban-ts-comment */
import React, { useRef } from "react";
import { Canvas, useFrame, useLoader, Vector3 } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-expect-error Eslint error
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import * as THREE from "three";

function MeshComponent() {
    const fileUrl = "/skull_mask/scene.gltf";
    const meshRef = useRef<Mesh | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const gltf = useLoader(GLTFLoader, fileUrl) as GLTF;

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.01;
    });

    // Set position and scale of the model
    const modelPosition: Vector3 = [-2, -155, 5]; // Adjust the position as needed
    const modelScale: Vector3 = [5, 5, 5]; // Adjust the scale as needed

    return (
        <mesh
            ref={meshRef}
            position={modelPosition}
            scale={modelScale}
            onWheel={(e) => console.log(e)}
        >
            {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <primitive object={gltf.scene} />
        </mesh>
    );
}

const ThreeDObjectUsingThreeDrei: React.FC = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const gltf = useLoader(GLTFLoader, "/skull_mask/scene.gltf") as GLTF;

    scene.add(gltf.scene);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    return (
        <Canvas style={{ zIndex: 10 }}>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <MeshComponent />
        </Canvas>
    );
};

export default ThreeDObjectUsingThreeDrei;
