"use client";
import React, { useState } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import {
    getRandomNumber,
    QuestionAnswer,
    QuestionOption,
} from "@/context/ApplicationContext";
import dynamic from "next/dynamic";
import { Button, Stack, Typography } from "@mui/joy";

const QuestionAnswerComponent = dynamic(
    () => {
        return import("@/components/QuestionAnswerComponent");
    },
    { ssr: false },
);
const WizardHatPage: React.FC = () => {
    const [solutions, setSolutions] = useState<QuestionOption[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const questionAnswerList: QuestionAnswer[] = [
        {
            question: "Welches Fach interessiert dich am meisten?",
            options: [
                {
                    text:
                        "Du möchtest die Geheimnisse der " +
                        "<span style='color: var(--color-primary)'>Datenwissenschaft</span> entschlüsseln und " +
                        "<span style='color: var(--color-primary)'>Muster</span> in " +
                        "<span style='color: var(--color-primary)'>großen Datensätzen</span> erkennen.",
                    value: "Data Science",
                    listPrefix: "A",
                    videoUrl: "/videos/data-science.mp4",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            questionAnswerList[0].options[0],
                        ]);
                    },
                },
                {
                    text:
                        "Du interessierst dich für die " +
                        "<span style='color: var(--color-primary)'>Verbindung von IT und Wirtschaft</span>. Du möchtest " +
                        "die Effizienz von Unternehmen durch technologische Lösungen verbessern.",
                    value: "Wirtschaftsinformatik",
                    listPrefix: "B",
                    videoUrl: "/videos/wirtschaftsinfo.mp4",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            questionAnswerList[0].options[1],
                        ]);
                    },
                },
                {
                    text:
                        "Du siehst die Welt als deinen Spielplatz und möchtest in einer " +
                        "<span style='color: var(--color-primary)'>globalen Wirtschaftsumgebung</span> arbeiten. " +
                        "Internationale Unternehmen und IT sind deine Leidenschaft.",
                    value: "Internationales IT Business",
                    listPrefix: "C",
                    videoUrl: "/videos/it-business.mp4",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            questionAnswerList[0].options[2],
                        ]);
                    },
                },
            ],
        },
        {
            question:
                "Welche Fähigkeiten möchtest du in deinem Studium entwickeln?",
            options: [
                {
                    text:
                        "Du möchtest " +
                        "<span style='color: var(--color-primary)'>analytische Fähigkeiten erlangen</span>, um aus " +
                        "Daten wertvolle Erkenntnisse zu gewinnen.",
                    value: "Data Science",
                    listPrefix: "A",
                    videoUrl: "/videos/data-science.mp4",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            questionAnswerList[1].options[0],
                        ]);
                    },
                },
                {
                    text:
                        "Du möchtest technisches Know-how erwerben, um " +
                        "<span style='color: var(--color-primary)'>Software zu entwickeln</span>, " +
                        "<span style='color: var(--color-primary)'>Digitalisierung</span> voranzutreiben oder " +
                        "<span style='color: var(--color-primary)'>Geschäftsprozesse</span> zu optimieren.",
                    value: "Wirtschaftsinformatik",
                    listPrefix: "B",
                    videoUrl: "/videos/wirtschaftsinfo.mp4",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            questionAnswerList[1].options[1],
                        ]);
                    },
                },
                {
                    text:
                        "Du möchtest sowohl " +
                        "<span style='color: var(--color-primary)'>technische als auch interkulturelle Fähigkeiten</span> " +
                        "entwickeln, um globale Herausforderungen zu meistern.",
                    value: "Internationales IT Business",
                    listPrefix: "C",
                    videoUrl: "/videos/it-business.mp4",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            questionAnswerList[1].options[2],
                        ]);
                    },
                },
            ],
        },
    ];

    const maxSteps = questionAnswerList.length;

    // Remove duplicates before renderings
    const results: QuestionOption[] = solutions.reduce(
        (acc: QuestionOption[], curr: QuestionOption) =>
            acc.find((s) => s.value === curr.value) ? acc : [...acc, curr],
        [],
    );

    const getQrCodeLinkOfFaculty = (): { src: string; label: string }[] => {
        return results.map((r) => {
            switch (r.value) {
                case "Data Science":
                    return { src: "/qrcodes/dscb.png", label: "Data Science" };
                case "Wirtschaftsinformatik":
                    return {
                        src: "/qrcodes/wib.png",
                        label: "Wirtschaftsinformatik",
                    };
                case "Internationales IT Business":
                    return {
                        src: "/qrcodes/iib.png",
                        label: "Internationales IT Business",
                    };
                default:
                    return { src: "", label: "" };
            }
        });
    };

    const clearSelection = () => {
        setSolutions([]);
        setActiveStep(0);
    };

    return (
        <PageContentWrapperComponent
            title={"Welcher Studiengang passt zu mir?"}
            showBackButton
        >
            {activeStep !== maxSteps ? (
                <>
                    <QuestionAnswerComponent
                        onSelect={() => setActiveStep((prev) => prev + 1)}
                        questionAnswer={questionAnswerList[activeStep]}
                    />
                    <Typography
                        color="primary"
                        textAlign="center"
                        fontWeight="bold"
                    >
                        {activeStep + 1} / {maxSteps}
                    </Typography>
                </>
            ) : (
                <Stack
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "var(--space-10)",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gap: "var(--space-4)",
                            alignSelf: "center",
                        }}
                    >
                        <ResultTextComponent results={results} />
                        <Stack direction={"row"} spacing={"var(--space-20)"}>
                            {getQrCodeLinkOfFaculty().map((code, _, array) => (
                                <Stack
                                    key={code.src}
                                    spacing={"var(--space-2)"}
                                    sx={{
                                        alignItems: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <img
                                        src={code.src}
                                        alt={"QR-code"}
                                        style={{
                                            objectFit: "contain",
                                            width: "200px",
                                            justifySelf: "start",
                                            borderRadius: "var(--space-3)",
                                            border: "2px solid var(--color-primary)",
                                        }}
                                    />
                                    {array.length === 1 ? null : (
                                        <Typography
                                            level={"body-sm"}
                                            color={"primary"}
                                            textAlign={"center"}
                                        >
                                            {code.label}
                                        </Typography>
                                    )}
                                </Stack>
                            ))}
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={"var(--space-4)"}
                            sx={{ mt: 4 }}
                        >
                            <Button
                                variant="solid"
                                size="lg"
                                onClick={clearSelection}
                            >
                                Erneut auswählen
                            </Button>
                        </Stack>
                    </div>
                    <VideoAndReactionComponent
                        videoSrc={results[0].videoUrl}
                        videoFormat={"video/mp4"}
                        reactionSrc={`/reaction-${getRandomNumber(1, 4)}.png`}
                    />
                </Stack>
            )}
        </PageContentWrapperComponent>
    );
};

