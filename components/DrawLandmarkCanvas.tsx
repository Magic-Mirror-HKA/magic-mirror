import { useEffect, useRef } from "react";
import FaceLandmarkManager from "@/manager/FaceLandmarkManager";

interface DrawLandmarkCanvasProps {
    width: number;
    height: number;
}
const DrawLandmarkCanvas = (props: DrawLandmarkCanvasProps) => {
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const { width, height } = props;

    const animate = () => {
        if (drawCanvasRef.current) {
            drawCanvasRef.current.width = width;
            drawCanvasRef.current.height = height;
            const faceLandmarkManager = FaceLandmarkManager.getInstance();
            faceLandmarkManager.drawLandmarks(drawCanvasRef.current);
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
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
