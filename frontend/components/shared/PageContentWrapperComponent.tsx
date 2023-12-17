"use client";
import React, { PropsWithChildren } from "react";
import { Box, IconButton, styled, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

type Props = PropsWithChildren & {
    title: string;
    showBackButton?: boolean;
};

const PageContentWrapperComponent: React.FC<Props> = (props: Props) => {
    const { title, showBackButton, children } = props;
    const router = useRouter();

    const navigateBack = () => {
        router.back();
    };

    return (
        <PageWrapperContainer>
            <PageTitleAndBackButtonContainer>
                {showBackButton ? (
                    <BackButtonContainer size="lg" onClick={navigateBack}>
                        <BackIcon />
                    </BackButtonContainer>
                ) : null}
                <PageTitle level={"h1"}>{title}</PageTitle>
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

const BackButtonContainer = styled(IconButton)(({ theme }) => ({
    border: `2px solid ${theme.vars.palette.primary["500"]}`,
    borderRadius: "50%",
}));

const BackIcon = styled(ArrowBackIcon)(({ theme }) => ({
    color: theme.vars.palette.primary["500"],
}));

const PageTitle = styled(Typography)(() => ({
    //color: theme.vars.palette.primary["500"],
}));

export default PageContentWrapperComponent;
