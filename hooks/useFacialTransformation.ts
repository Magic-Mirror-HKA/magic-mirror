// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as facemesh from "../public/tensorflow/faceMesh";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";

// Uncomment the line below if you want to use TensorFlow.js runtime.
import "@tensorflow/tfjs-converter";

tf.env().set("WEBGL_CPU_FORWARD", false);

type Output = {
    detectFaceLandmarksFromVideoSteam: (videoElement: HTMLVideoElement) => void;
    //drawLandmarks: (canvas: HTMLCanvasElement) => void;
    //results: FaceLandmarkerResult | null;
    results: number[];
};
export const useFacialTransformation = (): Output => {
    const [model, setModel] = useState();
    const [predictions, setPredictions] = useState<number[]>([]);

    useEffect(() => {
        const loadModel = async () => {
            // @ts-ignore
            return await facemesh.load({
                maxContinuousChecks: 5,
                detectionConfidence: 0.9,
                maxFaces: 1,
                iouThreshold: 0.3,
                scoreThreshold: 0.75,
            });
        };

        loadModel().then((model) => setModel(model));
    }, []);
    
    useEffect(() => {
        console.log("Prediction from hook: ", predictions);
    }, [predictions]);

    const detectFaceLandmarksFromVideoSteam = async (
        videoElement: HTMLVideoElement,
    ) => {
        
        if (!model) return;
        
        // @ts-ignore
        const predictions = await model.estimateFaces(videoElement);

        console.log("predictions: ", predictions);
        if (predictions.length > 0) {
//            const positionBufferData = predictions[0].scaledMesh.reduce(
//                (acc, pos) => acc.concat(pos),
//                [],
//            );
            // console.log("ScaledMesh reduced: ", positionBufferData);
            setPredictions(predictions[0].scaledMesh);
        }
    };

    return {
        results: predictions,
        detectFaceLandmarksFromVideoSteam,
    };
};
