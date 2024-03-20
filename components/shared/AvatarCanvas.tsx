import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";
import React, { ComponentType, Suspense } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { LoadingComponent } from "@/components/shared/LoadingComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";

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
    ThreeDModel: ComponentType<{ webcamInstance?: HTMLVideoElement }>;
    webcamInstance: HTMLVideoElement;
}

const AvatarCanvas = (props: PropsAvatarCanvas) => {
    const { width, height, ThreeDModel, webcamInstance } = props;

    const { isFullScreen } = useFullScreenContext();

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
            style={{ borderRadius: "var(--space-5)", width, height }}
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
