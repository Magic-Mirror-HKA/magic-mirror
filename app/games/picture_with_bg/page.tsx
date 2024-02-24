"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    BackgroundFilterName,
    FilterItem,
    useAppContext,
} from "@/context/ApplicationContext";
import Webcam from "react-webcam";
import { useSelfieSegmentation } from "@/hooks/useSelfieSegmentation";
import { CanvasComponent } from "@/components/shared/CanvasComponent";
import CameraComponent from "@/components/shared/CameraComponent";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";

const PictureWithBackgroundComponent: React.FC = () => {
    const appContext = useAppContext();

    const camRef = useRef<Webcam | null>(null);
    const outputCanvas = useRef<HTMLCanvasElement | null>(null);
    const [img, setImg] = useState<HTMLImageElement | undefined>(undefined);

    useEffect(() => {
        // Init
        const newImg = new Image();
        newImg.src = "/campus_hka_1.svg";
        setImg(newImg);
    }, []);

    useSelfieSegmentation({
        videoElement: camRef.current?.video!,
        outputCanvasElement: outputCanvas.current!,
        backgroundImage: img!,
    });

    useEffect(() => {
        appContext.setFilterItems(filterItems);
        // Initial selected background
        appContext.setSelectedFilterItem(
            filterItems.find((f) => f.name === "Eingang"),
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
            name: "Eingang",
            src: "/campus_hka_1.svg",
            isActive: appContext.selectedFilterItem?.name === "Eingang",
            onClick: () =>
                handleClickFilterItem("Eingang", "/campus_hka_1.svg"),
        },
        {
            name: "Gebaeude B",
            src: "/gebaeude_b.png",
            isActive: appContext.selectedFilterItem?.name === "Gebaeude B",
            onClick: () =>
                handleClickFilterItem("Gebaeude B", "/gebaeude_b.png"),
        },
        {
            name: "HKA BIB",
            src: "/hka_bib.jpg",
            isActive: appContext.selectedFilterItem?.name === "HKA BIB",
            onClick: () => handleClickFilterItem("HKA BIB", "/hka_bib.jpg"),
        },
    ];

    return (
        <PageContentWrapperComponent
            title={"Foto mit Hintergrund"}
            showBackButton
        >
            <CameraComponent
                ref={camRef}
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

export default PictureWithBackgroundComponent;
