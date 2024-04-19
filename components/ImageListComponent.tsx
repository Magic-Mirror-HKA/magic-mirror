"use client";
import React from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { Alert, AspectRatio, Box, IconButton } from "@mui/joy";
import styled from "styled-components";
import {
    CAMERA_FRAME_MAX_HEIGHT,
    CAMERA_FRAME_MAX_WIDTH,
    CameraToolbarButton,
    useAppContext,
} from "@/context/ApplicationContext";
import { useRouter } from "next/navigation";

export const ImageListComponent: React.FC = () => {
    const appContext = useAppContext();

    const { images, clearImages } = appContext;

    const router = useRouter();

    const toolbarButtons: CameraToolbarButton[] = [
        {
            icon: AddAPhotoOutlinedIcon,
            onClick: () => router.back(),
        },
        // {
        //     icon: RemoveCircleOutlineIcon,
        //     disabled: images.length === 0,
        //     onClick: () => setToggleDeleteSelection(!toggleDeleteSelection),
        // },
        {
            icon: DeleteForeverOutlinedIcon,
            disabled: images.length === 0,
            onClick: clearImages,
        },
        {
            icon: LocalPrintshopOutlinedIcon,
            disabled: images.length > 1 || images.length === 0,
            onClick: () => void handlePrintPicture(),
        },
    ];

    // TODO: Implement printing
    const handlePrintPicture = async () => {
        await appContext.printImage(images[0]);
    };

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
                    <AspectRatio
                        objectFit={"cover"}
                        key={image.id}
                        sx={{
                            "--Badge-ringSize": "3px",
                            borderRadius: "var(--space-4)",
                            width: `${CAMERA_FRAME_MAX_WIDTH}px`,
                            boxShadow: "0 0 5px grey",
                        }}
                    >
                        <img
                            src={image.source}
                            style={{
                                borderRadius: "var(--space-4)",
                                // border: "1px solid var(--color-primary)",
                            }}
                            alt={"picture"}
                        />
                    </AspectRatio>
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
                                fontSize: "var(--font-2xLarge)",
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

const AlertAndAvatarListContainer = styled(Box)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-8);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 var(--space-3);
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
