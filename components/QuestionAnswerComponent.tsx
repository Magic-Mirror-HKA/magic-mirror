"use client";
import React from "react";
import { AspectRatio, Box, Stack, Typography, useColorScheme } from "@mui/joy";
import { QuestionAnswer } from "@/context/ApplicationContext";

type Props = {
    questionAnswer: QuestionAnswer;
    onSelect: () => void;
};

const QuestionAnswerComponent: React.FC<Props> = (props) => {
    const { questionAnswer, onSelect } = props;
    const { mode } = useColorScheme();

    const handleSelect = (callback: () => void) => {
        callback();
        onSelect();
    };
    return (
        <Stack spacing="var(--space-7)">
            <Typography level={"h2"} textAlign={"center"}>
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
                            <video autoPlay playsInline loop preload="none">
                                <source src={o.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </AspectRatio>
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
                            <Typography level={"h4"} sx={{ color: "black" }}>
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

export default QuestionAnswerComponent;
