"use client";
import React, { useState } from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import { QuestionAnswer } from "@/context/ApplicationContext";
import dynamic from "next/dynamic";
import { Typography } from "@mui/joy";

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
                    value: "Internationales IT-Business",
                    listPrefix: "C",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            "Internationales IT-Business",
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
                    value: "Internationales IT-Business",
                    listPrefix: "C",
                    onClick: () => {
                        setSolutions((prev) => [
                            ...prev,
                            "Internationales IT-Business",
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

    return (
        <PageContentWrapperComponent
            title={"Welcher Studiengang passt zu dir?"}
            showBackButton
        >
            {activeStep !== maxSteps ? (
                <QuestionAnswerComponent
                    onSelect={() => setActiveStep((prev) => prev + 1)}
                    questionAnswer={questionAnswerList[activeStep]}
                />
            ) : (
                <Typography
                    level={"h1"}
                    textAlign={"center"}
                    sx={{ maxWidth: "50%", m: "100px auto " }}
                >
                    {getResults().length === 1
                        ? `Schaue Dir den Studiengang ${
                              getResults()[0]
                          } genauer an`
                        : `Schaue Dir die Studiengänge ${getResults()[0]} und ${
                              getResults()[1]
                          } genauer an`}
                </Typography>
            )}
        </PageContentWrapperComponent>
    );
};

export default WizardHatPage;
