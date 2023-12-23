"use client";
import React, { PropsWithChildren } from "react";
import { Box, IconButton, styled, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { SxProps } from "@mui/joy/styles/types";

type Props = PropsWithChildren & {
    title: string;
    showBackButton?: boolean;
    titleStyle?: SxProps;
    buttonsStyle?: SxProps;
};

const PageContentWrapperComponent: React.FC<Props> = (props: Props) => {
    const { title, showBackButton, titleStyle, buttonsStyle, children } = props;
    const router = useRouter();

    const navigateBack = () => {
        router.back();
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
                            ...buttonsStyle,
                        }}
                        onClick={navigateBack}
                    >
                        <BackIcon sx={{ color: "inherit" }} />
                    </IconButton>
                ) : null}
                <Typography level={"h1"} sx={titleStyle}>
                    {title}
                </Typography>
            </PageTitleAndBackButtonContainer>
            {children}
        </PageWrapperContainer>
    );
};

const PageWrapperContainer = styled(Box)(() => ({
    display: "grid",
    gap: "var(--space-10)",
    gridTemplateRows: "max-content 1fr",
    justifySelf: "center",
    padding: "var(--space-10)",
    //height: "100%",
    "@media screen and (max-width: 900px)": {
        padding: "var(--space-7)",
    },
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