type ResultTextProps = {
    results: QuestionOption[];
};
const ResultTextComponent: React.FC<ResultTextProps> = (props) => {
    const { results } = props;
    return (
        <Typography
            // level={"h1"}
            sx={{
                fontSize: "var(--font-xLarge)",
            }}
        >
            {results.length === 1 ? (
                <>
                    Schaue Dir den Studiengang{" "}
                    <span
                        style={{
                            fontWeight: 600,
                            color: "var(--color-primary)",
                        }}
                    >
                        {results[0].value}
                    </span>{" "}
                    genauer an
                </>
            ) : (
                <>
                    Schaue Dir die Studiengänge{" "}
                    <span
                        style={{
                            fontWeight: 600,
                            color: "var(--color-primary)",
                        }}
                    >
                        {results[0].value}
                    </span>{" "}
                    und{" "}
                    <span
                        style={{
                            fontWeight: 600,
                            color: "var(--color-primary)",
                        }}
                    >
                        {results[1].value}
                    </span>{" "}
                    genauer an
                </>
            )}
        </Typography>
    );
};

type VideoAndReactionProps = {
    videoSrc: string;
    videoFormat: string;
    reactionSrc: string;
};
const VideoAndReactionComponent: React.FC<VideoAndReactionProps> = (props) => {
    const { videoSrc, videoFormat, reactionSrc } = props;
    return (
        <Stack component={"div"} spacing={"var(--space-7)"}>
            <video
                autoPlay
                playsInline
                loop
                preload="none"
                style={{
                    borderRadius: "var(--space-3)",
                    border: "8px solid white",
                    boxShadow: "0 0 10px grey",
                    width: "100%",
                    transform: "rotateZ(5deg)",
                }}
            >
                <source src={videoSrc} type={videoFormat} />
                Your browser does not support the video tag.
            </video>
            <img src={reactionSrc} alt={"Reaktion"} />
        </Stack>
    );
};

export default WizardHatPage;
