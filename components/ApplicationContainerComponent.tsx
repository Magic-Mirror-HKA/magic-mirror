"use client";
import React, { PropsWithChildren } from "react";
import { Box, styled } from "@mui/joy";
import AppBarComponent from "@/components/AppBarComponent";
// import AppFooterComponent from "@/components/AppFooterComponent";
import MainDockComponent from "@/components/MainDockComponent";

type Props = PropsWithChildren;

const ApplicationContainerComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <AppContainer>
            <AppContentWrapper>
                <AppBarComponent />
                <MainDockWithLogoContainer>
                    <FacultyName
                        src={"/HKA_IWI_Wortmarke_RGB.svg"}
                        alt={"HKA-Logo Wortmarke"}
                        width={171}
                        height={95}
                    />
                    <MainDockComponent>{children}</MainDockComponent>
                    <UniversityLogo
                        src={"/HKA_IWI_Bildmarke_RGB.svg"}
                        alt={"HKA-Logo Wortmarke"}
                        width={137}
                        height={320}
                    />
                </MainDockWithLogoContainer>
                {/*<AppFooterComponent />*/}
            </AppContentWrapper>
        </AppContainer>
    );
};

const AppContainer = styled(Box)(() => ({
    display: "grid",
    // maxWidth: "var(--max-page-width)",
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
    //justifySelf: "center",
    gridTemplateRows: "4dvh 80dvh 4dvh",
    margin: "var(--space-5) var(--space-4)",
}));

const MainDockWithLogoContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "max-content 1fr max-content",
    gridGap: "var(--space-8)",
}));

const FacultyName = styled("img")(() => ({
    textAlign: "center",
    justifySelf: "center",
    //objectFit: "contain",
}));

const UniversityLogo = styled("img")(() => ({
    textAlign: "center",
    justifySelf: "center",
    //objectFit: "contain",
}));

export default ApplicationContainerComponent;
