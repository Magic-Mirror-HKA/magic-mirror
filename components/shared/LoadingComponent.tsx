import React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";
import styled from "styled-components";

type Props = {
    message?: string;
};

export const LoadingComponent: React.FC<Props> = (props: Props) => {
    const { message } = props;

    return (
        <LoadingContainer>
            <CircularProgress color="primary" />
            <Typography
                level="title-md"
                sx={{ color: "var(--color-white)" }}
                textAlign="center"
            >
                {message}
            </Typography>
        </LoadingContainer>
    );
};

const LoadingContainer = styled(Box)`
    display: grid;
    gap: var(--space-3);
    justify-content: center;
    justify-items: center;
    position: absolute;
    left: 50%;
    //right: "50%",
    transform: translate(-50%);
`;
