import { useEffect, useRef } from "react";
import { useFaceLandmark } from "@/hooks/useFaceLandmark";

interface DrawLandmarkCanvasProps {
    width: number;
    height: number;
    videoElement: HTMLVideoElement;
}
const DrawLandmarkCanvas = (props: DrawLandmarkCanvasProps) => {
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const { width, height, videoElement } = props;

    const { drawLandmarks, detectLandmarks, results } = useFaceLandmark();

    useEffect(() => {
        detectLandmarks(videoElement, Date.now());
    }, [detectLandmarks, videoElement]);

    useEffect(() => {
        if (drawCanvasRef.current) {
            drawCanvasRef.current.width = width;
            drawCanvasRef.current.height = height;
            drawLandmarks(drawCanvasRef.current);
        }
    }, [drawLandmarks, height, results, width]);

    // TODO:
    // 1. Find a way to get the size (height and width) of the camera frame in here and pass it to the Html Container and canvas.
    // 2. Also the Facelandmarks should be drawn in the same canvas as that of the camera to ease the screenshot function later and have the filter and the picture both in the end picture.
    return (
        // <Html
        //     position={{ x: 0, y: 0, z: 0 }}
        //     style={{
        //         position: "absolute",
        //         top: 0,
        //         //right: "50%",
        //         transform: "translateX(40%) translateY(-30%)",
        //         width: 600,
        //         height: 800,
        //     }}
        // >
        //     <>
        //         <canvas
        //             style={{
        //                 position: "absolute",
        //                 width: 600,
        //                 height: 900,
        //                 //width: width,
        //                 //height: height,
        //                 transform: "scaleX(-1)",
        //             }}
        //             ref={drawCanvasRef}
        //         ></canvas>
        //     </>
        // </Html>

        <canvas
            style={{
                position: "absolute",
                //width: width,
                //height: height,
                transform: "scaleX(-1)",
            }}
            ref={drawCanvasRef}
        ></canvas>
    );
};

export default DrawLandmarkCanvas;
