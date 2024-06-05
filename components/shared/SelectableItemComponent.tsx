import React from "react";
import { SelectablePageItem } from "@/context/ApplicationContext";
import { Box, styled, Typography } from "@mui/joy";

type Props = {
    item: SelectablePageItem;
};

const SelectableItemComponent: React.FC<Props> = (props: Props) => {
    const { item } = props;
    return (
        <ItemContainer>
            <ItemIconContainer onClick={item.onClick}>
                {item.icon}
            </ItemIconContainer>
            <ItemLabel onClick={item.onClick}>{item.label}</ItemLabel>
        </ItemContainer>
    );
};
const ItemContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gap: "var(--space-2)",
    justifyContent: "center",
    justifyItems: "center",
    "&:hover": {
        cursor: "pointer",
        color: theme.vars.palette.primary["500"],
    },
}));

const ItemIconContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    alignItems: "center",
    alignContent: "center",
    gap: "var(--space-2)",
    padding: "var(--space-10)",
    borderRadius: "var(--space-6)",
    fontSize: "var(--font-15xLarge)",
    filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.8999999761581421))",
    backgroundColor: theme.vars.palette.primary["500"],
    "@media screen and (max-width: 900px)": {
        padding: "var(--space-6)",
        fontSize: "var(--font-7xLarge)",
    },
}));

const ItemLabel = styled(Typography)(() => ({
    fontWeight: "600",
    fontSize: "var(--font-large)",
    color: "inherit",
    textAlign: "center",
}));

export default SelectableItemComponent;
