"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, {
    ComponentType,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Webcam from "react-webcam";
import {
    Alert,
    Badge,
    Box,
    CircularProgress,
    IconButton,
    styled as muiStyled,
    Typography,
} from "@mui/joy";
import styled from "styled-components";
import CachedIcon from "@mui/icons-material/Cached";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { SvgIconOwnProps } from "@mui/material";
import Avatar from "@mui/joy/Avatar";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ZoomInMapOutlinedIcon from "@mui/icons-material/ZoomInMapOutlined";
import { useFullScreenContext } from "@/context/FullScreenContext";
import ResizeToParentSizeComponent from "@/components/shared/ResizeToParentSizeComponent";

const CAMERA_FRAME_MAX_WIDTH = 700;
const CAMERA_FRAME_MAX_HEIGHT = 400;

type CameraToolbarButton = {
    icon: ComponentType<SvgIconOwnProps>;
    isLarge?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

const CameraComponent: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [mirrored, setMirrored] = useState<boolean>(false);
    const [showImages, setShowImages] = useState<boolean>(false);
    const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
    const [playScreenShotAnimation, setPlayScreenShotAnimation] =
        useState<boolean>(false);
    const fullScreenContext = useFullScreenContext();

    useEffect(() => {
        setIsCameraLoading(true);
    }, [showImages]);

    const takeScreenshot = useCallback(() => {
        if (!webcamRef.current) return;
        playScreenshotAnimation();
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setImages((prevState) => [...prevState, imageSrc!]);
    }, [webcamRef]);

    const playScreenshotAnimation = () => {
        setPlayScreenShotAnimation(true);
        const timeout = setTimeout(
            () => setPlayScreenShotAnimation(false),
            150,
        );
        if (!timeout) clearTimeout(timeout);
    };

    const cameraToolbarButtons: CameraToolbarButton[] = [
        {
            icon: CachedIcon,
            onClick: () => setMirrored(!mirrored),
        },
        {
            icon: CameraAltIcon,
            isLarge: true,
            disabled: isCameraLoading,
            onClick: () => takeScreenshot(),
        },
        {
            icon: fullScreenContext.isFullScreen
                ? ZoomInMapOutlinedIcon
                : ZoomOutMapIcon,
            onClick: () => toggleFullScreen(),
        },
    ];

    const toggleFullScreen = () => {
        if (fullScreenContext.isFullScreen) {
            fullScreenContext.exitFullScreen();
            return;
        }
        fullScreenContext.goFullScreen();
    };

    // TODO: Integrate the Google API for face recognition!
    return (
        <MainContainer minimizeRow={!showImages}>
            {showImages ? (
                <ImageListComponent
                    images={images}
                    updateImages={setImages}
                    takeNewPicture={() => setShowImages(!showImages)}
                />
            ) : (
                <React.Fragment>
                    <CameraFrame isFullScreen={fullScreenContext.isFullScreen}>
                        {isCameraLoading ? <LoadComponent /> : null}
                        <ResizeToParentSizeComponent>
                            {(parentSize) => (
                                <Webcam
                                    ref={webcamRef}
                                    mirrored={mirrored}
                                    onUserMedia={() =>
                                        setIsCameraLoading(false)
                                    }
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "var(--space-5)",
                                        height: fullScreenContext.isFullScreen
                                            ? parentSize.height
                                            : CAMERA_FRAME_MAX_HEIGHT,
                                        width: "100%",
                                        opacity: playScreenShotAnimation
                                            ? "10%"
                                            : "unset",
                                    }}
                                />
                            )}
                        </ResizeToParentSizeComponent>
                    </CameraFrame>
                    <CameraToolbarWrapper
                        isFullScreen={fullScreenContext.isFullScreen}
                    >
                        {images.length > 0 ? (
                            <Badge
                                badgeContent={images.length}
                                max={10}
                                size="lg"
                                sx={{
                                    "--Badge-ringSize": "3px",
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Avatar
                                    src={images[images.length - 1]}
                                    sx={{
                                        borderRadius: "var(--space-2)",
                                        "--Avatar-size": "var(--space-12)",
                                        border: fullScreenContext.isFullScreen
                                            ? "2px solid var(--color-white)"
                                            : "2px solid var(--color-primary)",
                                    }}
                                    onClick={() => setShowImages(!showImages)}
                                />
                            </Badge>
                        ) : (
                            <Box></Box>
                        )}
                        <CameraToolbarContainer>
                            {cameraToolbarButtons.map((button, index) => (
                                <ToolbarButtonContainer
                                    key={index}
                                    isFullScreen={
                                        fullScreenContext.isFullScreen
                                    }
                                    {...button}
                                >
                                    {
                                        <button.icon
                                            sx={{
                                                fontSize: "var(--font-4xLarge)",
                                                color: "inherit",
                                            }}
                                        />
                                    }
                                </ToolbarButtonContainer>
                            ))}
                        </CameraToolbarContainer>
                    </CameraToolbarWrapper>
                </React.Fragment>
            )}
        </MainContainer>
    );
};

