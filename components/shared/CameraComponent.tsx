"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars,  @typescript-eslint/no-unused-vars, import/no-named-as-default, react/display-name */
import React, {
    CSSProperties,
    ForwardedRef,
    forwardRef,
    MutableRefObject,
    ReactNode,
    useState,
} from "react";
import Webcam from "react-webcam";
import { Box } from "@mui/joy";
import styled from "styled-components";
import CachedIcon from "@mui/icons-material/Cached";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import { useFullScreenContext } from "@/context/FullScreenContext";
import ResizeToParentSizeComponent from "@/components/shared/ResizeToParentSizeComponent";
import {
    CAMERA_FRAME_MAX_HEIGHT,
    CAMERA_FRAME_MAX_WIDTH,
    CameraToolbarButton,
    ContainerSize,
    useAppContext,
    videoToHtmlCanvas,
} from "@/context/ApplicationContext";
import dynamic from "next/dynamic";
import { LoadingComponent } from "@/components/shared/LoadingComponent";
import { FilterListComponent } from "@/components/FilterListComponent";
import { CameraToolBarComponent } from "@/components/CameraToolBarComponent";
import { OUTPUT_CANVAS_ID } from "@/components/shared/CanvasComponent";
import { v4 as uuid } from "uuid";

const FaceLandmarkAndMaskCanvasComponent = dynamic(
    () => {
        return import("../FaceLandmarkAndMaskCanvasComponent");
    },
    { ssr: false },
);

type Props = {
    showFilters?: boolean;
    showCustomBackground?: boolean;
    outputCanvas?: ReactNode | undefined;
};

