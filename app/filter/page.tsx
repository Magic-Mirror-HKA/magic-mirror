"use client";
import React from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import { SxProps } from "@mui/joy/styles/types";
import { useFullScreenContext } from "@/context/FullScreenContext";
//import dynamic from "next/dynamic";

// const FaceLandmarkCanvasComponent = dynamic(
//     () => {
//         return import("../../components/FaceLandmarkCanvasComponent");
//     },
//     { ssr: false },
// );
const FilterPage: React.FC = () => {
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
            title={"Animationen"}
            showBackButton
            titleStyle={pageHeaderTitleStyles}
            buttonsStyle={pageHeaderButtonsStyles}
        >
            <CameraComponent showFilters={true} />
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,,@typescript-eslint/no-unsafe-call */}
            {/*<Load3DObject />*/}
            {/*<ThreeDObject />*/}
            {/*<ThreeDObjectUsingThreeDrei />*/}
            {/*<FaceLandmarkCanvasComponent />*/}
        </PageContentWrapperComponent>
    );
};

export default FilterPage;
