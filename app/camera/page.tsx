"use client";
import React, { useEffect, useRef, useState } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import Webcam from "react-webcam";
import { useAppContext } from "@/context/ApplicationContext";
import { useSelfieSegmentation } from "@/hooks/useSelfieSegmentation";
import { CanvasComponent } from "@/components/shared/CanvasComponent";
import { useCustomBackground } from "@/hooks/useCustomBackground";
import { useFullScreenContext } from "@/context/FullScreenContext";

const CameraPage: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);

    const appContext = useAppContext();
    const fullScreenContext = useFullScreenContext();

    const outputCanvas = useRef<HTMLCanvasElement | null>(null);
    const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

    const filterItems = useCustomBackground({ setImage });

    useSelfieSegmentation({
        videoElement: webcamRef.current?.video!,
        outputCanvasElement: outputCanvas.current!,
        backgroundImage: image!,
    });

    const defaultSelectedFilterItem = filterItems[0];

    useEffect(() => {
        // Init
        const newImg = new Image();
        newImg.src = defaultSelectedFilterItem.src;
        setImage(newImg);
    }, []);

    useEffect(() => {
        fullScreenContext.goFullScreen();
        appContext.setFilterItems(filterItems);
        // Initial selected background
        appContext.setSelectedFilterItem(defaultSelectedFilterItem);
    }, []);

    return (
        <PageContentWrapperComponent title={"Kamera"} showBackButton>
            <CameraComponent
                ref={webcamRef}
                showCustomBackground
                outputCanvas={
                    <CanvasComponent
                        ref={outputCanvas}
                        width={"100%"}
                        height={"100%"}
                    />
                }
            />
        </PageContentWrapperComponent>
    );
};

export default CameraPage;
