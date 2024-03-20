// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
    FaceLandmarker,
    FilesetResolver,
    FaceLandmarkerResult,
    DrawingUtils,
} from "@mediapipe/tasks-vision";
import { useFrame } from "@react-three/fiber";

type Props = {
    videoElement: HTMLVideoElement;
    children?: (
        drawLandmarks: (canvas: HTMLCanvasElement) => void,
        results: FaceLandmarkerResult | null,
    ) => void;
};
export const FaceLandmarkDetector: React.FC<Props> = (props: Props) => {
    const { children, videoElement } = props;
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
        null,
    );
    const [results, setResults] = useState<FaceLandmarkerResult | null>(null);

    const initializeModel = useCallback(async () => {
        const filesetResolver = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        const newFaceLandmarker = await FaceLandmarker.createFromOptions(
            filesetResolver,
            {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: "GPU",
                },
                outputFaceBlendshapes: true,
                outputFacialTransformationMatrixes: true,
                runningMode: "VIDEO",
                numFaces: 1,
            },
        );
        setFaceLandmarker(newFaceLandmarker);
    }, []);

    const detectLandmarks = useCallback(() => {
        if (!faceLandmarker) return;

        const newResults = faceLandmarker.detectForVideo(
            videoElement,
            Date.now(),
        );
        setResults(newResults);
        return newResults;
    }, [faceLandmarker, videoElement]);

    useFrame(() => {
        detectLandmarks();
        // console.log(results);
    });

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

    return <>{children && children(drawLandmarks, results)}</>;
};

type Output = {
    detectLandmarks: (videoElement: HTMLVideoElement, time: number) => void;
    drawLandmarks: (canvas: HTMLCanvasElement) => void;
    results: FaceLandmarkerResult | null;
};
export const useFaceLandmarkDetector = (): Output => {
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
        null,
    );
    const [results, setResults] = useState<FaceLandmarkerResult | null>(null);

    const initializeModel = useCallback(async () => {
        const filesetResolver = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        const newFaceLandmarker = await FaceLandmarker.createFromOptions(
            filesetResolver,
            {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: "GPU",
                },
                outputFaceBlendshapes: true,
                outputFacialTransformationMatrixes: true,
                runningMode: "VIDEO",
                numFaces: 1,
            },
        );
        setFaceLandmarker(newFaceLandmarker);
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
