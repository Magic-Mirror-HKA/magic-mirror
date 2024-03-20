/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\angel_demon_fight.glb 
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFaceLandmarkDetector } from "@/hooks/FaceLandmarkDetector";
import { useFrame } from "@react-three/fiber";
import { decomposeMatrix } from "@/context/ApplicationContext";
import * as THREE from "three";

export const AngelDemonFight = (props) => {
  const groupRef = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/gltf_models/angel-and-demon/scene.gltf",
  );
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    Object.entries(actions).forEach(([actionName, action]) => {
      action.play();
    });
  });

  const { detectLandmarks, drawLandmarks, results } = useFaceLandmarkDetector();

  useFrame(() => {
    detectLandmarks(props.webcamInstance, Date.now());
    if (groupRef.current && results) {
      // console.log(refSkullHead.current);
      updateTranslation(results, true);
    }
  });

  const updateTranslation = (results, flipped = true) => {
    if (!results.facialTransformationMatrixes) return;

    const matrixes = results.facialTransformationMatrixes[0]?.data;
    if (!matrixes) return;

    const { translation, rotation, scale } = decomposeMatrix(matrixes);
    const euler = new THREE.Euler(
      rotation.x,
      rotation.y,
      rotation.z,
      //"ZYX",
      "ZYX",
    );
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    if (flipped) {
      // flip to x axis
      quaternion.y *= -1;
      quaternion.z *= -1;
      translation.x *= -1;
    }

    groupRef.current.position.set(
      translation.x * 0.05,
      (translation.y + 10) * -0.1,
      translation.z * 0.03,
    );

    // refSkullHead.current.scale.set(3, 3, 3);
    // groupRef.current.scale.set(2, 2, 2);
  };

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      scale={3}
      position={[0, 0, -2]}
    >
      <group name="Scene">
        <group name="Armature" scale={0.01}>
          <primitive object={nodes.Bip_Ange} />
          <primitive object={nodes.Bip001_Demon} />
          <skinnedMesh
            name="Ange"
            geometry={nodes.Ange.geometry}
            material={materials._putinbust2PutinMat}
            skeleton={nodes.Ange.skeleton}
          />
          <skinnedMesh
            name="demon"
            geometry={nodes.demon.geometry}
            material={materials["02 - Default"]}
            skeleton={nodes.demon.skeleton}
          />
        </group>
        <group
          name="CTRL_Fourche"
          position={[-0.682, 0.337, -0.203]}
          rotation={[-2.885, -0.132, -1.737]}
          scale={0.01}
        >
          <mesh
            name="fourche"
            geometry={nodes.fourche.geometry}
            material={materials["03 - Default"]}
            position={[0, 15.418, 0]}
          />
        </group>
        <group
          name="CTRL_Harpe"
          position={[0.647, 0.124, 0.06]}
          rotation={[-0.057, -0.421, -0.79]}
          scale={0.01}
        >
          <mesh
            name="Harpe"
            geometry={nodes.Harpe.geometry}
            material={materials["08 - Default"]}
            position={[-4.22, 1.553, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.569, 0.18, 0.631]}
          />
        </group>
        {/*<mesh*/}
        {/*  name="PutinBust"*/}
        {/*  geometry={nodes.PutinBust.geometry}*/}
        {/*  material={materials._putinbust2PutinMat}*/}
        {/*  position={[0, -1.492, -0.047]}*/}
        {/*  scale={0.056}*/}
        {/*/>*/}

        {/*<mesh*/}
        {/*  name="Cube"*/}
        {/*  geometry={nodes.Cube.geometry}*/}
        {/*  material={materials.Material}*/}
        {/*/>*/}
      </group>
    </group>
  );
};

useGLTF.preload("/gltf_models/angel-and-demon/scene.gltf");