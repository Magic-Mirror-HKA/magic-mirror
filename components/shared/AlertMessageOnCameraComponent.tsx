import React from "react";
import { useFullScreenContext } from "@/context/FullScreenContext";
import { Html } from "@react-three/drei";
import { Alert } from "@mui/joy";
import InfoIcon from "@mui/icons-material/Info";

type PropsInDevelopmentAlertMessage = {
    parentWidth: number;
    message: string;
};
export const AlertMessageOnCameraComponent: React.FC<PropsInDevelopmentAlertMessage> = (
  props: PropsInDevelopmentAlertMessage,
) => {
    const { parentWidth, message } = props;
    const { isFullScreen } = useFullScreenContext();

    // Da Diese Komponente in einem Canvas im Sinne von Three.js oder R3F gerendert wird,
    // muss sie den Html aus @react-three/drei als Container haben.
    return (
      <Html
        style={{
            position: "absolute",
            top: isFullScreen ? 60 : 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: parentWidth,
        }}
      >
          <div
            style={{
                display: "grid",
                justifyItems: "center",
                justifyContent: "center",
            }}
          >
              <Alert
                size="sm"
                startDecorator={
                    <InfoIcon
                      fontSize="small"
                      sx={{ color: "var(--color-primary)" }}
                    />
                }
                sx={{
                    maxWidth: "480px",
                    boxShadow: "0 0 10px grey",
                    color: "var(--color-primary)",
                }}
              >
                  {message}
              </Alert>
          </div>
      </Html>
    );
};
