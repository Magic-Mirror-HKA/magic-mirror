"use client";
import { useEffect, useState } from "react";
import { ContainerSize } from "@/context/ApplicationContext";

const INITIAL_SIZE: ContainerSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};

type Output = ContainerSize;

export const useWindowSizeObserver = (): Output => {
    const [windowsSize, setWindowsSize] = useState<ContainerSize>(INITIAL_SIZE);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        console.log(windowsSize);
    }, [windowsSize]);

    const handleWindowResize = () => {
        setWindowsSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    return windowsSize;
};
