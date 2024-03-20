// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-call */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\scene.gltf 
Author: T-Art (https://sketchfab.com/person-x)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/skull-mask-31356fbc95e7490c8ca2f75199c2b23a
Title: Skull Mask
*/

import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useFaceLandmarkDetector } from "@/hooks/FaceLandmarkDetector";
import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { decomposeMatrix } from "@/context/ApplicationContext";
import * as THREE from "three";

export const SkullMask = (props) => {
  const { nodes, materials } = useGLTF("/gltf_models/skull-mask/scene.gltf");
  const refSkullHead = useRef();

  const { detectLandmarks, drawLandmarks, results } = useFaceLandmarkDetector();

  useFrame(() => {
    detectLandmarks(props.webcamInstance, Date.now());
    if (refSkullHead.current && results) {
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
      "YXZ",
    );
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    if (flipped) {
      // flip to x axis
      quaternion.y *= -1;
      quaternion.z *= -1;
      translation.x *= -1;
    }

    refSkullHead.current.position.set(
      (translation.x - 2) * 0.05,
      (translation.y + 0.5) * -0.2,
      (translation.z + 20) * 0.03,
    );

    // refSkullHead.current.scale.set(3, 3, 3);
    refSkullHead.current.scale.set(1.7, 1.7, 1.7);
  };

  return (
    <group {...props} dispose={null} scale={0.3} position={[1, -7, -8]}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[50.794, 48.599, 54.329]}>
        <mesh
          ref={refSkullHead}
          geometry={nodes.Mask__Skull_0.geometry}
          material={materials.Skull}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/gltf_models/skull-mask/scene.gltf");
