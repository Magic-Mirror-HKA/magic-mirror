"use client";
import React from "react";
import { Box, Card, Stack, Typography, useColorScheme } from "@mui/joy";
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
                    <Card
                        key={i}
                        sx={{
                            borderRadius: "var(--space-3)",
                            borderWidth: "3px",
                            py: "var(--space-7)",
                            px: "var(--space-7)",
                            "&:hover": {
                                cursor: "pointer",
                                border:
                                    mode === "light"
                                        ? "3px solid var(--color-primary)"
                                        : "3px solid white",
                            },
                        }}
                        onClick={() => handleSelect(o.onClick)}
                    >
                        <Typography
                            level={"h2"}
                            sx={{ fontWeight: 600 }}
                            textAlign={"center"}
                            color="primary"
                        >
                            {o.listPrefix}
                        </Typography>
                        <Typography level={"h4"} color="primary">
                            {o.text}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Stack>
    );
};

export default QuestionAnswerComponent;
