// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
import React, { forwardRef, LegacyRef } from "react";

export const OUTPUT_CANVAS_ID = "output-canvas";

type Props = {
    width?: string;
    height?: string;
};

export const CanvasComponent = forwardRef(
    (props: Props, ref: LegacyRef<HTMLCanvasElement> | undefined) => {
        const { width, height } = props;

        return (
            <canvas
                id={OUTPUT_CANVAS_ID}
                ref={ref}
                style={{
                    width,
                    height,
                    objectFit: "cover",
                    borderRadius: "var(--space-5)",
                }}
            />
        );
    },
);
