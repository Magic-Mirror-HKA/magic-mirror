"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import { SelectablePageItem } from "@/context/ApplicationContext";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MasksIcon from "@mui/icons-material/Masks";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SelectableItemListComponent from "@/components/shared/SelectableItemListComponent";
import { SxProps } from "@mui/joy/styles/types";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const router = useRouter();
    const selectableItems: SelectablePageItem[] = [
        {
            label: "Kamera",
            // @ts-expect-error
            icon: <CameraAltIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => router.push("/camera"),
        },
        {
            label: "Animationen",
            // @ts-expect-error
            icon: <MasksIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => router.push("/filter"),
        },
        {
            label: "Welcher Studiengang passt zu dir?",
            // @ts-expect-error
            icon: <SchoolOutlinedIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => router.push("/wizard-hat"),
        },
        {
            label: "Spiele",
            // @ts-expect-error
            icon: <SportsEsportsIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => alert("Diese Seite wird noch entwickelt."),
        },
        // {
        //     label: "Einstellungen",
        //     // @ts-expect-error
        //     icon: <SettingsIcon fontSize="inherit" sx={IconStyle} />,
        //     onClick: () => alert("In dev"),
        // },
    ];

    return (
        <PageContentWrapperComponent title={"Startseite"}>
            <SelectableItemListComponent items={selectableItems} />
        </PageContentWrapperComponent>
    );
};

const IconStyle: SxProps = () => ({
    color: "var(--color-white)",
    filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.6000000238418579))",
});

export default Home;
