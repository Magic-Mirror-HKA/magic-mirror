"use client";
import React, { useRef } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import Webcam from "react-webcam";

const FilterPage: React.FC = () => {
    const camRef = useRef<Webcam | null>(null);

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
