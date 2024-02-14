"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    CAMERA_FRAME_MAX_HEIGHT,
    CAMERA_FRAME_MAX_WIDTH,
    ContainerSize,
} from "@/context/ApplicationContext";
import styled from "styled-components";
import { Box } from "@mui/joy";
import WebcamComponent from "@/components/shared/WebcamComponent";
import ResizeToParentSizeComponent from "@/components/shared/ResizeToParentSizeComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";
import FaceLandmarkManager from "@/manager/FaceLandmarkManager";
import Webcam from "react-webcam";
import AvatarCanvas from "@/components/shared/AvatarCanvas";
import DrawLandmarkCanvas from "@/components/DrawLandmarkCanvas";

type Props = {
    parentSize: ContainerSize;
};
const FaceLandmarkCanvasComponent: React.FC<Props> = (props: Props) => {
    const videoRef = useRef<Webcam | null>(null);
    const lastVideoTimeRef = useRef(-1);
    const requestRef = useRef<number>(0);
    const [filterView] = useState<boolean>(true);
    //const [showAvatarCreator, setShowAvatarCreator] = useState<boolean>(false);
    const [modelUrl] = useState("/skull_mask_clean.glb");
    const [videoSize, setVideoSize] = useState<ContainerSize | undefined>(
        undefined,
    );
    const fullScreenContext = useFullScreenContext();

    const { parentSize } = props;

    //const toggleAvatarView = () => setFilterView((prev) => !prev);

    //const toggleAvatarCreatorView = () => setShowAvatarCreator((prev) => !prev);

    // const handleAvatarCreationComplete = (url: string) => {
    //     setModelUrl(url);
    //     toggleAvatarCreatorView();
    // };

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
                                //width={videoSize.width}
                                width={parentSize.width}
                                //height={videoSize.height}
                                height={parentSize.height}
                                url={modelUrl}
                            />
                        ) : (
                            <DrawLandmarkCanvas
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

export default FaceLandmarkCanvasComponent;
