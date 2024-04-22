import React, { forwardRef } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import {
    ContainerSize,
    CAMERA_FRAME_MAX_HEIGHT,
} from "@/context/ApplicationContext";
import { useFullScreenContext } from "@/context/FullScreenContext";

type Props = Partial<WebcamProps> & {
    parentSize: ContainerSize;
};

// eslint-disable-next-line react/display-name
const WebcamComponent = forwardRef<Webcam, Props>((props: Props, ref) => {
    const { parentSize, ...rest } = props;
    const fullScreenContext = useFullScreenContext();
    return (
        <Webcam
            {...rest}
            ref={ref}
            //mirrored={true}
            id={"webcam-with-mask"}
            //onUserMedia={() => setIsCameraLoading(false)}
            style={{
                //display: showFilters ? "none" : "block",
                objectFit: "cover",
                borderRadius: "var(--space-5)",
                height: fullScreenContext.isFullScreen
                    ? parentSize.height
                    : CAMERA_FRAME_MAX_HEIGHT,
                width: "100%",
                transform: "scaleX(-1)",
                //opacity: playScreenShotAnimation ? "10%" : "unset",
            }}
        />
    );
});

export default WebcamComponent;
