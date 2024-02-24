"use client";
import React, { useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { Alert, Badge, Box, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/joy/Avatar";
import styled from "styled-components";
import {
    CAMERA_FRAME_MAX_HEIGHT,
    CameraToolbarButton,
    useAppContext,
} from "@/context/ApplicationContext";
import { useRouter } from "next/navigation";

export const ImageListComponent: React.FC = () => {
    const appContext = useAppContext();

    const { images, removeImage, clearImages } = appContext;

    const router = useRouter();

    const [toggleDeleteSelection, setToggleDeleteSelection] =
        useState<boolean>(false);

    const toolbarButtons: CameraToolbarButton[] = [
        {
            icon: AddAPhotoOutlinedIcon,
            onClick: () => router.back(),
        },
        {
            icon: RemoveCircleOutlineIcon,
            disabled: images.length === 0,
            onClick: () => setToggleDeleteSelection(!toggleDeleteSelection),
        },
        {
            icon: DeleteForeverOutlinedIcon,
            disabled: images.length === 0,
            onClick: clearImages,
        },
        {
            icon: LocalPrintshopOutlinedIcon,
            disabled: images.length > 1 || images.length === 0,
            onClick: () => handlePrintPicture(),
        },
    ];

    // TODO: Implement printing
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
                            onClick: () => removeImage(image),
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
