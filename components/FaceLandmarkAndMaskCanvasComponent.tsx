// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    AnimationFilterName,
    CAMERA_FRAME_MAX_HEIGHT,
    CAMERA_FRAME_MAX_WIDTH,
    ContainerSize,
    FilterItem,
    useAppContext,
} from "@/context/ApplicationContext";
import styled from "styled-components";
import { Box } from "@mui/joy";
import WebcamComponent from "@/components/shared/WebcamComponent";
import ResizeToParentSizeComponent from "@/components/shared/ResizeToParentSizeComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";
import Webcam from "react-webcam";
import AvatarCanvas from "@/components/shared/AvatarCanvas";
import { v4 as uuid } from "uuid";
import { AlertMessageOnCameraComponent } from "@/components/shared/AlertMessageOnCameraComponent";
import AnonymousMask from "@/models/textures/AnonymousMask";
import TigerMask from "@/models/textures/TigerMask";
import SunGlassesMask from "@/models/textures/SunGlassesMask";
import { GraduationHatMask } from "@/models/textures/GraduationHatMask";
import { QuidditchBallFromHarryPotterMask } from "@/models/textures/QuidditchBallFromHarryPotterMask";
import { RegularGlassesMask } from "@/models/textures/RegularGlassesMask";

type Props = {
    parentSize: ContainerSize;
};
const FaceLandmarkAndMaskCanvasComponent: React.FC<Props> = (props: Props) => {
    const fullScreenContext = useFullScreenContext();
    const appContext = useAppContext();

    const { parentSize } = props;
    const videoRef = useRef<Webcam | null>(null);
    const requestRef = useRef<number>(0);
    const [filterView] = useState<boolean>(true);
    const [videoSize, setVideoSize] = useState<ContainerSize | undefined>(
        undefined,
    );

    const handleClickFilterItem = (itemName: AnimationFilterName) => {
        // TODO: CHANGE MASK HIER
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === itemName),
        );
    };

    useEffect(() => {
        appContext.setFilterItems(filterItems);
        // Initial selected filter
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === "Anonym"),
        );
    }, []);

    const inDevelopmentAlertMessageComponent = () => (
        <AlertMessageOnCameraComponent
            parentWidth={parentSize.width}
            message={
                "Dieser Filter ist in Entwicklung aber wird bald verfügbar sein."
            }
        />
    );

    const filterItems: FilterItem<AnimationFilterName>[] = [
        // {
        //     id: uuid(),
        //     name: "Matrix",
        //     src: "/matrix.png",
        //     threeModel: inDevelopmentAlertMessageComponent,
        //     isActive: appContext.selectedFilterItem?.name === "Matrix",
        //     onClick: () => handleClickFilterItem("Matrix"),
        // },
        // {
        //     id: uuid(),
        //     name: "Engel & Teufel",
        //     src: "/angel-and-demon.png",
        //     threeModel: inDevelopmentAlertMessageComponent,
        //     isActive: appContext.selectedFilterItem?.name === "Engel & Teufel",
        //     onClick: () => handleClickFilterItem("Engel & Teufel"),
        // },
        {
            id: uuid(),
            name: "Anonym",
            src: "/mask.png",
            threeModel: AnonymousMask,
            isActive: appContext.selectedFilterItem?.name === "Anonym",
            onClick: () => handleClickFilterItem("Anonym"),
        },
        {
            id: uuid(),
            name: "Tiger",
            src: "/tiger.png",
            threeModel: TigerMask,
            isActive: appContext.selectedFilterItem?.name === "Tiger",
            onClick: () => handleClickFilterItem("Tiger"),
        },
        {
            id: uuid(),
            name: "Brille",
            src: "/sunglasses-black-image-thumbnail.png",
            threeModel: SunGlassesMask,
            isActive: appContext.selectedFilterItem?.name === "Brille",
            onClick: () => handleClickFilterItem("Brille"),
        },
        {
            id: uuid(),
            name: "Brille 2",
            src: "/brille-image-2-thumbnail.png",
            threeModel: RegularGlassesMask,
            isActive: appContext.selectedFilterItem?.name === "Brille 2",
            onClick: () => handleClickFilterItem("Brille 2"),
        },
        {
            id: uuid(),
            name: "Hut",
            src: "/graduation-hat-thumbnail.png",
            threeModel: GraduationHatMask,
            isActive: appContext.selectedFilterItem?.name === "Hut",
            onClick: () => handleClickFilterItem("Hut"),
        },
        {
            id: uuid(),
            name: "Quidditch Ball",
            src: "/quidditch-harry-potter-image-thumbnail.png",
            threeModel: QuidditchBallFromHarryPotterMask,
            isActive: appContext.selectedFilterItem?.name === "Quidditch Ball",
            onClick: () => handleClickFilterItem("Quidditch Ball"),
        },
        // {
        //     id: uuid(),
        //     name: "Wolke",
        //     src: "/cloud_thunder.png",
        //     threeModel: inDevelopmentAlertMessageComponent,
        //     isActive: appContext.selectedFilterItem?.name === "Wolke",
        //     onClick: () => handleClickFilterItem("Wolke"),
        // },
    ];

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
                        // requestRef.current = requestAnimationFrame(animate);
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
                        {
                            filterView ? (
                                <AvatarCanvas
                                    webcamInstance={
                                        (videoRef.current as Webcam)
                                            .video as HTMLVideoElement
                                    }
                                    //width={videoSize.width}
                                    width={parentSize.width}
                                    //height={videoSize.height}
                                    height={parentSize.height}
                                    ThreeModel={
                                        appContext.selectedFilterItem
                                            ?.threeModel!
                                    }
                                />
                            ) : null
                            // <DrawLandmarkCanvas
                            //     videoElement={
                            //         (videoRef.current as Webcam)
                            //             .video as HTMLVideoElement
                            //     }
                            //     width={videoSize.width}
                            //     height={videoSize.height}
                            // />
                        }
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

export default FaceLandmarkAndMaskCanvasComponent;
