import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import {
    Float,
    OrbitControls,
    PerspectiveCamera,
    Text3D,
} from "@react-three/drei";
import * as THREE from "three";
import AvatarManager from "@/manager/AvatarManager";
import FaceLandmarkManager from "@/manager/FaceLandmarkManager";

interface PropsAvatarCanvas {
    width: number;
    height: number;
    url: string;
}

type PropsMeshComponent = {
    scene: THREE.Scene;
};
const MeshComponent: React.FC<PropsMeshComponent> = (
    props: PropsMeshComponent,
) => {
    const { gl, scene, camera } = useThree();
    gl.render(scene, camera);
    const { scene: inputScene } = props;

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.open(gl.domElement.toDataURL(), "_blank");
    //         console.log(gl.domElement.toDataURL());
    //     }, [9000]);
    // }, []);

    const ref = useRef();
    // const handleClick = () => {
    //     // let renderer = new THREE.WebGLRenderer({
    //     //     antialias: true,
    //     //     //preserveDrawingBuffer: true
    //     // });
    //
    //     //w.document.body.style.backgroundColor = "red";
    //     const img = new Image();
    //     // Without 'preserveDrawingBuffer' set to true, we must render now
    //     // renderer.render(scene, camera);
    //     img.src = gl.domElement.toDataURL();
    //     //console.log(gl.domElement.toDataURL())
    //     const imgTest = new Image(100, 100);
    //     imgTest.src =
    //         "https://images.unsplash.com/photo-1707653056939-5bf9eae73228?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    //     writeImageToCanvas(imgTest, gl.domElement);
    // };
    //
    // function convertImageToDataURL(imageElement: HTMLImageElement) {
    //     // Check if the image is loaded
    //     const canvas = document.createElement("canvas");
    //     canvas.width = imageElement.width;
    //     canvas.height = imageElement.height;
    //     const ctx = canvas.getContext("2d")!;
    //     ctx.drawImage(imageElement, 0, 0);
    //     return canvas.toDataURL("image/png"); // Adjust format and quality as needed
    // }
    //
    // const writeImageToCanvas = (
    //     image: HTMLImageElement,
    //     cvs: HTMLCanvasElement,
    // ) => {
    //     const newCanvas = document.createElement("canvas");
    //     newCanvas.width = image.width;
    //     newCanvas.height = image.height;
    //
    //     const newCanvasContext = newCanvas.getContext("2d")!;
    //
    //     newCanvasContext?.drawImage(cvs, 0, 0, image.width, image.height);
    //     newCanvasContext?.drawImage(image, 0, 0, image.width, image.height);
    //
    //     console.log(newCanvas?.toDataURL());
    //
    //     // return new Promise<HTMLImageElement>((resolve, reject) => {
    //     //     img.onload = () => {
    //     //         cvs.width = img.width;
    //     //         cvs.height = img.height;
    //     //         const ctx = cvs.getContext('2d')!;
    //     //         ctx.drawImage(img, 0, 0);
    //     //         console.log(ctx.canvas.toDataURL());
    //     //         resolve(img);
    //     //     };
    //     //     img.src = image.src;
    //     //     img.onerror = () => {
    //     //         reject("The image could not be loaded");
    //     //     }
    //     // });
    // };

    //return <primitive ref={ref} object={inputScene} onClick={handleClick} />;
    return <primitive ref={ref} object={inputScene} />;
};

const AvatarCanvas = (props: PropsAvatarCanvas) => {
    const [scene, setScene] = useState<THREE.Scene | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const avatarManagerRef = useRef<AvatarManager>(AvatarManager.getInstance());
    const requestRef = useRef<number>(0);
    const { width, height, url } = props;

    const animate = () => {
        const results = FaceLandmarkManager.getInstance().getResults();
        avatarManagerRef.current.updateFacialTransforms(results, true);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
            avatarManagerRef.current.clearScene();
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const avatarManager = AvatarManager.getInstance();
        avatarManager
            .loadModel(url)
            .then(() => {
                setScene(avatarManagerRef.current.getScene());
                setIsLoading(false);
            })
            .catch((e) => {
                alert(e);
            });
    }, [url]);

    return (
        <div
            style={{ position: "absolute", width, height }}
            id="canvas-wrapper"
        >
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                camera={{ fov: 20, position: [0, 0.5, 1] }}
            >
                <PerspectiveCamera />
                <ambientLight />
                <directionalLight />
                <OrbitControls
                    target={[0, 0.6, 0]}
                    enableDamping={false}
                    enableRotate={false}
                    enableZoom={false}
                    enablePan={false}
                />
                {scene ? <MeshComponent scene={scene} /> : null}
                {isLoading ? (
                    <Float floatIntensity={2} speed={2}>
                        <Text3D
                            font={"/assets/fonts/Open_Sans_Condensed_Bold.json"}
                            scale={0.04}
                            position={[-0.2, 0.6, 0]}
                            bevelEnabled
                            bevelSize={0.05}
                        >
                            Filter wird geladen...
                            <meshNormalMaterial />
                        </Text3D>
                    </Float>
                ) : null}
            </Canvas>
        </div>
    );
};

export default AvatarCanvas;
