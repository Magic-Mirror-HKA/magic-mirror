"use client";
import React, { useState } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import { QuestionAnswer } from "@/context/ApplicationContext";
import dynamic from "next/dynamic";
import { Button, Stack, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";

const QuestionAnswerComponent = dynamic(
    () => {
        return import("@/components/QuestionAnswerComponent");
    },
    { ssr: false },
);
const WizardHatPage: React.FC = () => {
    const router = useRouter();
    const [solutions, setSolutions] = useState<string[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const questionAnswerList: QuestionAnswer[] = [
        {
            question: "Welches Fach interessiert dich am meisten?",
            options: [
                {
                    text: "Du möchtest die Geheimnisse der Datenwissenschaft entschlüsseln und Muster in großen Datensätzen erkennen.",
                    value: "Data Science",
                    listPrefix: "A",
                    onClick: () => {
                        setSolutions((prev) => [...prev, "Data Science"]);
                    },
                },
                {
                    text: "Du interessierst dich für die Verbindung von IT und Wirtschaft. Du möchtest die Effizienz von Unternehmen durch technologische Lösungen verbessern.",
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
                    text: "Du siehst die Welt als deinen Spielplatz und möchtest in einer globalen Wirtschaftsumgebung arbeiten. Internationale Unternehmen und IT sind deine Leidenschaft.",
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
        {
            question:
                "Welche Fähigkeiten möchtest du in deinem Studium entwickeln?",
            options: [
                {
                    text: "Du möchtest analytische Fähigkeiten erlangen, um aus Daten wertvolle Erkenntnisse zu gewinnen.",
                    value: "Data Science",
                    listPrefix: "A",
                    onClick: () => {
                        setSolutions((prev) => [...prev, "Data Science"]);
                    },
                },
                {
                    text: "Du möchtest technisches Know-how erwerben, um Software zu entwickeln, Digitalisierung voranzutreiben oder Geschäftsprozesse zu optimieren.",
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
                    text: "Du möchtest sowohl technische als auch interkulturelle Fähigkeiten entwickeln, um globale Herausforderungen zu meistern.",
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
                <div>
                    <Typography
                        // level={"h1"}
                        textAlign={"center"}
                        sx={{
                            fontSize: "35px",
                            maxWidth: "50%",
                            m: "100px auto ",
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
                    <Stack
                        direction={"row"}
                        spacing={"var(--space-4)"}
                        sx={{
                            justifyContent: "center",
                            justifyItems: "center",
                        }}
                    >
                        <Button
                            variant="solid"
                            size="lg"
                            onClick={clearSelection}
                        >
                            Erneut auswählen
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            onClick={() => router.push("/")}
                        >
                            Zur Startseite
                        </Button>
                    </Stack>
                </div>
            )}
        </PageContentWrapperComponent>
    );
};

export default WizardHatPage;
