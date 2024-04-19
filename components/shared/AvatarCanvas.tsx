// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars, import/no-named-as-default, react/display-name */
import * as THREE from "three";
import { Canvas, extend, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { LoadingComponent } from "@/components/shared/LoadingComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";
import { TensorflowModelPositioning } from "@/components/shared/TensorflowModelPositioning";
import { ThreeModelType, useAppContext } from "@/context/ApplicationContext";

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

    const appContext = useAppContext();

    const { isFullScreen } = useFullScreenContext();

    const [webGLRenderer, setWebGLRenderer] = useState<
        THREE.WebGLRenderer | undefined
    >(undefined);

    useEffect(() => {
        if (!webGLRenderer) return;
        appContext.setWebGLRenderer(webGLRenderer);
    }, [webGLRenderer]);

    return (
        <div
            style={{ position: "absolute", width, height }}
            id="canvas-wrapper"
        >
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                style={{ borderRadius: "var(--space-5)", width, height }}
            >
                <PerspectiveCamera />
                <ambientLight />
                <directionalLight />
                <pointLight intensity={4} color={"black"} />
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
                    <TensorflowModelPositioning
                        video={webcamInstance}
                        ThreeModel={ThreeModel}
                    />
                    <ThreeStateComponent setRenderer={setWebGLRenderer} />
                </Suspense>
            </Canvas>
        </div>
    );
};

type PropsThreeState = {
    setRenderer: (renderer: THREE.WebGLRenderer) => void;
};
const ThreeStateComponent: React.FC<PropsThreeState> = (
    props: PropsThreeState,
) => {
    const { setRenderer } = props;

    const { gl } = useThree();

    useEffect(() => {
        setRenderer(gl);
    }, [gl]);

    return null;
};

export default AvatarCanvas;
