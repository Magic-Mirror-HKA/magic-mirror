// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
"use client";
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as Facemesh from "@mediapipe/face_mesh";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as CameraUtils from "@mediapipe/camera_utils";
import * as DrawingUtils from "@mediapipe/drawing_utils";
import ThreeDObjectUsingThreeDrei from "@/components/filters/ThreeDObjectUsingThreeDrei";

type Props = {
    webcamRef: any;
    canvasStyles?: React.CSSProperties | undefined;
    children?: (webcam: Webcam) => any;
};
const FaceLandMarkerComponent: React.FC<Props> = (props: Props) => {
    const webcamRef = props.webcamRef;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const connect = DrawingUtils.drawConnectors;
    let camera = null;

    // @ts-expect-error
    function onResults(results) {
        // const video = webcamRef.current.video;

        if (!webcamRef.current) return;

        // @ts-ignore
        const videoWidth = webcamRef.current.video.videoWidth;
        // @ts-ignore
        const videoHeight = webcamRef.current.video.videoHeight;

        if (canvasRef.current === null) return;
        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext(
            "2d",
        ) as CanvasRenderingContext2D;
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            // eslint-disable-next-line eslint-comments/no-duplicate-disable
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height,
        );

        if (results.multiFaceLandmarks) {
            for (const landmarks of results.multiFaceLandmarks) {
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
                    color: "#C0C0C070",
                    lineWidth: 1,
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
                    color: "#FF3030",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
                    color: "#FF3030",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
                    color: "#30FF30",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
                    color: "#30FF30",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
                    color: "#5c128d",
                });
                connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
                    color: "#E0E0E0",
                });

                // THREEjs
                // new THREE.BufferGeometryLoader().load(
                //     "/maskMesh.json",
                //     (maskGeoMetry) => {
                //         maskGeoMetry.computeVertexNormals();
                //         const maskMaterial = new THREE.MeshNormalMaterial();
                //         const maskMesh = new THREE.Mesh(
                //             maskGeoMetry,
                //             maskMaterial,
                //         );
                //         const wireframe = new THREE.WireframeGeometry(
                //             maskGeoMetry,
                //         );
                //
                //         const line = new THREE.LineSegments(wireframe);
                //         line.material.depthTest = false;
                //         line.material.opacity = 1;
                //         line.material.transparent = true;
                //     },
                // );

                // console.log("Canvas ctx", canvasCtx);
                // console.log("Landmarks", landmarks);
                // console.log("Facmesh_faceoval", Facemesh.FACEMESH_FACE_OVAL);

                // New
                // Create a Three.js scene, camera, and renderer
                // const scene = new THREE.Scene();
                // const camera = new THREE.PerspectiveCamera(
                //     75,
                //     640 / 480,
                //     0.1,
                //     1000,
                // );
                // const renderer = new THREE.WebGLRenderer({ antialias: true });
                // renderer.setSize(640, 480);
                // canvasRef.current.appendChild(renderer.domElement);
                //
                // // Load a GLTF model
                // const loader = new GLTFLoader();
                // loader.load("/tiger_head.glb", (gltf: GLTF) => {
                //     const model = gltf.scene;
                //     scene.add(model);
                //
                //     // Update model positions based on landmarks
                //     landmarks.forEach((landmark: any) => {
                //         const { x, y, z } = landmark; // Adjust for correct position
                //         model.position.set(x, y, z);
                //         // Adjust scale and rotation as needed
                //         //model.scale.set(0.1, 0.1, 0.1);
                //         //model.rotation.set(0, Math.PI, 0);
                //     });
                // });
                //
                // // Set camera position and render scene
                // camera.position.z = 5;
                // renderer.render(scene, camera);

                /* End New */
            }
        }
        canvasCtx.restore();
    }
    // }

    // setInterval(())
    useEffect(() => {
        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onResults);

        console.log(webcamRef);

        if (webcamRef === undefined || !webcamRef?.current) return;

        // @ts-ignore
        camera = new CameraUtils.Camera(webcamRef.current.video, {
            onFrame: async () => {
                // @ts-ignore
                await faceMesh.send({ image: webcamRef.current.video });
            },
            width: 640,
            height: 480,
        });
        void camera.start();
    }, [props.webcamRef, webcamRef]);

    // const convertCanvasToImage = (canvas: HTMLCanvasElement): string => {
    //     // Convert the canvas to a PNG image
    //     // Parse the data URL to get the image data
    //     // @ts-ignore
    //     // const imageData = new Uint8Array(
    //     //     // @ts-ignore
    //     //     atob(dataURL.split(",")[1]),
    //     // ) as MediaSource;
    //     // Create a URL for the image data
    //     return canvas.toDataURL("image/png", 1.0);
    // };

    //if (webcamRef === undefined) return <div>Loading...</div>;

    return (
        <div>
            <canvas
                ref={canvasRef}
                className="output_canvas"
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    ...props.canvasStyles,
                }}
            ></canvas>
            <div
                style={{
                    ...props.canvasStyles,
                    display: "absolute",
                    zIndex: 10,
                }}
            >
                <ThreeDObjectUsingThreeDrei />
            </div>
        </div>
    );
};
export default FaceLandMarkerComponent;
