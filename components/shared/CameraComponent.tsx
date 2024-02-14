"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, {
    ComponentType,
    CSSProperties,
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
import { ContainerSize } from "@/context/ApplicationContext";
import dynamic from "next/dynamic";
//import FaceLandMarkerComponent from "@/components/filters/FaceLandMarkerComponent";

const FaceLandmarkCanvasComponent = dynamic(
    () => {
        return import("../FaceLandmarkCanvasComponent");
    },
    { ssr: false },
);

const CAMERA_FRAME_MAX_WIDTH = 700;
const CAMERA_FRAME_MAX_HEIGHT = 400;

type CameraToolbarButton = {
    icon: ComponentType<SvgIconOwnProps>;
    isLarge?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

type FilterName = "Matrix" | "Engel & Teufel" | "Totenkopf" | "Tiger" | "Wolke";

type FilterItem = {
    name: FilterName;
    src: string;
    isActive: boolean;
    onClick?: () => void;
};

type Props = {
    showFilters: boolean;
};

const CameraComponent: React.FC<Props> = (props: Props) => {
    const webcamRef = useRef<Webcam | null>(null);
    const landmarkCanvasRef = useRef<{ landmarkCanvasRef: Webcam } | null>(
        null,
    );
    // const [webcamRefAsState, setWebcamRefAsState] = useState<Webcam | null>(
    //     null,
    // );
    const [images, setImages] = useState<string[]>([]);
    const [mirrored, setMirrored] = useState<boolean>(false);
    const [showImages, setShowImages] = useState<boolean>(false);
    const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
    const [playScreenShotAnimation, setPlayScreenShotAnimation] =
        useState<boolean>(false);
    const fullScreenContext = useFullScreenContext();
    //const { gl, scene, camera } = useThree()

    const [selectedFilterItem, setSelectedFilterItem] =
        useState<FilterName>("Totenkopf");

    const { showFilters } = props;

    useEffect(() => {
        setIsCameraLoading(true);
    }, [showImages]);

    const takeScreenshot = () => {
        //if (!webcamRef.current) return;
        playScreenshotAnimation();
        let imageSrc = "";
        //console.log(gl.domElement);
        if (showFilters && landmarkCanvasRef.current) {
            //imageSr = gl.domElement.toDataURL();
            //setImages((prevState) => [...prevState, imageSrc!]);
            return;
        }
        imageSrc = webcamRef.current!.getScreenshot()!;
        setImages((prevState) => [...prevState, imageSrc]);
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

    const filterItems: FilterItem[] = [
        {
            name: "Matrix",
            src: "/matrix.png",
            isActive: selectedFilterItem === "Matrix",
            onClick: () => setSelectedFilterItem("Matrix"),
        },
        {
            name: "Engel & Teufel",
            src: "/angel-and-devil.png",
            isActive: selectedFilterItem === "Engel & Teufel",
            onClick: () => setSelectedFilterItem("Engel & Teufel"),
        },
        {
            name: "Totenkopf",
            src: "/skull_mask_placeholder.png",
            isActive: selectedFilterItem === "Totenkopf",
            onClick: () => setSelectedFilterItem("Totenkopf"),
        },
        {
            name: "Tiger",
            src: "/tiger.png",
            isActive: selectedFilterItem === "Tiger",
            onClick: () => setSelectedFilterItem("Tiger"),
        },
        {
            name: "Wolke",
            src: "/cloud_thunder.png",
            isActive: selectedFilterItem === "Wolke",
            onClick: () => setSelectedFilterItem("Wolke"),
        },
    ];

    const getCameraFrameStyle = (parentSize: ContainerSize): CSSProperties => {
        return {
            objectFit: "cover",
            borderRadius: "var(--space-5)",
            height: fullScreenContext.isFullScreen
                ? parentSize.height
                : CAMERA_FRAME_MAX_HEIGHT,
            width: "100%",
            opacity: playScreenShotAnimation ? "10%" : "unset",
        };
    };

    const resolveFilterComponent = showFilters ? (
        <FilterListComponent filterItems={filterItems} />
    ) : null;

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
                        {!fullScreenContext.isFullScreen
                            ? resolveFilterComponent
                            : null}
                        <ResizeToParentSizeComponent>
                            {(parentSize) => (
                                <React.Fragment>
                                    <Webcam
                                        id="webcam"
                                        ref={webcamRef}
                                        mirrored={mirrored}
                                        onUserMedia={() =>
                                            setIsCameraLoading(false)
                                        }
                                        style={{
                                            display: showFilters
                                                ? "none"
                                                : "block",
                                            ...getCameraFrameStyle(parentSize),
                                        }}
                                    />
                                    {showFilters ? (
                                        // <FaceLandMarkerComponent
                                        //     webcamRef={webcamRefAsState}
                                        //     canvasStyles={{
                                        //         ...getCameraFrameStyle(
                                        //             parentSize,
                                        //         ),
                                        //     }}
                                        // />
                                        <FaceLandmarkCanvasComponent
                                            parentSize={parentSize}
                                        />
                                    ) : null}
                                </React.Fragment>
                            )}
                        </ResizeToParentSizeComponent>
                    </CameraFrame>
                    {fullScreenContext.isFullScreen
                        ? resolveFilterComponent
                        : null}
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
                            <div></div>
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
        <ImageListContainer height={CAMERA_FRAME_MAX_HEIGHT}>
            <AlertAndAvatarListContainer>
                {images.length === 0 ? (
                    <AlertContainer size="lg">
                        Keine Bilder gefunden. Drücke auf{" "}
                        {<AddAPhotoOutlinedIcon color="primary" />}, um weitere
                        Bilder aufzunehmen.
                    </AlertContainer>
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
            </AlertAndAvatarListContainer>
            <IconListContainer>
                {toolbarButtons.map((button, index) => (
                    <IconListItemIconButton
                        key={index}
                        disabled={button.disabled}
                        onClick={button.onClick}
                    >
                        <button.icon
                            color={button.disabled ? "disabled" : "primary"}
                            sx={{
                                fontSize: "var(--font-3xLarge)",
                            }}
                        />
                    </IconListItemIconButton>
                ))}
            </IconListContainer>
        </ImageListContainer>
    );
};

const ImageListContainer = styled(Box)<{ height: number }>`
    display: grid;
    gap: var(--space-4);
    grid-template-rows: ${(props) => props.height}px max-content;
`;

const LoadComponent: React.FC = () => {
    return (
        <LoadingContainer>
            <CircularProgress color="primary" />
            <Typography
                level="title-md"
                sx={{ color: "var(--color-white)" }}
                textAlign="center"
            >
                Verbindung zur Kamera wird hergestellt
            </Typography>
        </LoadingContainer>
    );
};

type PropsFilterList = {
    filterItems: FilterItem[];
};
const FilterListComponent: React.FC<PropsFilterList> = (
    props: PropsFilterList,
) => {
    const { filterItems } = props;
    return (
        <FilterListContainer>
            {filterItems.map((f, index) => (
                <div
                    key={index}
                    style={{
                        display: "grid",
                        gap: 0.25,
                        justifyContent: "center",
                        justifyItems: "center",
                        width: "100px",
                        // "&:hover": {
                        //     cursor: "pointer",
                        // },
                    }}
                    onClick={f.onClick}
                >
                    <Avatar
                        src={f.src}
                        size="lg"
                        sx={{
                            border: f.isActive
                                ? "2px solid var(--color-primary)"
                                : "2px solid var(--color-white)",
                        }}
                    />
                    <Typography
                        sx={{
                            color: "var(--color-white)",
                            backgroundColor: f.isActive
                                ? "var(--color-primary)"
                                : "unset",
                            p: "var(--space-1) var(--space-2)",
                            borderRadius: "var(--space-1)",
                        }}
                        textAlign="center"
                        noWrap
                    >
                        {f.name}
                    </Typography>
                </div>
            ))}
        </FilterListContainer>
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
    z-index: ${(props) => (props.isFullScreen ? -1 : "unset")};
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

const LoadingContainer = styled(Box)`
    display: grid;
    gap: var(--space-3);
    justify-content: center;
    justify-items: center;
    position: absolute;
    left: 50%;
    //right: "50%",
    transform: translate(-50%);
`;

const FilterListContainer = styled(Box)`
    display: flex;
    gap: var(--space-5);
    //flex-wrap: wrap;
    justify-content: center;
    justify-items: center;
    position: absolute;
    top: 70%;
    transform: translateY(-30%);
    //right: 15%;
    //transform: translateX(95%);
    max-width: 85%;
    //max-height: 90%;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 5;
`;

const AlertAndAvatarListContainer = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-8);
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--space-3);
`;

const AlertContainer = styled(Alert)`
    box-shadow: 0 0 5px var(--color-primary);
`;

const IconListContainer = styled(Box)`
    display: flex;
    gap: var(--space-8);
    justify-items: center;
    justify-content: center;
    align-self: end;
    justify-self: center;
    box-shadow: 0 0 5px grey;
    border-radius: var(--space-10);
    padding: var(--space-2) var(--space-4);
`;

const IconListItemIconButton = styled(IconButton)`
    padding: var(--space-4);
    border-radius: 50%;
    box-shadow: 0 0 1px grey;
`;

export default CameraComponent;
