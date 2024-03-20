"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import { SelectablePageItem } from "@/context/ApplicationContext";
import GamepadIcon from "@mui/icons-material/Gamepad";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import AppsIcon from "@mui/icons-material/Apps";
import SelectableItemListComponent from "@/components/shared/SelectableItemListComponent";
import { SxProps } from "@mui/joy/styles/types";

const GamePage: React.FC = () => {
    const selectableItems: SelectablePageItem[] = [
        {
            label: "Packman",
            // @ts-expect-error
            icon: <GamepadIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => alert("Dieses Spiel ist noch in Entwicklung!"),
        },
        {
            label: "Balloon Crush",
            // @ts-expect-error
            icon: <HeartBrokenIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => alert("Dieses Spiel ist noch in Entwicklung!"),
        },
        {
            label: "Tic Tac Toe",
            // @ts-expect-error
            icon: <AppsIcon fontSize="inherit" sx={IconStyle} />,
            onClick: () => alert("Dieses Spiel ist noch in Entwicklung!"),
        },
    ];

    return (
        <PageContentWrapperComponent title={"Spiele"} showBackButton>
            <SelectableItemListComponent items={selectableItems} />
        </PageContentWrapperComponent>
    );
};

const IconStyle: SxProps = () => ({
    color: "var(--color-white)",
    filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.6000000238418579))",
});

export default GamePage;
