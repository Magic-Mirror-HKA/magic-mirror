"use client";
import React, { PropsWithChildren } from "react";
import { Box, styled } from "@mui/joy";
import AppBarComponent from "@/components/AppBarComponent";
import AppFooterComponent from "@/components/AppFooterComponent";
import MainDockComponent from "@/components/MainDockComponent";

type Props = PropsWithChildren;

const ApplicationContainerComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <AppContainer>
            <AppContentWrapper>
                <AppBarComponent />
                <MainDockComponent>{children}</MainDockComponent>
                <AppFooterComponent />
            </AppContentWrapper>
        </AppContainer>
    );
};

const AppContainer = styled(Box)(() => ({
    display: "grid",
    // TODO: Make the whole content to stick in the middle horizontally and vertically
    // alignItems: "center",
    // alignContent: "center",
    maxWidth: "var(--max-page-width)",
    maxHeight: "var(--max-page-height)",
    height: "100%",
    alignSelf: "center",
    justifySelf: "center",
    // TODO: Make the whole content to stick in the middle horizontally and vertically
    // position: "absolute",
    // top: "50%",
    // bottom: "50%",
    // left: "50%",
    // right: "50%",
    // transform: "translate(-50%, -50%)",
    width: "100%",
}));

const AppContentWrapper = styled(Box)(() => ({
    display: "grid",
    gap: "var(--space-4)",
    gridTemplateRows: "max-content var(--max-dock-height) auto",
    margin: "var(--space-9) var(--space-4) 0 var(--space-4)",
}));

export default ApplicationContainerComponent;
