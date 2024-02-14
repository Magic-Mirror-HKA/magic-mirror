import * as THREE from "three";
import { Object3D } from "three";
import { decomposeMatrix, loadGltf } from "@/context/ApplicationContext";
import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";

class AvatarManager {
    private static instance: AvatarManager = new AvatarManager();
    private scene!: THREE.Scene;
    isModelLoaded = false;

    private constructor() {
        this.scene = new THREE.Scene();
    }

    static getInstance(): AvatarManager {
        return AvatarManager.instance;
    }

    getScene = () => {
        return this.scene;
    };

    clearScene = () => {
        this.scene.children[0]?.removeFromParent();
        this.scene.clear();
    };

    loadModel = async (url: string) => {
        this.isModelLoaded = false;
        this.scene.clear();
        if (this.scene.children.length === 1) {
            this.scene.children[0].removeFromParent();
            this.scene.clear();
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const gltf = await loadGltf(url);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
        gltf.scene.traverse((obj: Object3D) => {
            obj.frustumCulled = true;
            //obj.scale.set(0.5, 0.5, 0.5);
            //obj.scale.set(0.5, 0.5, 0.5);
            //obj.geometry.center();
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        this.scene.add(gltf.scene);

        // make specific surfaces invisible
        //const LeftHand = this.scene.getObjectByName("LeftHand");
        // const RightHand = this.scene.getObjectByName("RightHand");
        const head = this.scene.getObjectByName("Head");
        //LeftHand?.scale.set(0, 0, 0);
        head?.scale.set(0, 0, 0);
        this.isModelLoaded = true;
    };

    updateFacialTransforms = (
        results: FaceLandmarkerResult,
        flipped = true,
    ) => {
        if (!results || !this.isModelLoaded) return;

        this.updateBlendShapes(results, flipped);
        this.updateTranslation(results, flipped);
    };

    updateBlendShapes = (results: FaceLandmarkerResult, flipped = true) => {
        if (!results.faceBlendshapes) return;

        const blendShapes = results.faceBlendshapes[0]?.categories;
        if (!blendShapes) return;

        this.scene.traverse((obj) => {
            if (
                "morphTargetDictionary" in obj &&
                "morphTargetInfluences" in obj
            ) {
                const morphTargetDictionary = obj.morphTargetDictionary as {
                    [key: string]: number;
                };
                const morphTargetInfluences =
                    obj.morphTargetInfluences as Array<number>;

                for (const { score, categoryName } of blendShapes) {
                    let updatedCategoryName = categoryName;
                    if (flipped && categoryName.includes("Left")) {
                        updatedCategoryName = categoryName.replace(
                            "Left",
                            "Right",
                        );
                    } else if (flipped && categoryName.includes("Right")) {
                        updatedCategoryName = categoryName.replace(
                            "Right",
                            "Left",
                        );
                    }
                    const index = morphTargetDictionary[updatedCategoryName];
                    morphTargetInfluences[index] = score;
                }
            }
        });
    };

    updateTranslation = (results: FaceLandmarkerResult, flipped = true) => {
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

        //const Head = this.scene.getObjectByName("Head");
        // const head = this.scene.getObjectByName("Head");
        // const headMask = this.scene.getObjectByName("Head_Mask");
        // head?.quaternion.slerp(quaternion, 1.0);
        // headMask?.quaternion.slerp(quaternion, 1.0);

        //const root = this.scene.getObjectByName("AvatarRoot");
        const root1 = this.scene.getObjectByName("Head");
        const root2 = this.scene.getObjectByName("Head2");

        // values empirically calculated
        // Positions
        // root1?.position.lerp(
        //     translation.x * 0.01,
        //     translation.y * 0.05,
        //     (translation.z + 55) * 0.03
        // );

        root2?.position.set(
            translation.x * 0.05,
            translation.y * -0.2,
            (translation.z + 55) * 0.03,
        );

        // Scale of Parent objects in the 3D Object
        root1?.scale.set(0.7, 0.7, 0.7);
        root2?.scale.set(0.7, 0.7, 0.7);
    };
}

export default AvatarManager;
