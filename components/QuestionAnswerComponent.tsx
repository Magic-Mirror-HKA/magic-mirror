"use client";
import React, { useEffect, useRef } from "react";
import { AspectRatio, Box, Stack, Typography, useColorScheme } from "@mui/joy";
import { QuestionAnswer } from "@/context/ApplicationContext";

type Props = {
    questionAnswer: QuestionAnswer;
    onSelect: () => void;
};

const QuestionAnswerComponent: React.FC<Props> = (props) => {
    const { questionAnswer, onSelect } = props;

    useEffect(() => {
        console.log("questionAnswer: ", questionAnswer);
    }, [questionAnswer]);

    const handleSelect = (callback: () => void) => {
        callback();
        onSelect();
    };
    return (
        <Stack spacing="var(--space-7)">
            <Typography level={"h1"} textAlign={"center"} color={"primary"}>
                {questionAnswer.question}
            </Typography>
            <Box
                component="div"
                sx={{
                    display: "grid",
                    gridGap: "var(--space-6)",
                    gridTemplateColumns: "repeat(3, 1fr)",
                }}
            >
                {questionAnswer.options.map((o, i) => (
                    <Stack
                        component={"div"}
                        key={i}
                        spacing={"var(--space-6)"}
                        onClick={() => handleSelect(o.onClick)}
                    >
                        <VideoComponent url={o.videoUrl} />
                        <div
                            style={{
                                padding: "0 var(--space-3)",
                            }}
                        >
                            {/*<Typography*/}
                            {/*    level={"h3"}*/}
                            {/*    sx={{ fontWeight: 600 }}*/}
                            {/*    color="primary"*/}
                            {/*>*/}
                            {/*    {o.listPrefix}.*/}
                            {/*</Typography>*/}
                            <Typography sx={{ fontSize: "var(--font-large)" }}>
                                <span
                                    dangerouslySetInnerHTML={{ __html: o.text }}
                                />
                            </Typography>
                        </div>
                    </Stack>
                ))}
            </Box>
        </Stack>
    );
};

type VideoProps = {
    url: string;
};
const VideoComponent: React.FC<VideoProps> = (props) => {
    const { url } = props;
    const { mode } = useColorScheme();

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.load();
    }, [url]);

    return (
        <AspectRatio
            ratio={"16/9"}
            sx={{
                borderRadius: "var(--space-3)",
                border: "3px solid transparent",
                //py: "var(--space-7)",
                //px: "var(--space-7)",
                "&:hover": {
                    cursor: "pointer",
                    border:
                        mode === "light"
                            ? "3px solid var(--color-primary)"
                            : "3px solid white",
                },
            }}
        >
            <video ref={videoRef} autoPlay playsInline loop preload="none">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </AspectRatio>
    );
};

export default QuestionAnswerComponent;
