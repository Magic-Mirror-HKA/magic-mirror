// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-floating-promises */
import React, { Ref, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as faceMesh from "../../public/tensorflow/faceMesh";
import { extend, useFrame } from "@react-three/fiber";
import * as tf from "@tensorflow/tfjs";
import {
    MaskPosition,
    MeshType, stopVideoStream,
    ThreeModelType,
} from "@/context/ApplicationContext";

/**
 * Tree Shaking the THREEjs library to prevent runtime error.
 *
 * @see https://docs.pmnd.rs/react-three-fiber/api/canvas#tree-shaking
 *
 */
extend(THREE);

type PropsTensorflowModelPositioning = {
    video: HTMLVideoElement;
    ThreeModel: ThreeModelType;
};
export const TensorflowModelPositioning: React.FC<
    PropsTensorflowModelPositioning
> = (props: PropsTensorflowModelPositioning) => {
    const { video, ThreeModel } = props;

    const maskRef = useRef<MeshType>();

    const [model, setModel] = useState(undefined);

    const [maskPosition, setMaskPosition] = useState<MaskPosition | undefined>(
        undefined,
    );

    useEffect(() => {
        let stream: MediaStream;

        const loadResources = async () => {
            try {
                // Camera Access
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (video) {
                    video.srcObject = stream;
                }

                // TensorFlow Model
                await tf.setBackend("webgl");
                // @ts-expect-error
                const loadedModel = await faceMesh.load({
                    maxContinuousChecks: 5,
                    detectionConfidence: 0.9,
                    maxFaces: 1,
                    iouThreshold: 0.3,
                    scoreThreshold: 0.75,
                });
                setModel(loadedModel);
            } catch (error) {
                console.error("Initialization error:", error);
            }
        };

        loadResources();
        return () => {
            stopVideoStream(stream);
        }
    }, []);

    useFrame(() => {
        if (!video || !maskRef.current || !model || !maskPosition) return;
        if (video.readyState !== 4) return;

        (async () => {
            // @ts-expect-error
            const faceEstimates = await model.estimateFaces(video);

            if (faceEstimates.length === 0) return;

            switch (maskPosition) {
                case "BOTH-EYES":
                    positionMeshOnEyesOfFaceLandmark(
                        maskRef.current!,
                        faceEstimates,
                        video,
                    );
                    break;
                case "WHOLE-FACE":
                    positionMeshOnWholeFaceOfFaceLandmark(
                        maskRef.current!,
                        faceEstimates,
                        video,
                    );
                    break;
                case "HEAD":
                    positionMeshOnHeadOfFaceLandmark(
                        maskRef.current!,
                        faceEstimates,
                        video,
                    );
                    break;
            }
        })();
    });

    return (
        <ThreeModel
            ref={maskRef as Ref<MeshType>}
            setPosition={setMaskPosition}
        />
    );
};

const positionMeshOnEyesOfFaceLandmark = (
    mesh: MeshType,
    tensorflowFaceEstimates: any,
    video: HTMLVideoElement,
) => {
    const keypoints = tensorflowFaceEstimates[0].scaledMesh;
    const leftEye = keypoints[130];
    const rightEye = keypoints[359];
    const eyeCenter = keypoints[168];

    const eyeDistance = Math.sqrt(
        Math.pow(rightEye[0] - leftEye[0], 2) +
            Math.pow(rightEye[1] - leftEye[1], 2),
    );
    const scaleMultiplier = eyeDistance / 80;

    const scaleX = -0.015;
    const scaleY = -0.015;
    const offsetX = 0.05;
    const offsetY = -0.08;

    mesh.position.x = (eyeCenter[0] - video.videoWidth / 2) * scaleX + offsetX;
    mesh.position.y = (eyeCenter[1] - video.videoHeight / 2) * scaleY + offsetY;
    mesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
    mesh.position.z = 1;

    const eyeLine = new THREE.Vector2(
        rightEye[0] - leftEye[0],
        rightEye[1] - leftEye[1],
    );
    const rotationZ = Math.atan2(eyeLine.y, eyeLine.x);
    mesh.rotation.z = rotationZ;
};

const positionMeshOnWholeFaceOfFaceLandmark = (
    mesh: MeshType,
    tensorflowFaceEstimates: any,
    video: HTMLVideoElement,
) => {
    const keypoints = tensorflowFaceEstimates[0].scaledMesh;
    const leftEye = keypoints[130];
    const rightEye = keypoints[359];
    const eyeCenter = keypoints[168];

    if (!mesh) return;

    const eyeDistance = Math.sqrt(
        Math.pow(rightEye[0] - leftEye[0], 2) +
            Math.pow(rightEye[1] - leftEye[1], 2),
    );
    const scaleMultiplier = eyeDistance / 80;

    const scaleX = -0.015;
    const scaleY = -0.015;
    const offsetX = 0.0;
    const offsetY = -0.5;

    mesh.position.x = (eyeCenter[0] - video.videoWidth / 2) * scaleX + offsetX;
    mesh.position.y = (eyeCenter[1] - video.videoHeight / 2) * scaleY + offsetY;
    mesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
    mesh.position.z = 1;

    const eyeLine = new THREE.Vector2(
        rightEye[0] - leftEye[0],
        rightEye[1] - leftEye[1],
    );
    const rotationZ = Math.atan2(eyeLine.y, eyeLine.x);
    mesh.rotation.z = rotationZ;
};

const positionMeshOnHeadOfFaceLandmark = (
    mesh: MeshType,
    tensorflowFaceEstimates: any,
    video: HTMLVideoElement,
) => {
    const keypoints = tensorflowFaceEstimates[0].scaledMesh;
    const leftEye = keypoints[130];
    const rightEye = keypoints[359];
    const eyeCenter = keypoints[168];

    if (!mesh) return;

    const eyeDistance = Math.sqrt(
        Math.pow(rightEye[0] - leftEye[0], 2) +
            Math.pow(rightEye[1] - leftEye[1], 2),
    );
    const scaleMultiplier = eyeDistance / 80;

    const scaleX = -0.015;
    const scaleY = -0.015;
    const offsetX = 0.0;
    const offsetY = 1.5;

    mesh.position.x = (eyeCenter[0] - video.videoWidth / 2) * scaleX + offsetX;
    mesh.position.y = (eyeCenter[1] - video.videoHeight / 2) * scaleY + offsetY;
    mesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
    mesh.position.z = 1;

    const eyeLine = new THREE.Vector2(
        rightEye[0] - leftEye[0],
        rightEye[1] - leftEye[1],
    );
    const rotationZ = Math.atan2(eyeLine.y, eyeLine.x);
    mesh.rotation.z = rotationZ;
};
