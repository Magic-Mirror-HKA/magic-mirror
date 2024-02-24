"use client";
import React, { useRef } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import Webcam from "react-webcam";

const CameraPage: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);

    return (
        <PageContentWrapperComponent title={"Kamera"} showBackButton>
            <CameraComponent ref={webcamRef} showFilters={false} />
        </PageContentWrapperComponent>
    );
};

export default CameraPage;
