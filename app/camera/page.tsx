"use client";
import React, { useEffect, useRef, useState } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import Webcam from "react-webcam";
import {
    BackgroundFilterName,
    FilterItem,
    useAppContext,
} from "@/context/ApplicationContext";
import { useSelfieSegmentation } from "@/hooks/useSelfieSegmentation";
import { v4 as uuid } from "uuid";
import { CanvasComponent } from "@/components/shared/CanvasComponent";

const CameraPage: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);

    const appContext = useAppContext();

    const outputCanvas = useRef<HTMLCanvasElement | null>(null);
    const [img, setImg] = useState<HTMLImageElement | undefined>(undefined);

    useEffect(() => {
        // Init
        const newImg = new Image();
        newImg.src = "/backgrounds/pyramid.jpg";
        setImg(newImg);
    }, []);

    useSelfieSegmentation({
        videoElement: webcamRef.current?.video!,
        outputCanvasElement: outputCanvas.current!,
        backgroundImage: img!,
    });

    useEffect(() => {
        appContext.setFilterItems(filterItems);
        // Initial selected background
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === "Pyramide"),
        );
    }, []);

    const handleClickFilterItem = (
        itemName: BackgroundFilterName,
        imgSrc: string,
    ) => {
        // TODO: CHANGE BACKGROUND IMAGE HIER
        const newImg = new Image();
        newImg.src = imgSrc;
        setImg(newImg);
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === itemName),
        );
    };

    const filterItems: FilterItem[] = [
        {
            id: uuid(),
            name: "Pyramide",
            src: "/backgrounds/pyramid.jpg",
            isActive: appContext.selectedFilterItem?.name === "Pyramide",
            onClick: () =>
                handleClickFilterItem("Pyramide", "/backgrounds/pyramid.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss",
            src: "/backgrounds/castel.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss",
            onClick: () =>
                handleClickFilterItem("Schloss", "/backgrounds/castel.jpg"),
        },
        {
            id: uuid(),
            name: "Formeln",
            src: "/backgrounds/formulae.jpg",
            isActive: appContext.selectedFilterItem?.name === "Formeln",
            onClick: () =>
                handleClickFilterItem("Formeln", "/backgrounds/formulae.jpg"),
        },
        {
            id: uuid(),
            name: "Saal",
            src: "/backgrounds/hall.jpg",
            isActive: appContext.selectedFilterItem?.name === "Saal",
            onClick: () =>
                handleClickFilterItem("Saal", "/backgrounds/hall.jpg"),
        },
    ];

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
