import { Canvas, extend } from "@react-three/fiber";
import React, { ComponentType, Suspense, useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
extend({ OrbitControls });
import { LoadingComponent } from "@/components/shared/LoadingComponent";

interface PropsAvatarCanvas {
    width: number;
    height: number;
    ThreeDModel: ComponentType<{ webcamInstance?: HTMLVideoElement }>;
    webcamInstance: HTMLVideoElement;
}

const AvatarCanvas = (props: PropsAvatarCanvas) => {
    const { width, height, ThreeDModel, webcamInstance } = props;
    // const appContext = useAppContext();

    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const avatarManagerRef = useRef<AvatarManager>(AvatarManager.getInstance());
    // const requestRef = useRef<number>(0);

    // const animate = () => {
    //     const results = FaceLandmarkManager.getInstance().getResults();
    //     avatarManagerRef.current.updateFacialTransforms(results, true);
    //     requestRef.current = requestAnimationFrame(animate);
    // };
    //
    // useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate);
    //     return () => {
    //         cancelAnimationFrame(requestRef.current);
    //         avatarManagerRef.current.clearScene();
    //     };
    // }, []);

    // useEffect(() => {
    //     setIsLoading(true);
    //     const avatarManager = AvatarManager.getInstance();
    //     avatarManager
    //         .loadModel(url)
    //         .then(() => {
    //             setScene(avatarManagerRef.current.getScene());
    //             setIsLoading(false);
    //         })
    //         .catch((e) => {
    //             alert(e);
    //         });
    // }, [url]);

    return (
        <div
            style={{ position: "absolute", width, height }}
            id="canvas-wrapper"
        >
            <Canvas
                // gl={{ preserveDrawingBuffer: true }}
                // camera={{ fov: 20, position: [0, 0.5, 1] }}
                style={{ borderRadius: "var(--space-5)" }}
            >
                <PerspectiveCamera />
                <ambientLight />
                <directionalLight />
                {/*<OrbitControls*/}
                {/*// target={[0, 0.65, 0]}*/}
                {/*// enableDamping={false}*/}
                {/*// enableRotate={false}*/}
                {/*// enableZoom={false}*/}
                {/*// enablePan={false}*/}
                {/*/>*/}
                {/*{scene ? <MeshComponent scene={scene} /> : null}*/}
                <Suspense
                    fallback={
                        <LoadingComponent
                            message={"Das 3D-Modell wird geladen..."}
                        />
                    }
                >
                    <ThreeDModel webcamInstance={webcamInstance} />
                </Suspense>
                {/*{isLoading ? (*/}
                {/*    <Float floatIntensity={2} speed={2}>*/}
                {/*        <Text3D*/}
                {/*            font={"/assets/fonts/Open_Sans_Condensed_Bold.json"}*/}
                {/*            scale={0.04}*/}
                {/*            position={[-0.2, 0.6, 0]}*/}
                {/*            bevelEnabled*/}
                {/*            bevelSize={0.05}*/}
                {/*        >*/}
                {/*            Filter wird geladen...*/}
                {/*            <meshNormalMaterial />*/}
                {/*        </Text3D>*/}
                {/*    </Float>*/}
                {/*) : null}*/}
            </Canvas>
        </div>
    );
};

export default AvatarCanvas;
