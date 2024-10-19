"use client";
import React, { useEffect, useRef } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import Webcam from "react-webcam";
import { useFullScreenContext } from "@/context/FullScreenContext";

const FilterPage: React.FC = () => {
    const camRef = useRef<Webcam | null>(null);
    const fullScreenContext = useFullScreenContext();

    useEffect(() => {
        if (fullScreenContext.isFullScreen) return;
        fullScreenContext.goFullScreen();
    }, [fullScreenContext.isFullScreen]);

    return (
        <PageContentWrapperComponent title={"Animationen"} showBackButton>
            <CameraComponent ref={camRef} showFilters={true} />
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,,@typescript-eslint/no-unsafe-call */}
            {/*<Load3DObject />*/}
            {/*<ThreeDObject />*/}
            {/*<ThreeDObjectUsingThreeDrei />*/}
            {/*<FaceLandmarkCanvasComponent />*/}
        </PageContentWrapperComponent>
    );
};

export default FilterPage;
