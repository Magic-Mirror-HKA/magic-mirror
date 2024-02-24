import React from "react";
import { Badge, Box, IconButton } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import {
    CAMERA_FRAME_MAX_WIDTH,
    CameraToolbarButton,
} from "@/context/ApplicationContext";
import { useFullScreenContext } from "@/context/FullScreenContext";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/joy/styles";
import { useRouter } from "next/navigation";

type Props = {
    buttons: CameraToolbarButton[];
    images: string[];
};
export const CameraToolBarComponent: React.FC<Props> = (props: Props) => {
    const fullScreenContext = useFullScreenContext();
    const { buttons, images } = props;
    const router = useRouter();

    return (
        <CameraToolbarWrapper isFullScreen={fullScreenContext.isFullScreen}>
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
                        onClick={() => router.push("/camera/images")}
                    />
                </Badge>
            ) : (
                <div></div>
            )}
            <CameraToolbarContainer>
                {buttons.map((button, index) => (
                    <ToolbarButtonContainer
                        key={index}
                        isFullScreen={fullScreenContext.isFullScreen}
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
    );
};

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
