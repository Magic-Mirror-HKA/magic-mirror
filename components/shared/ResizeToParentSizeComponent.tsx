"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect, ReactNode } from "react";
import { Box, styled } from "@mui/joy";
import { ContainerSize } from "@/context/ApplicationContext";

const INITIAL_SIZE: ContainerSize = {
    width: 0,
    height: 0,
};

type Props = {
    children: (parentSize: ContainerSize) => ReactNode;
};

const ResizeToParentSizeComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [parentSize, setParentSize] = useState<ContainerSize>(INITIAL_SIZE);

    useEffect(() => {
        if (!parentRef.current) {
            return;
        }
        if (
            parentSize.width === parentRef.current.clientWidth ||
            parentSize.height === parentRef.current.clientHeight
        ) {
            return;
        }
        setParentSize({
            width: parentRef.current.clientWidth,
            height: parentRef.current.clientHeight,
        });
    }, [parentRef, children]);

    return (
        <ParentWrapperContainer component="div" ref={parentRef}>
            {children(parentSize)}
        </ParentWrapperContainer>
    );
};

const ParentWrapperContainer = styled(Box)(() => ({
    position: "absolute",
    width: "100%",
    height: "100%",
}));

export default ResizeToParentSizeComponent;
