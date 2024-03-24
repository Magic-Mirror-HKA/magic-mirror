"use client";
// first, import all you need
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { CAMERA_FRAME_MAX_HEIGHT, CAMERA_FRAME_MAX_WIDTH } from "@/context/ApplicationContext";
import {
    BodyPixModelConfig, BodySegmenter,
    MediaPipeSelfieSegmentationMediaPipeModelConfig,
    MediaPipeSelfieSegmentationTfjsModelConfig,
    ModelConfig
} from "@tensorflow-models/body-segmentation";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import {
    Segmentation
} from "@tensorflow-models/body-segmentation/dist/shared/calculators/interfaces/common_interfaces";
import { height } from "@mui/system";

type SegmenterOptionTyp =
  MediaPipeSelfieSegmentationMediaPipeModelConfig |
  MediaPipeSelfieSegmentationTfjsModelConfig |
  BodyPixModelConfig |
  undefined;

type Props =  {
    img: string;
    image: HTMLImageElement;
    cameraWidth: number;
    cameraHeight: number;
}
const TestComponent = (props: Props) => {

    const { img, image, cameraWidth, cameraHeight } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const webcamRef = useRef<Webcam>(null);
    // Manage the state of bodypixnet with useState
    const [bodypixnet, setBodypixnet] = useState<bodyPix.BodyPix | undefined>(undefined);
    const [segmenter, setSegmenter] = useState<BodySegmenter | undefined>(undefined);

    // Run only when the page is first loaded
    useEffect(() => {

        // TODO. Download the moedel locally as json
        //  https://storage.googleapis.com/tfjs-models/savedmodel/bodypix/mobilenet/float/100/model-stride32.json
        const modellConfig: ModelConfig = {
            architecture: "MobileNetV1",
            outputStride: 8,
        }

        const initializeSegmenter = async () => {
            const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation; // or 'BodyPix'

            const segmenterConfig: SegmenterOptionTyp = {
                runtime: "tfjs", // or 'tfjs' / 'mediapipe'
                modelType: "landscape", // or 'landscape'
            };

            return await bodySegmentation.createSegmenter(model, segmenterConfig);
        }

        initializeSegmenter().then((segmenter) => setSegmenter(segmenter));

        // @ts-ignore
        bodyPix.load(modellConfig).then((net: bodyPix.BodyPix) => {
            setBodypixnet(net);
        });
    }, []);

    useEffect(() => {
        if (bodypixnet && img && webcamRef && webcamRef.current && canvasRef && canvasRef.current) {
            setTimeout(() => {
                clickHandler(img);
            }, 1000);
        }
    }, [img, bodypixnet, segmenter, canvasRef.current, webcamRef.current]);

    const drawimage = async (
      webcam: HTMLVideoElement,
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement
    ) => {
        // create tempCanvas
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = webcam.videoWidth;
        tempCanvas.height = webcam.videoHeight;

        const tempCtx = tempCanvas.getContext("2d")!;
        const segmentation = await bodypixnet!.segmentPerson(webcam);

        // TODO: To remove
        const segmentationOfBody = await segmenter!.segmentPeople(webcam);
        const maskOfBody = await bodySegmentation.toBinaryMask(segmentationOfBody);

          const mask = bodyPix.toMask(segmentation);

        await (async function drawMask() {
            requestAnimationFrame(drawMask);
            // draw mask on tempCanvas
            const segmentation = await bodypixnet!.segmentPerson(webcam);
            //const mask = bodyPix.toMask(segmentation);

            // TODO: To be removed
            const mask = await bodySegmentation.toBinaryMask(segmentationOfBody);
            tempCtx.putImageData(mask, 0, 0);
            // draw original image
            context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
            // use destination-out, then only masked area will be removed
            context.save();
            context.globalCompositeOperation = "destination-out";
            context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

            context.globalCompositeOperation = "destination-over";
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            const opacity = 0.6;
            const maskBlurAmount = 3; // Number of pixels to blur by.

            await bodySegmentation.drawMask(canvas, image, mask, opacity, maskBlurAmount);

            context.restore();
        })();
    };
    const clickHandler = async (bgImg: string) => {
        const webcam = webcamRef.current?.video as HTMLVideoElement;
        const canvas = canvasRef.current as HTMLCanvasElement;
        webcam.width = canvas.width = webcam.videoWidth;
        webcam.height = canvas.height = webcam.videoHeight;
        const context = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);

        //canvas.style.backgroundImage = `url('${bgImg}')`;
        //canvas.style.backgroundSize = "cover";

        if (bodypixnet && segmenter) {
            drawimage(webcam, context, canvas);
        }
    };

    const takeScreenshot = () => {
        let imageSrc = "";

        imageSrc = (
          canvasRef as MutableRefObject<HTMLCanvasElement>
        ).current?.toDataURL()!;

        console.log(imageSrc);
    }

    return (
      <div>
          <div>
              <canvas
                ref={canvasRef}
                onClick={takeScreenshot}
                style={{
                    borderRadius: "var(--space-5)",
                    height: cameraHeight,
                    width: cameraWidth,
                }}
              />
              <Webcam audio={false} ref={webcamRef} style={{
                  //display: "none",
                  visibility: "hidden",
                  height: cameraHeight,
                  width: cameraWidth,
                  borderRadius: "var(--space-5)"
              }} />
          </div>
      </div>
    );
}

export default TestComponent;