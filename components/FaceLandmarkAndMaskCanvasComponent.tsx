"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    CAMERA_FRAME_MAX_HEIGHT,
    CAMERA_FRAME_MAX_WIDTH,
    ContainerSize,
    FilterItem,
    AnimationFilterName,
    useAppContext,
} from "@/context/ApplicationContext";
import styled from "styled-components";
import { Alert, Box } from "@mui/joy";
import WebcamComponent from "@/components/shared/WebcamComponent";
import ResizeToParentSizeComponent from "@/components/shared/ResizeToParentSizeComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";
import FaceLandmarkManager from "@/manager/FaceLandmarkManager";
import Webcam from "react-webcam";
import AvatarCanvas from "@/components/shared/AvatarCanvas";
import DrawLandmarkCanvas from "@/components/DrawLandmarkCanvas";
import { v4 as uuid } from "uuid";
import { AngelDemonFight } from "@/models/AngelDemonFight";
import { SkullMask } from "@/models/SkullMask";
import { TigerHead } from "@/models/TigerHead";
import { Html } from "@react-three/drei";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
    parentSize: ContainerSize;
};
const FaceLandmarkAndMaskCanvasComponent: React.FC<Props> = (props: Props) => {
    const fullScreenContext = useFullScreenContext();
    const appContext = useAppContext();

    const { parentSize } = props;
    const videoRef = useRef<Webcam | null>(null);
    const lastVideoTimeRef = useRef(-1);
    const requestRef = useRef<number>(0);
    const [filterView] = useState<boolean>(true);
    const [videoSize, setVideoSize] = useState<ContainerSize | undefined>(
        undefined,
    );

    // const toggleAvatarView = () => setFilterView((prev) => !prev);
    // const toggleAvatarCreatorView = () => setShowAvatarCreator((prev) => !prev);
    // const handleAvatarCreationComplete = (url: string) => {
    //     setModelUrl(url);
    //     toggleAvatarCreatorView();
    // };

    const handleClickFilterItem = (itemName: AnimationFilterName) => {
        // TODO: CHANGE MASK HIER
        //setModelUrl(itemName);
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === itemName),
        );
    };

    useEffect(() => {
        appContext.setFilterItems(filterItems);
        // Initial selected filter
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === "Totenkopf"),
        );
    }, []);

    const inDevelopmentAlertMessageComponent = () => (
        <InDevelopmentAlertMessage parentWidth={parentSize.width} />
    );
    const filterItems: FilterItem[] = [
        {
            id: uuid(),
            name: "Matrix",
            src: "/matrix.png",
            threeDModel: inDevelopmentAlertMessageComponent,
            isActive: appContext.selectedFilterItem?.name === "Matrix",
            onClick: () => handleClickFilterItem("Matrix"),
        },
        {
            id: uuid(),
            name: "Engel & Teufel",
            src: "/angel-and-demon.png",
            threeDModel: AngelDemonFight,
            isActive: appContext.selectedFilterItem?.name === "Engel & Teufel",
            onClick: () => handleClickFilterItem("Engel & Teufel"),
        },
        {
            id: uuid(),
            name: "Totenkopf",
            src: "/skull_mask_placeholder.png",
            threeDModel: SkullMask,
            isActive: appContext.selectedFilterItem?.name === "Totenkopf",
            onClick: () => handleClickFilterItem("Totenkopf"),
        },
        {
            id: uuid(),
            name: "Tiger",
            src: "/tiger.png",
            threeDModel: TigerHead,
            isActive: appContext.selectedFilterItem?.name === "Tiger",
            onClick: () => handleClickFilterItem("Tiger"),
        },
        {
            id: uuid(),
            name: "Wolke",
            src: "/cloud_thunder.png",
            threeDModel: inDevelopmentAlertMessageComponent,
            isActive: appContext.selectedFilterItem?.name === "Wolke",
            onClick: () => handleClickFilterItem("Wolke"),
        },
    ];

    const animate = () => {
        if (
            videoRef.current &&
            videoRef.current?.video &&
            videoRef.current?.video.currentTime !== lastVideoTimeRef.current
        ) {
            lastVideoTimeRef.current = videoRef.current.video.currentTime;
            try {
                const faceLandmarkManager = FaceLandmarkManager.getInstance();
                faceLandmarkManager.detectLandmarks(
                    videoRef.current.video,
                    Date.now(),
                );
            } catch (e: unknown) {
                console.error(e);
            }
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        void (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current && videoRef.current.video) {
                    videoRef.current.video.srcObject = stream;
                    videoRef.current.video.onloadedmetadata = () => {
                        setVideoSize({
                            width: videoRef.current?.video?.offsetWidth!,
                            height: videoRef.current?.video?.offsetHeight!,
                        });
                        void videoRef.current?.video?.play();

                        // Start animation once video is loaded
                        requestRef.current = requestAnimationFrame(animate);
                    };
                }
            } catch (e) {
                alert("Failed to load webcam!");
                console.error(e);
            }
        })();

        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                }}
            >
                <CameraFrame isFullScreen={fullScreenContext.isFullScreen}>
                    <ResizeToParentSizeComponent>
                        {(parentSize) => (
                            <WebcamComponent
                                ref={videoRef}
                                parentSize={parentSize}
                            />
                        )}
                    </ResizeToParentSizeComponent>
                </CameraFrame>
                {videoSize ? (
                    <>
                        {filterView ? (
                            <AvatarCanvas
                                webcamInstance={
                                    (videoRef.current as Webcam)
                                        .video as HTMLVideoElement
                                }
                                //width={videoSize.width}
                                width={parentSize.width}
                                //height={videoSize.height}
                                height={parentSize.height}
                                ThreeDModel={
                                    appContext.selectedFilterItem.threeDModel!
                                }
                            />
                        ) : (
                            <DrawLandmarkCanvas
                                videoElement={
                                    (videoRef.current as Webcam)
                                        .video as HTMLVideoElement
                                }
                                width={videoSize.width}
                                height={videoSize.height}
                            />
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};

type PropsInDevelopmentAlertMessage = {
    parentWidth: number;
};
const InDevelopmentAlertMessage: React.FC<PropsInDevelopmentAlertMessage> = (
    props: PropsInDevelopmentAlertMessage,
) => {
    const { parentWidth } = props;
    const { isFullScreen } = useFullScreenContext();

    // Da Diese Komponente in einem Canvas im Sinne von Three.js oder R3F gerendert wird,
    // muss sie den Html aus @react-three/drei als Container haben.
    return (
        <Html
            style={{
                position: "absolute",
                top: isFullScreen ? 60 : 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: parentWidth,
            }}
        >
            <div
                style={{
                    display: "grid",
                    justifyItems: "center",
                    justifyContent: "center",
                }}
            >
                <Alert
                    size="sm"
                    startDecorator={
                        <InfoIcon
                            fontSize="small"
                            sx={{ color: "var(--color-primary)" }}
                        />
                    }
                    sx={{
                        maxWidth: "480px",
                        boxShadow: "0 0 10px grey",
                        color: "var(--color-primary)",
                    }}
                >
                    Dieser Filter ist in Entwicklung und wird bald verfügbar
                    sein.
                </Alert>
            </div>
        </Html>
    );
};

const CameraFrame = styled(Box)<{ isFullScreen: boolean }>`
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: var(--color-black);
    max-width: ${(props) =>
        props.isFullScreen ? `100%` : `${CAMERA_FRAME_MAX_WIDTH}px`};
    max-height: ${(props) =>
        props.isFullScreen ? `100%` : `${CAMERA_FRAME_MAX_HEIGHT}px`};
    width: 100%;
    height: 100%;
    border-radius: var(--space-5);
    position: ${(props) => (props.isFullScreen ? "absolute" : "relative")};
    bottom: ${(props) => (props.isFullScreen ? 0 : "unset")};
    z-index: ${(props) => (props.isFullScreen ? -1 : "unset")};
`;

export default FaceLandmarkAndMaskCanvasComponent;
