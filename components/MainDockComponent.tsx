import React, { PropsWithChildren } from "react";
import { Box, styled } from "@mui/joy";

type Props = PropsWithChildren;

const MainDockComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return <MainDockContainer>{children}</MainDockContainer>;
};

const MainDockContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    maxWidth: "var(--max-page-width)",
    height: "80dvh",
    justifySelf: "center",
    //backgroundColor: "#c9c9c9",
    borderRadius: "var(--space-5)",
    //overflowY: "auto",
    //opacity: "95%",
    backdropFilter: "blur(150px)",
    boxShadow: `0 0 10px ${theme.vars.palette.primary["500"]}`,
    border: `1px solid ${theme.vars.palette.primary["500"]}`,
}));

export default MainDockComponent;
