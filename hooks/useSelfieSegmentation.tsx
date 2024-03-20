import { useEffect } from "react";
import {
    Results as SelfieSegmentationResults,
    SelfieSegmentation,
} from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";
import {
    CAMERA_FRAME_MAX_HEIGHT,
    CAMERA_FRAME_MAX_WIDTH,
} from "@/context/ApplicationContext";

type Input = {
    videoElement: HTMLVideoElement;
    outputCanvasElement: HTMLCanvasElement;
    backgroundImage: HTMLImageElement;
};

export const useSelfieSegmentation = (input: Input) => {
    const { videoElement, outputCanvasElement, backgroundImage } = input;

    const segmentationCdnUrl =
        "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation";

    useEffect(() => {
        if (!videoElement || !outputCanvasElement) return;

        const selfieSegmentation = new SelfieSegmentation({
            locateFile: (file: string) => `${segmentationCdnUrl}/${file}`,
        });

        selfieSegmentation.setOptions({
            modelSelection: 1,
            selfieMode: true,
        });

        selfieSegmentation.onResults(onResult);

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await selfieSegmentation.send({
                    image: videoElement,
                });
            },
            facingMode: "environment",
            width: CAMERA_FRAME_MAX_WIDTH,
            height: CAMERA_FRAME_MAX_HEIGHT,
        });

        void camera.start();

        return () => {
            // Destroys previous camera and segmentation instances to prevent memory leaks
            void camera?.stop();
            void selfieSegmentation?.close();
        };
    }, [backgroundImage, videoElement, outputCanvasElement]);

    const onResult = (results: SelfieSegmentationResults) => {
        const camera = videoElement;
        const canvas = outputCanvasElement;

        if (!camera || !canvas) {
            console.error(
                "Could not find either an instance of a camera nor an instance of the output canvas",
            );
            return;
        }

        const canvasCtx = canvas.getContext("2d");

        if (!canvasCtx) {
            console.error("No Canvas context");
            return;
        }

        canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.drawImage(
            results.segmentationMask,
            0,
            0,
            canvas.width,
            canvas.height,
        );

        canvasCtx.globalCompositeOperation = "source-in";
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        canvasCtx.globalCompositeOperation = "destination-atop";
        // canvasCtx.filter = "blur(10px)";
        canvasCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        canvasCtx.restore();
    };
};
