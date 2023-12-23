import React from "react";
import { Box, styled } from "@mui/joy";
import Image from "next/image";

const AppFooterComponent: React.FC = () => {
    return (
        <AppFooterContainer>
            <FacultyLogo
                src={"/hka-logo.svg"}
                alt={"Faculty logo"}
                width={550}
                height={550}
                layout="responsive"
                loading="lazy"
            />
        </AppFooterContainer>
    );
};

const AppFooterContainer = styled(Box)(() => ({
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
    width: "100%",
}));

const FacultyLogo = styled(Image)(() => ({
    objectFit: "contain",
}));

export default AppFooterComponent;
