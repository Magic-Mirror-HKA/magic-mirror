// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
import React, { forwardRef, LegacyRef } from "react";
import styled from "styled-components";
import { Box } from "@mui/joy";

export const OUTPUT_CANVAS_ID = "output-canvas";
export const OUTPUT_BACKGROUND_CANVAS_ID = "output-canvas-background";

type Props = {
    width?: string;
    height?: string;
};

export const CanvasComponent = forwardRef(
    (props: Props, ref: LegacyRef<HTMLCanvasElement> | undefined) => {
        const { width, height } = props;

        return (
            <Container style={{ width, height }}>
                <canvas
                    id={OUTPUT_CANVAS_ID}
                    ref={ref}
                    style={{
                        width,
                        height,
                        objectFit: "cover",
                        borderRadius: "var(--space-5)",
                        zIndex: 2,
                        position: "absolute",
                    }}
                />
                <canvas
                    id={OUTPUT_BACKGROUND_CANVAS_ID}
                    style={{
                        width,
                        height,
                        objectFit: "cover",
                        borderRadius: "var(--space-5)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            </Container>
        );
    },
);

const Container = styled(Box)`
    position: relative;
`;
