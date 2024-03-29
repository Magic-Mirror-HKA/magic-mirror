"use client";
import { useEffect } from "react";
import {
    Results as SelfieSegmentationResults,
    SelfieSegmentation,
} from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";
// import {
//     CAMERA_FRAME_MAX_HEIGHT,
//     CAMERA_FRAME_MAX_WIDTH,
// } from "@/context/ApplicationContext";
// import * as bodySegmentation from "@tensorflow-models/body-segmentation";

//import "@tensorflow/tfjs-node";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

// Uncomment the line below if you want to use TensorFlow.js runtime.
import "@tensorflow/tfjs-converter";
// Uncomment the line below if you want to use MediaPipe runtime.
// import '@mediapipe/selfie_segmentation';

type Input = {
    videoElement: HTMLVideoElement;
    outputCanvasElement: HTMLCanvasElement;
    backgroundImage: HTMLImageElement;
};

// export const useSelfieSegmentation = (input: Input) => {
//     const { videoElement, outputCanvasElement, backgroundImage } = input;
//
//     const segmentationCdnUrl =
//         "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation";
//
//     useEffect(() => {
//         if (!videoElement || !outputCanvasElement) return;
//
//         const selfieSegmentation = new SelfieSegmentation({
//             locateFile: (file: string) => `${segmentationCdnUrl}/${file}`,
//         });
//
//         selfieSegmentation.setOptions({
//             modelSelection: 1,
//             selfieMode: false,
//         });
//
//         selfieSegmentation.onResults(onResult);
//
//         const camera = new Camera(videoElement, {
//             onFrame: async () => {
//                 await selfieSegmentation.send({
//                     image: videoElement,
//                 });
//             },
//             facingMode: "user",
//             width: 3260,
//             height: 1724,
//         });
//
//         void camera.start();
//
//         return () => {
//             // Destroys previous camera and segmentation instances to prevent memory leaks
//             void camera?.stop();
//             void selfieSegmentation?.close();
//         };
//     }, [backgroundImage, videoElement, outputCanvasElement]);
//
//     const onResult = async (results: SelfieSegmentationResults) => {
//         const camera = videoElement;
//         const canvas = outputCanvasElement;
//
//         if (!camera || !canvas) {
//             console.error(
//                 "Could not find either an instance of a camera nor an instance of the output canvas",
//             );
//             return;
//         }
//
//         const canvasCtx = canvas.getContext("2d");
//
//         if (!canvasCtx) {
//             console.error("No Canvas context");
//             return;
//         }
//
//         // Adjust Canvas with and height
//         canvas.width = 3260;
//         canvas.height = 1724;
//
//         //canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
//
//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
//
//         // create tempCanvas
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = videoElement.videoWidth;
//         tempCanvas.height = videoElement.videoHeight;
//
//         //tempCanvas.width = 640;
//         //tempCanvas.height = 480;
//         const tempCtx = tempCanvas.getContext("2d")!;
//
//         //
//         // // tempCanvasForSegmentation
//         // const tempCanvasForSegmentation = document.createElement("canvas");
//         // const tempCanvasForSegmentationCtx = tempCanvasForSegmentation.getContext("2d")!;
//         // tempCanvasForSegmentationCtx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);
//         //
//         // let imageData = tempCanvasForSegmentationCtx.getImageData(
//         //   0,
//         //   0,
//         //   videoElement.videoWidth,
//         //   videoElement.videoHeight
//         // ).data;
//         //
//         // const uint8Array = new Uint8ClampedArray(imageData.buffer);
//         // const dataNew = new ImageData(
//         //   uint8Array,
//         //   videoElement.videoWidth,
//         //   videoElement.videoHeight
//         // );
//         // tempCtx.putImageData(dataNew, 0, 0);
//
//         // TODO. Uncomment later !!!
//         // canvasCtx.drawImage(
//         //     results.segmentationMask,
//         //     0,
//         //     0,
//         //     canvas.width,
//         //     canvas.height,
//         // );
//         //
//         // console.log("segmentationMask: ", results.segmentationMask);
//         // console.log("typeof segmentationMask: ", typeof results.segmentationMask);
//         //
//         // canvasCtx.globalCompositeOperation = "source-in";
//         // canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
//         //
//         // canvasCtx.globalCompositeOperation = "destination-atop";
//         // // canvasCtx.filter = "blur(10px)";
//         // canvasCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//
//         tempCtx.drawImage(
//             results.segmentationMask,
//             0,
//             0,
//             canvas.width,
//             canvas.height,
//         );
//
//         //console.log("segmentationMask: ", results.segmentationMask);
//         //console.log("typeof segmentationMask: ", typeof results.segmentationMask);
//
//         //console.log("Canvas size: ", canvas.width, canvas.height);
//
//         tempCtx.globalCompositeOperation = "source-in";
//         tempCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
//
//         const imageDataOfMask = tempCtx.getImageData(
//           0,
//           0,
//           videoElement.videoWidth,
//           videoElement.videoHeight
//         );
//
//         //backgroundImage.width = 640;
//         //backgroundImage.height = 480;
//         //backgroundImage.style.objectFit = "cover";
//
//         //tempCtx.globalCompositeOperation = "destination-atop";
//         //canvasCtx.filter = "blur(10px)";
//         //tempCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//
//
//         // draw original image
//         // canvasCtx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//         // // use destination-out, then only masked area will be removed
//         // canvasCtx.save();
//         // canvasCtx.globalCompositeOperation = "destination-out";
//         // canvasCtx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
//         //
//         // canvasCtx.globalCompositeOperation = "destination-over";
//         // canvasCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//
//         const opacity = 1;
//         const maskBlurAmount = 0; // Number of pixels to blur by.
//         const flipHorizontal = false;
//
//         try {
//             await bodySegmentation.drawMask(canvas, backgroundImage, imageDataOfMask, opacity, maskBlurAmount, flipHorizontal);
//             //canvas.style.background = `url(${backgroundImage.src})`;
//         } catch (error) {
//             console.error("An error has occured when drawing the mask, camera and image", error);
//         }
//
//         canvasCtx.restore();
//     };
//
//
//     // Some Solution
//     // New
//     // const initializeSegmenter = async () => {
//     //     const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation; // or 'BodyPix'
//     //
//     //     const segmenterConfig: SegmenterOptionTyp = {
//     //         runtime: "tfjs", // or 'tfjs' / 'mediapipe'
//     //         modelType: "general", // or 'landscape'
//     //     };
//     //
//     //     videoElement.height = 1724;
//     //     videoElement.width = 3260;
//     //
//     //     const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
//     //
//     //     const peopleSegmentation = await segmenter.segmentPeople(videoElement);
//     //
//     //     setSegmentation(peopleSegmentation[0]);
//     //
//     // }
//     //
//     // const drawSegmentationResult = async () => {
//     //
//     //     requestAnimationFrame(drawSegmentationResult);
//     //
//     //     if (!segmentation) return;
//     //
//     //     const video = document.getElementById("webcam") as HTMLVideoElement;
//     //     // const video = new Image();
//     //     // video.src = "/backgrounds/pyramid.jpg";
//     //     video.height = 1724;
//     //     video.width = 3260;
//     //     const outputCanvas = document.getElementById(OUTPUT_CANVAS_ID) as HTMLCanvasElement;
//     //
//     //     const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
//     //     const backgroundColor = {r: 0, g: 0, b: 0, a: 255};
//     //     const drawContour = true;
//     //     const foregroundThreshold = 0.6;
//     //
//     //     console.log("Segmentation: ", segmentation);
//     //
//     //     const imageData = await segmentation.mask.toCanvasImageSource();
//     //     console.log((imageData as HTMLCanvasElement).toDataURL())
//     //
//     //     const backgroundDarkeningMask = await bodySegmentation.toBinaryMask(segmentation, foregroundColor, backgroundColor, drawContour, foregroundThreshold);
//     //
//     //     const opacity = 0.6;
//     //     const maskBlurAmount = 3; // Number of pixels to blur by.
//     //
//     //     await bodySegmentation.drawMask(outputCanvas, backgroundImage, backgroundDarkeningMask, opacity, maskBlurAmount);
//     //
//     // }
//     //
//     // const drawImage = async () => {
//     //     const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation; // or 'BodyPix'
//     //     const segmenterConfig: SegmenterOptionTyp = {
//     //         runtime: "tfjs", // or 'tfjs' / 'mediapipe'
//     //         modelType: "general", // or 'landscape'
//     //     };
//     //
//     //     videoElement.height = 1724;
//     //     videoElement.width = 3260;
//     //     const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
//     //
//     //
//     //     // create tempCanvas
//     //     const tempCanvas = document.createElement("canvas");
//     //     tempCanvas.width = videoElement.videoWidth;
//     //     tempCanvas.height = videoElement.videoHeight;
//     //     const tempCtx = tempCanvas.getContext("2d")!;
//     //
//     //     await (async function drawMask() {
//     //         requestAnimationFrame(drawMask);
//     //
//     //         // Canvas & Camera configs
//     //         videoElement.width = outputCanvasElement.width = videoElement.videoWidth;
//     //         videoElement.height = outputCanvasElement.height = videoElement.videoHeight;
//     //         const context = outputCanvasElement.getContext("2d")!;
//     //         context.clearRect(0, 0, outputCanvasElement.width, outputCanvasElement.height);
//     //
//     //         const peopleSegmentation = await segmenter.segmentPeople(videoElement);
//     //         const segmentation = peopleSegmentation[0];
//     //
//     //         const video = document.getElementById("webcam") as HTMLVideoElement;
//     //         // const video = new Image();
//     //         // video.src = "/backgrounds/pyramid.jpg";
//     //         // video.height = 1724;
//     //         // video.width = 3260;
//     //
//     //         const outputCanvas = document.getElementById(OUTPUT_CANVAS_ID) as HTMLCanvasElement;
//     //
//     //         const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
//     //         const backgroundColor = {r: 0, g: 0, b: 0, a: 255};
//     //         const drawContour = true;
//     //         const foregroundThreshold = 0.6;
//     //
//     //         console.log("Segmentation: ", segmentation);
//     //
//     //         const imageData = await segmentation.mask.toCanvasImageSource();
//     //         console.log((imageData as HTMLCanvasElement).toDataURL())
//     //
//     //         const backgroundDarkeningMask = await bodySegmentation.toBinaryMask(segmentation, foregroundColor, backgroundColor, drawContour, foregroundThreshold);
//     //
//     //         // draw mask on tempCanvas
//     //         tempCtx.putImageData(backgroundDarkeningMask, outputCanvas.width, outputCanvas.height);
//     //
//     //         // draw original image
//     //         context.drawImage(videoElement, 0, 0, outputCanvas.width, outputCanvas.height);
//     //
//     //         // use destination-out, then only masked area will be removed
//     //         context.save();
//     //         context.globalCompositeOperation = "destination-out";
//     //         context.drawImage(tempCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
//     //
//     //         context.globalCompositeOperation = "destination-over";
//     //         context.drawImage(backgroundImage, 0, 0, outputCanvas.width, outputCanvas.height);
//     //
//     //         context.restore();
//     //
//     //         // const opacity = 0.6;
//     //         // const maskBlurAmount = 3; // Number of pixels to blur by.
//     //         //
//     //         // await bodySegmentation.drawMask(outputCanvas, backgroundImage, backgroundDarkeningMask, opacity, maskBlurAmount);
//     //     })();
//     //
//     // }
//     //
//     // useEffect(() => {
//     //     if (!videoElement || !outputCanvasElement || !backgroundImage || videoElement) return;
//     //     setTimeout(() => {
//     //         //initializeSegmenter().then(() => drawSegmentationResult());
//     //         drawImage();
//     //     }, 1000)
//     // }, [backgroundImage, videoElement, outputCanvasElement]);
//
//
//     // Another solution
//     // New end
//
//     // useEffect(() => {
//     //     if (!videoElement || !outputCanvasElement || !backgroundImage) return;
//     //     segment();
//     // }, [backgroundImage, videoElement, outputCanvasElement]);
//     //
//     // useEffect(() => {
//     //     drawSegmentationResult();
//     // }, [segmentation]);
// };
//
// export const useSelfieSegmentation2 = (input: Input) => {
//     const { videoElement, outputCanvasElement, backgroundImage } = input;
//
//
//     useEffect(() => {
//         if (videoElement && outputCanvasElement) {
//         const segment = async () => {
//             const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
//             const segmenterConfig = {
//                 runtime: 'tfjs', // or 'tfjs'  / 'mediapipe'
//                 solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
//                 modelType: 'general'
//             }
//
//             const video = document.getElementById("webcam") as HTMLVideoElement;
//
//             video.width = 3260;
//             video.height = 1724;
//
//             video.style.width = "3260px";
//             video.style.height = "1724px";
//
//             console.log("Video Element: ", video);
//             console.log("Video size: ", video.width, video.height);
//
//             const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
//             const segmentation = await segmenter.segmentPeople(video);
//
//             // The mask image is an binary mask image with a 1 where there is a person and
//             // a 0 where there is not.
//             // const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation);
//             const opacity = 0.7;
//             const flipHorizontal = false;
//             const maskBlurAmount = 0;
//
//             // const canvas = document.getElementById('canvas');
//
//             // Draw the mask image on top of the original image onto a canvas.
//             // The colored part image will be drawn semi-transparent, with an opacity of
//             // 0.7, allowing for the original image to be visible under.
//             // bodySegmentation.drawMask(
//             //   outputCanvasElement, videoElement, coloredPartImage, opacity, maskBlurAmount,
//             //   flipHorizontal
//             // );
//         }
//
//         setTimeout(() => {
//             segment();
//         }, 2000)
//         }
//
//     }, [backgroundImage, videoElement, outputCanvasElement]);
// }


