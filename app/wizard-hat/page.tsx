"use client";
import React, { useState } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import { QuestionAnswer } from "@/context/ApplicationContext";
import dynamic from "next/dynamic";
import { Button, Stack, Typography } from "@mui/joy";

const QuestionAnswerComponent = dynamic(
    () => {
        return import("@/components/QuestionAnswerComponent");
    },
    { ssr: false },
);
const WizardHatPage: React.FC = () => {
    const [solutions, setSolutions] = useState<string[]>([]);
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
                        setSolutions((prev) => [...prev, "Data Science"]);
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
                            "Wirtschaftsinformatik",
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
                            "Internationales IT Business",
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
                    onClick: () => {
                        setSolutions((prev) => [...prev, "Data Science"]);
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
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            "Wirtschaftsinformatik",
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
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            "Internationales IT Business",
                        ]);
                    },
                },
            ],
        },
    ];

    const maxSteps = questionAnswerList.length;

    const getResults = (): string[] => {
        return solutions.reduce(
            (acc: string[], curr: string) =>
                acc.find((s) => s === curr) ? acc : [...acc, curr],
            [],
        );
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
                            //padding: "var(--space-6) 0 0 0",
                            alignSelf: "center",
                        }}
                    >
                        <Typography
                            // level={"h1"}
                            sx={{
                                fontSize: "var(--font-xLarge)",
                            }}
                        >
                            {getResults().length === 1 ? (
                                <>
                                    Schaue Dir den Studiengang{" "}
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        {getResults()[0]}
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
                                        {getResults()[0]}
                                    </span>{" "}
                                    und{" "}
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        {getResults()[1]}
                                    </span>{" "}
                                    genauer an
                                </>
                            )}
                        </Typography>
                        <img
                            src={"/qrcodes/wi-qrcode.png"}
                            alt={""}
                            style={{
                                objectFit: "contain",
                                width: "40%",
                                justifySelf: "start",
                                borderRadius: "var(--space-3)",
                                border: "2px solid var(--color-primary)",
                            }}
                        />
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
                            {/*<Button*/}
                            {/*    variant="outlined"*/}
                            {/*    size="lg"*/}
                            {/*    onClick={() => router.push("/")}*/}
                            {/*>*/}
                            {/*    Zur Startseite*/}
                            {/*</Button>*/}
                        </Stack>
                    </div>
                    <Stack component={"div"} spacing={"var(--space-5)"}>
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
                            <source
                                src={"/videos/data-science.mp4"}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                        <img src={"/result-text.png"} alt={""} />
                    </Stack>
                </Stack>
            )}
        </PageContentWrapperComponent>
    );
};

export default WizardHatPage;