type PropsImageList = {
    images: string[];
    updateImages: (images: string[]) => void;
    takeNewPicture: () => void;
};
const ImageListComponent: React.FC<PropsImageList> = (
    props: PropsImageList,
) => {
    const { images, takeNewPicture, updateImages } = props;
    const [toggleDeleteSelection, setToggleDeleteSelection] =
        useState<boolean>(false);

    const toolbarButtons: CameraToolbarButton[] = [
        {
            icon: AddAPhotoOutlinedIcon,
            onClick: () => takeNewPicture(),
        },
        {
            icon: RemoveCircleOutlineIcon,
            disabled: images.length === 0,
            onClick: () => setToggleDeleteSelection(!toggleDeleteSelection),
        },
        {
            icon: DeleteForeverOutlinedIcon,
            disabled: images.length === 0,
            onClick: () => handleDeleteAllPictures(),
        },
        {
            icon: LocalPrintshopOutlinedIcon,
            disabled: images.length > 1 || images.length === 0,
            onClick: () => handlePrintPicture(),
        },
    ];

    const handleDeletePicture = (picture: string) => {
        const newImages = images.filter((i) => i !== picture);
        updateImages(newImages);
    };

    const handleDeleteAllPictures = () => {
        updateImages([]);
    };

    const handlePrintPicture = () => {};

    return (
        <Box
            sx={{
                display: "grid",
                gap: "var(--space-4)",
                gridTemplateRows: `${CAMERA_FRAME_MAX_HEIGHT}px max-content`,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "var(--space-8)",
                    overflowY: "auto",
                    overflowX: "hidden",
                    px: 3,
                    py: 3,
                }}
            >
                {images.length === 0 ? (
                    <Alert
                        size="lg"
                        sx={{
                            boxShadow: "0 0 5px var(--color-primary)",
                        }}
                    >
                        Keine Bilder gefunden. Drücke auf{" "}
                        {<AddAPhotoOutlinedIcon color="primary" />}, um weitere
                        Bilder aufzunehmen.
                    </Alert>
                ) : null}
                {images.map((image) => (
                    <Badge
                        key={image}
                        badgeContent={<DeleteIcon sx={{ my: 1, mx: 0.3 }} />}
                        invisible={!toggleDeleteSelection}
                        color="danger"
                        className={
                            toggleDeleteSelection ? "vibration" : undefined
                        }
                        {...(toggleDeleteSelection && {
                            onClick: () => handleDeletePicture(image),
                        })}
                        sx={{
                            "--Badge-ringSize": "3px",
                        }}
                    >
                        <Avatar
                            src={image}
                            className={
                                toggleDeleteSelection ? "vibration" : undefined
                            }
                            sx={{
                                borderRadius: "var(--space-3)",
                                "--Avatar-size": "calc(1.4 * var(--space-20))",
                                border: "1px solid var(--color-primary)",
                            }}
                        />
                    </Badge>
                ))}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: "var(--space-8)",
                    justifyItems: "center",
                    justifyContent: "center",
                    alignSelf: "end",
                    justifySelf: "center",
                    boxShadow: "0 0 5px grey",
                    borderRadius: "var(--space-10)",
                    padding: "var(--space-2) var(--space-4)",
                }}
            >
                {toolbarButtons.map((button, index) => (
                    <IconButton
                        key={index}
                        sx={{
                            padding: "var(--space-4)",
                            borderRadius: "50%",
                            boxShadow: "0 0 1px grey",
                        }}
                        disabled={button.disabled}
                        onClick={button.onClick}
                    >
                        <button.icon
                            color={button.disabled ? "disabled" : "primary"}
                            sx={{
                                fontSize: "var(--font-3xLarge)",
                            }}
                        />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

const LoadComponent: React.FC = () => {
    return (
        <Box
            sx={{
                display: "grid",
                gap: "var(--space-3)",
                justifyContent: "center",
                justifyItems: "center",
                position: "absolute",
                left: "50%",
                //right: "50%",
                transform: "translate(-50%)",
            }}
        >
            <CircularProgress color="primary" />
            <Typography
                level="title-md"
                sx={{ color: "var(--color-white)" }}
                textAlign="center"
            >
                Verbindung zur Kamera wird hergestellt
            </Typography>
        </Box>
    );
};

const MainContainer = styled(Box)<{ minimizeRow: boolean }>`
    display: grid;
    gap: var(--space-4);
    justify-content: center;
    justify-items: center;
    grid-template-rows: ${(props) =>
        props.minimizeRow ? `${CAMERA_FRAME_MAX_HEIGHT}px max-content` : "1fr"};
    grid-template-columns: minmax(100%, ${CAMERA_FRAME_MAX_WIDTH}px);
`;

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
    z-index: ${(props) => (props.isFullScreen ? -3 : "unset")};
`;

const CameraToolbarWrapper = styled(Box)<{ isFullScreen: boolean }>`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-1);
    align-items: center;
    max-width: ${CAMERA_FRAME_MAX_WIDTH}px;
    padding: 0 var(--space-4);
    width: 100%;
    position: ${(props) => (props.isFullScreen ? "absolute" : "unset")};
    bottom: ${(props) => (props.isFullScreen ? "7.5%" : "unset")};
`;

const CameraToolbarContainer = muiStyled(Box)(() => ({
    display: "flex",
    gap: "var(--space-4)",
    justifyItems: "center",
    justifyContent: "center",
}));

const ToolbarButtonContainer = styled(IconButton)<{ isFullScreen: boolean }>`
    border: ${(props) =>
        props.isFullScreen
            ? "2px solid var(--color-white)"
            : "2px solid var(--color-primary)"};
    color: ${(props) =>
        props.isFullScreen ? "var(--color-white)" : "var(--color-primary)"};
    border-radius: 50%;
    padding: var(--space-3);
    &:hover {
        color: var(--color-primary);
    }
`;

export default CameraComponent;