const FRAME_WIDTH = 3260;
const FRAME_HEIGHT = 2500;
export const useSelfieSegmentation = (input: Input) => {
    const { videoElement, outputCanvasElement, backgroundImage } = input;

    const segmentationCdnUrl =
        "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation";

    useEffect(() => {
        if (!videoElement || !outputCanvasElement) return;

        const selfieSegmentation = new SelfieSegmentation({
            locateFile: (file: string) => `/mediapipe/${file}`,
        });

        selfieSegmentation.setOptions({
            modelSelection: 1,
            //selfieMode: true,
        });

        selfieSegmentation.onResults(onResult);

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                if (videoElement.readyState === 4) {
                    await selfieSegmentation.send({
                        image: videoElement,
                    });
                }
            },
            //facingMode: "user",
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
        });

        try {
            void camera.start();
        } catch (error) {
            console.error(
                "An error occured while starting the camera: ",
                error,
            );
        }

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

        // Flip the canvas 180 degree on the horizontally
        canvas.style.transform = "scaleX(-1)";

        if (!canvasCtx) {
            console.error("No Canvas context");
            return;
        }

        //canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

        canvas.width = FRAME_WIDTH;
        canvas.height = FRAME_HEIGHT;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.filter = "none";
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
        //backgroundImage.style.objectFit = "contain";
        //backgroundImage.width = 640;
        //backgroundImage.height = 480;
        canvasCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        canvasCtx.restore();

        // const camera = videoElement;
        // const canvas = outputCanvasElement;
        //
        // if (!camera || !canvas) {
        //     console.error(
        //         "Could not find either an instance of a camera nor an instance of the output canvas",
        //     );
        //     return;
        // }
        //
        // const canvasCtx = canvas.getContext("2d");
        //
        // if (!canvasCtx) {
        //     console.error("No Canvas context");
        //     return;
        // }
        //
        // // Resize the canvas to match the video size
        // canvas.width = FRAME_WIDTH;
        // canvas.height = FRAME_HEIGHT;
        //
        // // Rotate the canvas 180 degree on the y-axis
        // canvas.style.transform = "scaleX(-1)";
        //
        // // Draw the custom background first
        // backgroundImage.width = FRAME_WIDTH;
        // backgroundImage.height = FRAME_HEIGHT;
        // backgroundImage.style.objectFit = "contain";
        // canvasCtx.drawImage(
        //     backgroundImage,
        //     0,
        //     0,
        //     backgroundImage.width,
        //     backgroundImage.height,
        // );
        //
        // // Initialize the tempCanvas and maskCanvas only once
        // const tempCanvas = document.createElement("canvas");
        // tempCanvas.width = canvas.width;
        // tempCanvas.height = canvas.height;
        // const tempCtx = tempCanvas.getContext("2d")!;
        //
        // const maskCanvas = document.createElement("canvas");
        // maskCanvas.width = canvas.width;
        // maskCanvas.height = canvas.height;
        // const maskCtx = maskCanvas.getContext("2d")!;
        //
        // // Draw the person onto the tempCanvas
        // tempCtx.drawImage(
        //     results.image,
        //     0,
        //     0,
        //     tempCanvas.width,
        //     tempCanvas.height,
        // );
        //
        // maskCtx.drawImage(
        //     results.segmentationMask,
        //     0,
        //     0,
        //     maskCanvas.width,
        //     maskCanvas.height,
        // );
        //
        // const imageData = maskCtx.getImageData(
        //     0,
        //     0,
        //     maskCanvas.width,
        //     maskCanvas.height,
        // );
        //
        // // Apply binary thresholding
        // const threshold = 1; // Adjust the threshold value to your preference
        // for (let i = 0; i < imageData.data.length; i += 4) {
        //     const grayscale =
        //         (imageData.data[i] +
        //             imageData.data[i + 1] +
        //             imageData.data[i + 2]) /
        //         3;
        //     const binaryValue = grayscale > threshold ? 255 : 0;
        //     imageData.data[i] =
        //         imageData.data[i + 1] =
        //         imageData.data[i + 2] =
        //             binaryValue;
        // }
        //
        // maskCtx.putImageData(imageData, 0, 0);
        //
        // // Use globalCompositeOperation to create a masked version of the person
        // tempCtx.globalCompositeOperation = "destination-in";
        // tempCtx.drawImage(maskCanvas, 0, 0);
        //
        // // Reset globalCompositeOperation to draw the masked person onto the main canvas
        // canvasCtx.globalCompositeOperation = "source-over";
        // canvasCtx.drawImage(tempCanvas, 0, 0);
    };
};
