import { ReactNode } from "react";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type SelectablePageItem = {
    label: ReactNode;
    icon: any;
    onClick: () => void;
};

export type ContainerSize = {
    width: number;
    height: number;
};

export const CAMERA_FRAME_MAX_WIDTH = 700;
export const CAMERA_FRAME_MAX_HEIGHT = 400;

export const decomposeMatrix = (
    matrix1d: number[],
): {
    translation: THREE.Vector3;
    rotation: THREE.Quaternion;
    scale: THREE.Vector3;
} => {
    const matrix4x4 = new THREE.Matrix4().fromArray(matrix1d);

    const translation = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    matrix4x4.decompose(translation, rotation, scale);

    return {
        translation: translation,
        rotation: rotation,
        scale: scale,
    };
};

export const loadGltf = async (url: string): Promise<GLTF> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const loader = new GLTFLoader();
    return await new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        loader.load(
            url,
            (gltf: GLTF) => resolve(gltf),
            () => {},
            (error: unknown) => reject(error),
        );
    });
};