const CameraComponent = forwardRef(
    (props: Props, ref: ForwardedRef<Webcam> | undefined) => {
        const { showFilters, showCustomBackground, outputCanvas } = props;

        const fullScreenContext = useFullScreenContext();
        const appContext = useAppContext();

        const [mirrored, setMirrored] = useState<boolean>(false);
        // const [showImages, setShowImages] = useState<boolean>(false);
        const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
        const [playScreenShotAnimation, setPlayScreenShotAnimation] =
            useState<boolean>(false);

        const takeScreenshot = async () => {
            playScreenshotAnimation();
            let imageSrc = "";

            imageSrc = (
                ref as MutableRefObject<Webcam>
            ).current?.getScreenshot()!;

            if (outputCanvas !== undefined) {
                const canvas = document.getElementById(
                    OUTPUT_CANVAS_ID,
                ) as HTMLCanvasElement;
                imageSrc = canvas.toDataURL();
            }

            if (showFilters) {
                if (!appContext.webGLRenderer) return;

                const videoEl = document.getElementById(
                    "webcam-with-mask",
                ) as HTMLVideoElement;
                const canvas = videoToHtmlCanvas(videoEl);

                const combinedImage = await appContext.combineImagesFromCanvas(
                    canvas,
                    appContext.webGLRenderer.domElement,
                );
                appContext.addImage(combinedImage);
                return;
            }

            appContext.addImage({ id: uuid(), source: imageSrc });
        };

        const playScreenshotAnimation = () => {
            setPlayScreenShotAnimation(true);
            const timeout = setTimeout(
                () => setPlayScreenShotAnimation(false),
                150,
            );
            if (!timeout) clearTimeout(timeout);
        };

        const cameraToolbarButtons: CameraToolbarButton[] = [
            // ...(showCustomBackground
            //     ? []
            //     : [
            //           {
            //               icon: CachedIcon,
            //               onClick: () => setMirrored(!mirrored),
            //           },
            //     ]
            // ),
            {
                icon: CameraAltIcon,
                isLarge: true,
                disabled: isCameraLoading,
                onClick: () => void takeScreenshot(),
            },
            // {
            //     icon: fullScreenContext.isFullScreen
            //         ? ZoomInMapOutlinedIcon
            //         : ZoomOutMapIcon,
            //     onClick: () => toggleFullScreen(),
            // },
        ];

        const toggleFullScreen = () => {
            if (fullScreenContext.isFullScreen) {
                fullScreenContext.exitFullScreen();
                return;
            }
            fullScreenContext.goFullScreen();
        };

        const getWebcamStyle = (parentSize: ContainerSize): CSSProperties => {
            return {
                display:
                    showFilters || outputCanvas !== undefined
                        ? "none"
                        : "block",
                objectFit: "cover",
                borderRadius: "var(--space-5)",
                height: parentSize.height,
                width: parentSize.width,
                opacity: playScreenShotAnimation ? "10%" : "unset",
            };
        };

        const resolveFilterComponent =
            showFilters || showCustomBackground ? (
                <FilterListComponent
                    filterItems={appContext.filterItems}
                    selectedFilterItem={appContext.selectedFilterItem}
                />
            ) : null;

        // TODO: Integrate the Google API for face recognition!.
        // TODO: Propose to Steffi the possibility of using software based face recognition only.
        return (
            <MainContainer>
                <React.Fragment>
                    <CameraFrame isFullScreen={fullScreenContext.isFullScreen}>
                        {isCameraLoading ? (
                            <LoadingComponent message="Verbindung zur Kamera wird hergestellt" />
                        ) : null}
                        {!fullScreenContext.isFullScreen
                            ? resolveFilterComponent
                            : null}
                        <ResizeToParentSizeComponent>
                            {(parentSize) => (
                                <React.Fragment>
                                    {showFilters ? (
                                        <div />
                                    ) : (
                                        <Webcam
                                            id="webcam"
                                            ref={ref}
                                            mirrored={mirrored}
                                            onUserMedia={() =>
                                                setIsCameraLoading(false)
                                            }
                                            style={getWebcamStyle(parentSize)}
                                        />
                                    )}
                                    {outputCanvas && outputCanvas}
                                    {showFilters ? (
                                        // <FaceLandMarkerComponent
                                        //     webcamRef={webcamRefAsState}
                                        //     canvasStyles={{
                                        //         ...getCameraFrameStyle(
                                        //             parentSize,
                                        //         ),
                                        //     }}
                                        // />
                                        <FaceLandmarkAndMaskCanvasComponent
                                            parentSize={parentSize}
                                            setIsLoading={setIsCameraLoading}
                                        />
                                    ) : null}
                                </React.Fragment>
                            )}
                        </ResizeToParentSizeComponent>
                    </CameraFrame>
                    {fullScreenContext.isFullScreen
                        ? resolveFilterComponent
                        : null}
                    <CameraToolBarComponent
                        buttons={cameraToolbarButtons}
                        images={appContext.images}
                    />
                </React.Fragment>
            </MainContainer>
        );
    },
);

const MainContainer = styled(Box)`
    display: grid;
    gap: var(--space-4);
    justify-content: center;
    justify-items: center;
    grid-template-rows: ${CAMERA_FRAME_MAX_HEIGHT}px max-content;
    grid-template-columns: minmax(100%, ${CAMERA_FRAME_MAX_WIDTH}px);
`;
const CameraFrame = styled(Box)<{ isFullScreen: boolean }>`
    display: grid;
    align-items: center;
    justify-items: center;
    box-shadow: ${(props) => (props.isFullScreen ? "unset" : "0 0 20px grey")};
    background-color: var(--color-black);
    max-width: ${(props) =>
        props.isFullScreen ? `100%` : `${CAMERA_FRAME_MAX_WIDTH}px`};
    max-height: ${(props) =>
        props.isFullScreen ? `100%` : `${CAMERA_FRAME_MAX_HEIGHT}px`};
    width: 100%;
    height: ${(props) =>
        props.isFullScreen ? `100%` : `${CAMERA_FRAME_MAX_HEIGHT}px`};
    border-radius: var(--space-5);
    position: ${(props) => (props.isFullScreen ? "absolute" : "relative")};
    bottom: ${(props) => (props.isFullScreen ? 0 : "unset")};
    z-index: ${(props) => (props.isFullScreen ? -1 : "unset")};
`;

export default CameraComponent;
