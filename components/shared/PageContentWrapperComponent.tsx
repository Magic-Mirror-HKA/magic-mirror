"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from "react";
import { Box, IconButton, styled, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { SxProps } from "@mui/joy/styles/types";
import { useFullScreenContext } from "@/context/FullScreenContext";

type Props = PropsWithChildren & {
    title?: string;
    showBackButton?: boolean;
    // titleStyle?: SxProps;
    // buttonsStyle?: SxProps;
};

const PageContentWrapperComponent: React.FC<Props> = (props: Props) => {
    const { title, showBackButton, children } = props;
    const router = useRouter();

    const navigateBack = () => {
        router.back();
    };

    const fullScreenContext = useFullScreenContext();

    const pageHeaderTitleStyles: SxProps = {
        color: fullScreenContext.isFullScreen ? "var(--color-white)" : "unset",
        filter: fullScreenContext.isFullScreen
            ? "drop-shadow(0px 6px 6px rgba(0,0,0,0.6000000238418579))"
            : "unset",
    };

    const pageHeaderButtonsStyles: SxProps = {
        filter: fullScreenContext.isFullScreen
            ? "drop-shadow(0px 6px 6px rgba(0,0,0,0.6000000238418579))"
            : "unset",
        color: fullScreenContext.isFullScreen
            ? "var(--color-white)"
            : "var(--color-primary)",
        border: fullScreenContext.isFullScreen
            ? "2px solid var(--color-white)"
            : "2px solid var(--color-primary)",
    };

    return (
        <PageWrapperContainer>
            <PageTitleAndBackButtonContainer>
                {showBackButton ? (
                    <IconButton
                        size="lg"
                        sx={{
                            border: (theme) =>
                                `2px solid ${theme.vars.palette.primary["500"]}`,
                            borderRadius: "50%",
                            ...pageHeaderButtonsStyles,
                        }}
                        onClick={navigateBack}
                    >
                        <BackIcon sx={{ color: "inherit" }} />
                    </IconButton>
                ) : null}
                {title ? (
                    <Typography level={"h1"} sx={pageHeaderTitleStyles}>
                        {title}
                    </Typography>
                ) : null}
            </PageTitleAndBackButtonContainer>
            {children}
        </PageWrapperContainer>
    );
};

const PageWrapperContainer = styled(Box)(() => ({
    display: "grid",
    gap: "var(--space-10)",
    gridTemplateRows: "max-content 1fr",
    alignItems: "start",
    justifySelf: "center",
    padding: "var(--space-10)",
    height: "100%",
    width: "100%",
    "@media screen and (max-width: 900px)": {
        padding: "var(--space-7)",
    },
    overflowY: "auto",
}));

const PageTitleAndBackButtonContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    gap: "var(--space-4)",
    alignSelf: "start",
    alignItems: "center",
    alignContent: "center",
    position: "sticky",
}));

const BackIcon = styled(ArrowBackIcon)(({ theme }) => ({
    color: theme.vars.palette.primary["500"],
}));

export default PageContentWrapperComponent;
