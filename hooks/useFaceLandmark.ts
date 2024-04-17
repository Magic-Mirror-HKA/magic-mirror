// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import {
    FaceLandmarker,
    FilesetResolver,
    FaceLandmarkerResult,
    DrawingUtils,
} from "@mediapipe/tasks-vision";


type Output = {
    detectLandmarks: (videoElement: HTMLVideoElement, time: number) => void;
    drawLandmarks: (canvas: HTMLCanvasElement) => void;
    results: FaceLandmarkerResult | null;
};
export const useFaceLandmark = (): Output => {
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
        null,
    );
    const [results, setResults] = useState<FaceLandmarkerResult | null>(null);

    const initializeModel = useCallback(async () => {
        const filesetResolver = await FilesetResolver.forVisionTasks(
            "/mediapipe/task-vision/wasm",
        );
        try {
            const newFaceLandmarker = await FaceLandmarker.createFromOptions(
                filesetResolver,
                {
                    baseOptions: {
                        modelAssetPath: "/mediapipe/task-vision/blaze_face_short_range.tflite",
                        delegate: "GPU",
                    },
                    outputFaceBlendshapes: true,
                    outputFacialTransformationMatrixes: true,
                    runningMode: "VIDEO",
                    numFaces: 1,
                },
            );
            setFaceLandmarker(newFaceLandmarker);
        } catch (error) {
            console.error("An error has occured when initializing face detector: ", error);
        }
    }, []);

    const detectLandmarks = useCallback(
        (videoElement: HTMLVideoElement, time: number) => {
            if (!faceLandmarker) return;

            const newResults = faceLandmarker.detectForVideo(
                videoElement,
                time,
            );
            setResults(newResults);
            return newResults;
        },
        [faceLandmarker],
    );

    const drawLandmarks = useCallback(
        (canvas: HTMLCanvasElement) => {
            const ctx = canvas.getContext("2d");
            if (!ctx || !results?.faceLandmarks) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const drawingUtils = new DrawingUtils(ctx);

            const lineWidth = 1.3;
            for (const landmarks of results.faceLandmarks) {
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: "#C0C0C070", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                    { color: "#FF3030", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
                    { color: "#FF3030", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                    { color: "#30FF30", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
                    { color: "#30FF30", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: "#E0E0E0", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LIPS,
                    { color: "#E0E0E0", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
                    { color: "#FF3030", lineWidth: lineWidth },
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
                    { color: "#30FF30", lineWidth: lineWidth },
                );
            }
        },
        [results],
    );

    useEffect(() => {
        void initializeModel();
    }, [initializeModel]);

    return { detectLandmarks, drawLandmarks, results };
};
