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
    maxWidth: "var(--max-page-width)",
    //maxHeight: "var(--max-dock-height)",
    //height: "100%",
    alignSelf: "center",
    justifySelf: "center",
    width: "100%",
    height: "100%",
}));

const AppContentWrapper = styled(Box)(() => ({
    display: "grid",
    gap: "var(--space-4)",
    alignSelf: "center",
    gridTemplateRows: "4dvh 77dvh 4dvh",
    margin: "var(--space-9) var(--space-4)",
}));

export default ApplicationContainerComponent;
