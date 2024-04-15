import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";
import React, { ComponentType, Suspense } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { LoadingComponent } from "@/components/shared/LoadingComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";
import { TensorflowModelPositioning } from "@/hooks/TensorflowModelPositioning";
import {ThreeModelType} from "@/context/ApplicationContext";

/**
 * Tree Shaking the THREEjs library to prevent runtime error.
 *
 * @see https://docs.pmnd.rs/react-three-fiber/api/canvas#tree-shaking
 *
 */
extend(THREE);

interface PropsAvatarCanvas {
    width: number;
    height: number;
    ThreeModel: ThreeModelType;
    webcamInstance: HTMLVideoElement;
}

const AvatarCanvas = (props: PropsAvatarCanvas) => {
    const { width, height, ThreeModel, webcamInstance } = props;

    const { isFullScreen } = useFullScreenContext();

    return (
        <div
            style={{ position: "absolute", width, height }}
            id="canvas-wrapper"
        >
            <Canvas
                style={{ borderRadius: "var(--space-5)", width, height }}
            >
                <PerspectiveCamera />
                <ambientLight />
                <directionalLight />
                <hemisphereLight />
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
                        <Html
                            style={{
                                position: "absolute",
                                top: isFullScreen ? 60 : -60,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width,
                            }}
                        >
                            <LoadingComponent
                                message={"Das 3D-Modell wird geladen..."}
                            />
                        </Html>
                    }
                >
                    <TensorflowModelPositioning video={webcamInstance} ThreeModel={ThreeModel} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default AvatarCanvas;
