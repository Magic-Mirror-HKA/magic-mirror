"use client";
import React from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import { useFullScreenContext } from "@/context/FullScreenContext";
import { SxProps } from "@mui/joy/styles/types";

const CameraPage: React.FC = () => {
    const fullScreenContext = useFullScreenContext();
    const pageHeaderTitleStyles: SxProps = {
        color: fullScreenContext.isFullScreen ? "var(--color-white)" : "unset",
        //textShadow: "var(--color-white) 1px 0 1px",
    };
    const pageHeaderButtonsStyles: SxProps = {
        color: fullScreenContext.isFullScreen
            ? "var(--color-white)"
            : "var(--color-primary)",
        border: fullScreenContext.isFullScreen
            ? "2px solid var(--color-white)"
            : "2px solid var(--color-primary)",
    };

    return (
        <PageContentWrapperComponent
            title={"Kamera"}
            showBackButton
            titleStyle={pageHeaderTitleStyles}
            buttonsStyle={pageHeaderButtonsStyles}
        >
            <CameraComponent showFilters={false} />
        </PageContentWrapperComponent>
    );
};

export default CameraPage;
